import type {
  ResumeAssetData,
  ResumeCertification,
  ResumeEducation,
  ResumeExperience,
  ResumeLanguage,
  ResumeLink,
  ResumeSkill,
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
import { cn } from "@/lib/utils";

type ResumePreviewContentProps = {
  data: ResumeAssetData;
  className?: string;
};

function PreviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7 first:mt-0">
      <h2 className="border-b border-zinc-300 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-700">
        {title}
      </h2>
      <div className="mt-3.5 space-y-5">{children}</div>
    </section>
  );
}

function MetaLine({ items }: { items: string[] }) {
  const visible = items.filter(Boolean);
  if (visible.length === 0) return null;

  return (
    <p className="mt-1 text-xs leading-relaxed text-zinc-500">
      {visible.join(" · ")}
    </p>
  );
}

function ContactLine({ data }: { data: ResumeAssetData }) {
  const items = getResumeContactItems(data);
  if (items.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-zinc-600">
      {items.map((item, index) => (
        <span key={item.key} className="inline-flex items-center gap-3">
          {index > 0 ? (
            <span className="text-zinc-300" aria-hidden>
              |
            </span>
          ) : null}
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline"
            >
              {item.label}
            </a>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

function ExperienceEntry({ entry }: { entry: ResumeExperience }) {
  const jobTitle = entry.jobTitle.trim();
  const company = entry.company.trim();
  const dates = formatExperienceDates(entry);

  return (
    <article>
      {jobTitle ? (
        <h3 className="text-[15px] font-semibold leading-snug text-zinc-900">
          {jobTitle}
        </h3>
      ) : null}
      {company ? (
        <p
          className={cn(
            "text-sm font-medium text-zinc-700",
            jobTitle ? "mt-0.5" : "text-[15px] font-semibold text-zinc-900"
          )}
        >
          {company}
        </p>
      ) : null}
      <MetaLine
        items={[entry.location.trim(), dates ?? ""].filter(Boolean)}
      />
      {hasResumeText(entry.description) ? (
        <p className="mt-2.5 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700">
          {entry.description.trim()}
        </p>
      ) : null}
    </article>
  );
}

function EducationEntry({ entry }: { entry: ResumeEducation }) {
  const degree = entry.degree.trim();
  const institution = entry.institution.trim();
  const dates = formatEducationDates(entry);

  return (
    <article>
      {degree ? (
        <h3 className="text-[15px] font-semibold leading-snug text-zinc-900">
          {degree}
        </h3>
      ) : null}
      {institution ? (
        <p
          className={cn(
            "text-sm font-medium text-zinc-700",
            degree ? "mt-0.5" : "text-[15px] font-semibold text-zinc-900"
          )}
        >
          {institution}
        </p>
      ) : null}
      <MetaLine
        items={[entry.location.trim(), dates ?? ""].filter(Boolean)}
      />
      {hasResumeText(entry.description) ? (
        <p className="mt-2.5 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700">
          {entry.description.trim()}
        </p>
      ) : null}
    </article>
  );
}

function LinkLine({ entry }: { entry: ResumeLink }) {
  const label = entry.label.trim();
  const url = entry.url.trim();

  if (label && url) {
    return (
      <span className="text-sm leading-relaxed text-zinc-700">
        <span className="font-medium text-zinc-800">{label}</span>
        <span className="text-zinc-400"> — </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline"
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
        className="break-all text-sm text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline"
      >
        {url}
      </a>
    );
  }

  return <span className="text-sm font-medium text-zinc-800">{label}</span>;
}

export function ResumePreviewContent({ data, className }: ResumePreviewContentProps) {
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
    <article
      className={cn(
        "w-full min-w-0 bg-white px-7 py-9 text-zinc-900 shadow-sm sm:px-9 sm:py-11 lg:px-10 lg:py-12",
        className
      )}
    >
      {!hasContent ? (
        <p className="text-center text-sm text-zinc-400">
          Start filling in your resume to see it here.
        </p>
      ) : (
        <>
          {(fullName || professionalTitle || hasContact) && (
            <header className="border-b border-zinc-200 pb-6">
              {fullName ? (
                <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-zinc-900 sm:text-[2rem]">
                  {fullName}
                </h1>
              ) : null}
              {professionalTitle ? (
                <p className="mt-1.5 text-base text-zinc-600">{professionalTitle}</p>
              ) : null}
              <ContactLine data={data} />
            </header>
          )}

          {summary ? (
            <PreviewSection title="Summary">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700">
                {summary}
              </p>
            </PreviewSection>
          ) : null}

          {experience.length > 0 ? (
            <PreviewSection title="Experience">
              {experience.map((entry) => (
                <ExperienceEntry key={entry.id} entry={entry} />
              ))}
            </PreviewSection>
          ) : null}

          {education.length > 0 ? (
            <PreviewSection title="Education">
              {education.map((entry) => (
                <EducationEntry key={entry.id} entry={entry} />
              ))}
            </PreviewSection>
          ) : null}

          {skills.length > 0 ? (
            <PreviewSection title="Skills">
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill.id}
                    className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-sm text-zinc-700"
                  >
                    {skill.name.trim()}
                  </li>
                ))}
              </ul>
            </PreviewSection>
          ) : null}

          {languages.length > 0 ? (
            <PreviewSection title="Languages">
              <ul className="space-y-1 text-sm text-zinc-700">
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
            <PreviewSection title="Certifications">
              {certifications.map((entry: ResumeCertification) => (
                <div key={entry.id}>
                  {hasResumeText(entry.name) ? (
                    <h3 className="text-[15px] font-semibold text-zinc-900">
                      {entry.name.trim()}
                    </h3>
                  ) : null}
                  <div className="mt-0.5 text-xs text-zinc-500">
                    {[entry.issuer.trim(), entry.date.trim()].filter(Boolean).join(" · ")}
                  </div>
                </div>
              ))}
            </PreviewSection>
          ) : null}

          {links.length > 0 ? (
            <PreviewSection title="Links">
              <ul className="space-y-2">
                {links.map((entry) => (
                  <li key={entry.id}>
                    <LinkLine entry={entry} />
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
