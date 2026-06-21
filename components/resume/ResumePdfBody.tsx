import { Children, type ReactNode } from "react";
import {
  Document,
  Link,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import type {
  ResumeAssetData,
  ResumeCertification,
  ResumeEducation,
  ResumeExperience,
  ResumeLanguage,
  ResumeLink,
} from "@/lib/assets/resume-data";
import {
  formatEducationDates,
  formatExperienceDates,
  getResumeContactItems,
  getResumeLinkItems,
  hasResumeText,
  isCertificationVisible,
  isEducationVisible,
  isExperienceVisible,
  isLanguageVisible,
  isSkillVisible,
} from "@/lib/resume/resume-display-utils";
import type { ResumePdfTemplateStyles } from "@/lib/resume/pdf-template-styles";

const ENTRY_HEADER_MIN_PRESENCE = 48;
const LONG_DESCRIPTION_MAX_CHARS = 480;
const LONG_DESCRIPTION_MAX_LINES = 8;
const SHORT_SECTION_MAX_ITEMS = 6;
const SHORT_CERTIFICATIONS_MAX_ITEMS = 4;
const SHORT_LINKS_MAX_ITEMS = 5;
const SHORT_SKILLS_MAX_ITEMS = 18;
const SHORT_SUMMARY_MAX_CHARS = 320;

function isLongDescription(value: string): boolean {
  const text = value.trim();
  if (!text) return false;
  if (text.length > LONG_DESCRIPTION_MAX_CHARS) return true;
  return text.split(/\r?\n/).length > LONG_DESCRIPTION_MAX_LINES;
}

type ResumePdfBodyProps = {
  data: ResumeAssetData;
  styles: ResumePdfTemplateStyles;
};

export function ResumePdfBody({ data, styles }: ResumePdfBodyProps) {
  const isModern = styles.layout === "modern";

  function renderSectionTitle(title: string) {
    return <Text style={styles.sectionTitle}>{title}</Text>;
  }

  function PdfEntryTitle({ text }: { text: string }) {
    if (!text) return null;

    if (isModern) {
      return (
        <View style={styles.entryTitleRow} wrap={false}>
          <View style={styles.entryDot} />
          <Text style={[styles.entryTitle, styles.entryTitleInRow]}>{text}</Text>
        </View>
      );
    }

    return <Text style={styles.entryTitle}>{text}</Text>;
  }

  function PdfSection({
    title,
    children,
    keepTogether = false,
  }: {
    title: string;
    children: ReactNode;
    keepTogether?: boolean;
  }) {
    const items = Children.toArray(children).filter(Boolean);

    if (items.length === 0) {
      return (
        <View style={styles.section} wrap>
          {renderSectionTitle(title)}
        </View>
      );
    }

    if (keepTogether) {
      return (
        <View style={styles.section} wrap>
          <View wrap={false}>
            {renderSectionTitle(title)}
            {items}
          </View>
        </View>
      );
    }

    const [first, ...rest] = items;

    return (
      <View style={styles.section} wrap>
        <View wrap={false}>
          {renderSectionTitle(title)}
          {first}
        </View>
        {rest.length > 0 ? rest : null}
      </View>
    );
  }

  function PdfMetaLine({ items }: { items: string[] }) {
    const visible = items.filter(Boolean);
    if (visible.length === 0) return null;

    return <Text style={styles.metaLine}>{visible.join(" · ")}</Text>;
  }

  function PdfContactLine() {
    const items = getResumeContactItems(data);
    if (items.length === 0) return null;

    const line = items.map((item) => item.label).join("  |  ");

    return <Text style={styles.contactLine}>{line}</Text>;
  }

  function PdfTimelineEntry({
    primary,
    secondary,
    metaItems,
    description,
    isLast,
  }: {
    primary: string;
    secondary: string;
    metaItems: string[];
    description: string;
    isLast: boolean;
  }) {
    const descriptionText = description.trim();
    const hasDescription = hasResumeText(descriptionText);
    const longDescription = hasDescription && isLongDescription(descriptionText);
    const entryStyle = isLast ? [styles.entry, styles.entryLast] : styles.entry;

    const header = (
      <>
        <PdfEntryTitle text={primary} />
        {secondary ? (
          <Text style={primary ? styles.entrySubtitle : styles.entryTitle}>
            {secondary}
          </Text>
        ) : null}
        <PdfMetaLine items={metaItems} />
      </>
    );

    if (!hasDescription) {
      return (
        <View style={entryStyle} wrap={false}>
          {header}
        </View>
      );
    }

    if (longDescription) {
      return (
        <View style={entryStyle} wrap>
          <View wrap={false} minPresenceAhead={ENTRY_HEADER_MIN_PRESENCE}>
            {header}
          </View>
          <Text style={styles.description}>{descriptionText}</Text>
        </View>
      );
    }

    return (
      <View style={entryStyle} wrap={false}>
        {header}
        <Text style={styles.description}>{descriptionText}</Text>
      </View>
    );
  }

  function PdfExperienceEntry({
    entry,
    isLast,
  }: {
    entry: ResumeExperience;
    isLast: boolean;
  }) {
    return (
      <PdfTimelineEntry
        primary={entry.jobTitle.trim()}
        secondary={entry.company.trim()}
        metaItems={[
          entry.location.trim(),
          formatExperienceDates(entry) ?? "",
        ].filter(Boolean)}
        description={entry.description}
        isLast={isLast}
      />
    );
  }

  function PdfEducationEntry({
    entry,
    isLast,
  }: {
    entry: ResumeEducation;
    isLast: boolean;
  }) {
    return (
      <PdfTimelineEntry
        primary={entry.degree.trim()}
        secondary={entry.institution.trim()}
        metaItems={[
          entry.location.trim(),
          formatEducationDates(entry) ?? "",
        ].filter(Boolean)}
        description={entry.description}
        isLast={isLast}
      />
    );
  }

  function PdfLinkLine({ entry }: { entry: ResumeLink }) {
    const label = entry.label.trim();
    const url = entry.url.trim();

    if (label && url) {
      return (
        <Text style={styles.bodyText}>
          <Text style={styles.linkLabel}>{label}</Text>
          <Text style={styles.linkMuted}> — </Text>
          <Link src={url} style={styles.linkUrl}>
            <Text style={styles.linkUrl}>{url}</Text>
          </Link>
        </Text>
      );
    }

    if (url) {
      return (
        <Link src={url} style={styles.linkUrl}>
          <Text style={styles.linkUrl}>{url}</Text>
        </Link>
      );
    }

    return <Text style={styles.linkLabel}>{label}</Text>;
  }

  const fullName = data.personal.fullName.trim();
  const professionalTitle = data.personal.professionalTitle.trim();
  const summary = data.summary.trim();

  const experience = data.experience.filter(isExperienceVisible);
  const education = data.education.filter(isEducationVisible);
  const skills = data.skills.filter(isSkillVisible);
  const languages = data.languages.filter(isLanguageVisible);
  const certifications = data.certifications.filter(isCertificationVisible);
  const links = getResumeLinkItems(data);

  const hasHeader = fullName || professionalTitle;
  const hasContact = getResumeContactItems(data).length > 0;
  const keepSkillsTogether = skills.length <= SHORT_SKILLS_MAX_ITEMS;
  const keepLanguagesTogether = languages.length <= SHORT_SECTION_MAX_ITEMS;
  const keepCertificationsTogether =
    certifications.length <= SHORT_CERTIFICATIONS_MAX_ITEMS;
  const keepLinksTogether = links.length <= SHORT_LINKS_MAX_ITEMS;
  const keepSummaryTogether = summary.length <= SHORT_SUMMARY_MAX_CHARS;

  return (
    <Document title={fullName || "Resume"} author={fullName || undefined}>
      <Page size="A4" style={styles.page}>
        {(hasHeader || hasContact) && (
          <View style={styles.header} wrap={false}>
            {fullName ? <Text style={styles.name}>{fullName}</Text> : null}
            {professionalTitle ? (
              <Text style={styles.title}>{professionalTitle}</Text>
            ) : null}
            <PdfContactLine />
          </View>
        )}

        {summary ? (
          <PdfSection title="Summary">
            {keepSummaryTogether ? (
              <View wrap={false}>
                <Text style={styles.bodyText}>{summary}</Text>
              </View>
            ) : (
              <Text style={styles.bodyText}>{summary}</Text>
            )}
          </PdfSection>
        ) : null}

        {experience.length > 0 ? (
          <PdfSection title="Experience">
            {experience.map((entry, index) => (
              <PdfExperienceEntry
                key={entry.id}
                entry={entry}
                isLast={index === experience.length - 1}
              />
            ))}
          </PdfSection>
        ) : null}

        {education.length > 0 ? (
          <PdfSection title="Education">
            {education.map((entry, index) => (
              <PdfEducationEntry
                key={entry.id}
                entry={entry}
                isLast={index === education.length - 1}
              />
            ))}
          </PdfSection>
        ) : null}

        {skills.length > 0 ? (
          <PdfSection title="Skills">
            <View style={styles.skillsRow} wrap={!keepSkillsTogether}>
              {skills.map((skill) => (
                <View key={skill.id} style={styles.skillChip} wrap={false}>
                  <Text style={styles.skillText}>{skill.name.trim()}</Text>
                </View>
              ))}
            </View>
          </PdfSection>
        ) : null}

        {languages.length > 0 ? (
          <PdfSection title="Languages" keepTogether={keepLanguagesTogether}>
            {languages.map((entry: ResumeLanguage, index) => {
              const name = entry.name.trim();
              const level = entry.level.trim();
              const label =
                name && level ? `${name} — ${level}` : name || level;

              return (
                <Text
                  key={entry.id}
                  style={
                    index === languages.length - 1
                      ? [styles.listItem, styles.listItemLast]
                      : styles.listItem
                  }
                  wrap={false}
                >
                  {label}
                </Text>
              );
            })}
          </PdfSection>
        ) : null}

        {certifications.length > 0 ? (
          <PdfSection
            title="Certifications"
            keepTogether={keepCertificationsTogether}
          >
            {certifications.map((entry: ResumeCertification, index) => (
              <View
                key={entry.id}
                style={
                  index === certifications.length - 1
                    ? [styles.entry, styles.entryLast]
                    : styles.entry
                }
                wrap={false}
              >
                <PdfEntryTitle text={hasResumeText(entry.name) ? entry.name.trim() : ""} />
                <PdfMetaLine
                  items={[entry.issuer.trim(), entry.date.trim()].filter(Boolean)}
                />
              </View>
            ))}
          </PdfSection>
        ) : null}

        {links.length > 0 ? (
          <PdfSection title="Links" keepTogether={keepLinksTogether}>
            {links.map((entry, index) => (
              <View
                key={entry.id}
                style={
                  index === links.length - 1
                    ? [styles.linkItem, styles.linkItemLast]
                    : styles.linkItem
                }
                wrap={false}
              >
                <PdfLinkLine entry={entry} />
              </View>
            ))}
          </PdfSection>
        ) : null}
      </Page>
    </Document>
  );
}
