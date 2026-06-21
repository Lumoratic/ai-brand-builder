import type {
  ResumeAssetData,
  ResumeCertification,
  ResumeEducation,
  ResumeExperience,
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
import type { ResumePreviewTemplateClasses } from "@/lib/resume/preview-template-styles";
import {
  isResumeModernContactIconId,
  RESUME_MODERN_CONTACT_ICONS,
  RESUME_MODERN_SECTION_ICONS,
  type ResumeModernSectionId,
} from "@/lib/resume/resume-modern-icons";
import { cn } from "@/lib/utils";

type ResumePreviewBodyProps = {
  data: ResumeAssetData;
  classes: ResumePreviewTemplateClasses;
  className?: string;
};

function PreviewSection({
  title,
  sectionId,
  children,
  classes,
}: {
  title: string;
  sectionId: ResumeModernSectionId;
  children: React.ReactNode;
  classes: ResumePreviewTemplateClasses;
}) {
  const SectionIcon = RESUME_MODERN_SECTION_ICONS[sectionId];

  return (
    <section className={classes.section}>
      {classes.layout === "modern" ? (
        <div className={classes.sectionTitleRow}>
          <SectionIcon className={classes.sectionIcon} aria-hidden />
          <h2 className={classes.sectionTitle}>{title}</h2>
        </div>
      ) : (
        <h2 className={classes.sectionTitle}>{title}</h2>
      )}
      <div className={classes.sectionBody}>{children}</div>
    </section>
  );
}

function MetaLine({
  items,
  classes,
}: {
  items: string[];
  classes: ResumePreviewTemplateClasses;
}) {
  const visible = items.filter(Boolean);
  if (visible.length === 0) return null;

  return <p className={classes.metaLine}>{visible.join(" · ")}</p>;
}

function ContactLine({
  data,
  classes,
}: {
  data: ResumeAssetData;
  classes: ResumePreviewTemplateClasses;
}) {
  const items = getResumeContactItems(data);
  if (items.length === 0) return null;

  return (
    <div className={classes.contact}>
      {items.map((item, index) => {
        const ContactIcon =
          classes.layout === "modern" && isResumeModernContactIconId(item.key)
            ? RESUME_MODERN_CONTACT_ICONS[item.key]
            : null;

        return (
          <span key={item.key} className={classes.contactItem || "inline-flex items-center gap-2.5"}>
            {index > 0 ? (
              <span className={classes.contactDivider} aria-hidden>
                |
              </span>
            ) : null}
            {ContactIcon ? (
              <ContactIcon className={classes.contactIcon} aria-hidden />
            ) : null}
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.contactLink}
              >
                {item.label}
              </a>
            ) : (
              <span>{item.label}</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function EntryTitle({
  title,
  titleClassName,
  classes,
}: {
  title: string;
  titleClassName: string;
  classes: ResumePreviewTemplateClasses;
}) {
  if (!title) return null;

  if (classes.layout === "modern") {
    return (
      <div className={classes.entryTitleRow}>
        <span className={classes.entryDot} aria-hidden />
        <h3 className={titleClassName}>{title}</h3>
      </div>
    );
  }

  return <h3 className={titleClassName}>{title}</h3>;
}

function ExperienceEntry({
  entry,
  classes,
}: {
  entry: ResumeExperience;
  classes: ResumePreviewTemplateClasses;
}) {
  const jobTitle = entry.jobTitle.trim();
  const company = entry.company.trim();
  const dates = formatExperienceDates(entry);

  return (
    <article className={classes.entryBlock}>
      <EntryTitle
        title={jobTitle}
        titleClassName={classes.entryTitle}
        classes={classes}
      />
      {company ? (
        <p className={jobTitle ? classes.entrySubtitle : classes.entrySubtitleFallback}>
          {company}
        </p>
      ) : null}
      <MetaLine
        items={[entry.location.trim(), dates ?? ""].filter(Boolean)}
        classes={classes}
      />
      {hasResumeText(entry.description) ? (
        <p className={classes.description}>{entry.description.trim()}</p>
      ) : null}
    </article>
  );
}

function EducationEntry({
  entry,
  classes,
}: {
  entry: ResumeEducation;
  classes: ResumePreviewTemplateClasses;
}) {
  const degree = entry.degree.trim();
  const institution = entry.institution.trim();
  const dates = formatEducationDates(entry);

  return (
    <article className={classes.entryBlock}>
      <EntryTitle
        title={degree}
        titleClassName={classes.entryTitle}
        classes={classes}
      />
      {institution ? (
        <p className={degree ? classes.entrySubtitle : classes.entrySubtitleFallback}>
          {institution}
        </p>
      ) : null}
      <MetaLine
        items={[entry.location.trim(), dates ?? ""].filter(Boolean)}
        classes={classes}
      />
      {hasResumeText(entry.description) ? (
        <p className={classes.description}>{entry.description.trim()}</p>
      ) : null}
    </article>
  );
}

function LinkLine({
  entry,
  classes,
}: {
  entry: ResumeLink;
  classes: ResumePreviewTemplateClasses;
}) {
  const label = entry.label.trim();
  const url = entry.url.trim();

  if (label && url) {
    return (
      <span className={classes.linkLine}>
        <span className={classes.linkLabel}>{label}</span>
        <span className={classes.linkMuted}> — </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.linkUrl}
        >
          {url}
        </a>
      </span>
    );
  }

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(classes.linkUrl, classes.linkLine)}
      >
        {url}
      </a>
    );
  }

  return <span className={cn(classes.linkLabel, classes.linkLine)}>{label}</span>;
}

export function ResumePreviewBody({
  data,
  classes,
  className,
}: ResumePreviewBodyProps) {
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

  const hasContent =
    hasHeader ||
    hasContact ||
    summary ||
    experience.length > 0 ||
    education.length > 0 ||
    skills.length > 0 ||
    languages.length > 0 ||
    certifications.length > 0 ||
    links.length > 0;

  return (
    <article className={cn(classes.root, className)}>
      {!hasContent ? (
        <p className={classes.empty}>
          Start filling in your resume to see it here.
        </p>
      ) : (
        <>
          {(fullName || professionalTitle || hasContact) && (
            <header className={classes.header}>
              {fullName ? <h1 className={classes.name}>{fullName}</h1> : null}
              {professionalTitle ? (
                <p className={classes.professionalTitle}>{professionalTitle}</p>
              ) : null}
              <ContactLine data={data} classes={classes} />
            </header>
          )}

          {summary ? (
            <PreviewSection title="Summary" sectionId="summary" classes={classes}>
              <p className={classes.bodyText}>{summary}</p>
            </PreviewSection>
          ) : null}

          {experience.length > 0 ? (
            <PreviewSection title="Experience" sectionId="experience" classes={classes}>
              {experience.map((entry) => (
                <ExperienceEntry key={entry.id} entry={entry} classes={classes} />
              ))}
            </PreviewSection>
          ) : null}

          {education.length > 0 ? (
            <PreviewSection title="Education" sectionId="education" classes={classes}>
              {education.map((entry) => (
                <EducationEntry key={entry.id} entry={entry} classes={classes} />
              ))}
            </PreviewSection>
          ) : null}

          {skills.length > 0 ? (
            <PreviewSection title="Skills" sectionId="skills" classes={classes}>
              <ul className={classes.skillsList}>
                {skills.map((skill) => (
                  <li key={skill.id} className={classes.skillChip}>
                    {skill.name.trim()}
                  </li>
                ))}
              </ul>
            </PreviewSection>
          ) : null}

          {languages.length > 0 ? (
            <PreviewSection title="Languages" sectionId="languages" classes={classes}>
              <ul className={classes.list}>
                {languages.map((entry) => {
                  const name = entry.name.trim();
                  const level = entry.level.trim();
                  const label =
                    name && level ? `${name} — ${level}` : name || level;

                  return <li key={entry.id}>{label}</li>;
                })}
              </ul>
            </PreviewSection>
          ) : null}

          {certifications.length > 0 ? (
            <PreviewSection title="Certifications" sectionId="certifications" classes={classes}>
              {certifications.map((entry: ResumeCertification) => (
                <div key={entry.id} className={classes.entryBlock}>
                  {hasResumeText(entry.name) ? (
                    <EntryTitle
                      title={entry.name.trim()}
                      titleClassName={classes.certTitle}
                      classes={classes}
                    />
                  ) : null}
                  <div className={classes.certMeta}>
                    {[entry.issuer.trim(), entry.date.trim()].filter(Boolean).join(" · ")}
                  </div>
                </div>
              ))}
            </PreviewSection>
          ) : null}

          {links.length > 0 ? (
            <PreviewSection title="Links" sectionId="links" classes={classes}>
              <ul className={classes.linksList}>
                {links.map((entry) => (
                  <li key={entry.id}>
                    <LinkLine entry={entry} classes={classes} />
                  </li>
                ))}
              </ul>
            </PreviewSection>
          ) : null}
        </>
      )}
    </article>
  );
}
