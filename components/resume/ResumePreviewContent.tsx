import type {
  ResumeAssetData,
  ResumeCertification,
  ResumeEducation,
  ResumeExperience,
  ResumeLanguage,
  ResumeLink,
  ResumeSkill,
} from "@/lib/assets/resume-data";
import { cn } from "@/lib/utils";

type ResumePreviewContentProps = {
  data: ResumeAssetData;
  className?: string;
};

function hasText(value: string): boolean {
  return value.trim().length > 0;
}

function formatExperienceDates(entry: ResumeExperience): string | null {
  const start = entry.startDate.trim();
  const end = entry.isCurrent ? "Present" : entry.endDate.trim();

  if (start && end) return `${start} — ${end}`;
  if (start) return start;
  if (end) return end;
  return null;
}

function formatEducationDates(entry: ResumeEducation): string | null {
  const start = entry.startDate.trim();
  const end = entry.endDate.trim();

  if (start && end) return `${start} — ${end}`;
  if (start) return start;
  if (end) return end;
  return null;
}

function isExperienceVisible(entry: ResumeExperience): boolean {
  return (
    hasText(entry.jobTitle) ||
    hasText(entry.company) ||
    hasText(entry.location) ||
    hasText(entry.startDate) ||
    hasText(entry.endDate) ||
    hasText(entry.description)
  );
}

function isEducationVisible(entry: ResumeEducation): boolean {
  return (
    hasText(entry.degree) ||
    hasText(entry.institution) ||
    hasText(entry.location) ||
    hasText(entry.startDate) ||
    hasText(entry.endDate) ||
    hasText(entry.description)
  );
}

function isSkillVisible(entry: ResumeSkill): boolean {
  return hasText(entry.name);
}

function isLanguageVisible(entry: ResumeLanguage): boolean {
  return hasText(entry.name) || hasText(entry.level);
}

function isCertificationVisible(entry: ResumeCertification): boolean {
  return hasText(entry.name) || hasText(entry.issuer) || hasText(entry.date);
}

function isLinkVisible(entry: ResumeLink): boolean {
  return hasText(entry.label) || hasText(entry.url);
}

function PreviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 first:mt-0">
      <h2 className="border-b border-zinc-300 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-700">
        {title}
      </h2>
      <div className="mt-3 space-y-4">{children}</div>
    </section>
  );
}

function ContactLine({ data }: { data: ResumeAssetData }) {
  const items: { key: string; label: string; href?: string }[] = [];

  if (hasText(data.personal.email)) {
    items.push({
      key: "email",
      label: data.personal.email.trim(),
      href: `mailto:${data.personal.email.trim()}`,
    });
  }
  if (hasText(data.personal.phone)) {
    items.push({ key: "phone", label: data.personal.phone.trim() });
  }
  if (hasText(data.personal.location)) {
    items.push({ key: "location", label: data.personal.location.trim() });
  }
  if (hasText(data.personal.linkedin)) {
    const url = data.personal.linkedin.trim();
    items.push({ key: "linkedin", label: "LinkedIn", href: url });
  }
  if (hasText(data.personal.website)) {
    const url = data.personal.website.trim();
    items.push({ key: "website", label: "Website", href: url });
  }

  if (items.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-600">
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

export function ResumePreviewContent({ data, className }: ResumePreviewContentProps) {
  const fullName = data.personal.fullName.trim();
  const professionalTitle = data.personal.professionalTitle.trim();
  const summary = data.summary.trim();

  const experience = data.experience.filter(isExperienceVisible);
  const education = data.education.filter(isEducationVisible);
  const skills = data.skills.filter(isSkillVisible);
  const languages = data.languages.filter(isLanguageVisible);
  const certifications = data.certifications.filter(isCertificationVisible);
  const links = data.links.filter(isLinkVisible);

  const hasHeader = fullName || professionalTitle;
  const hasContact =
    hasText(data.personal.email) ||
    hasText(data.personal.phone) ||
    hasText(data.personal.location) ||
    hasText(data.personal.linkedin) ||
    hasText(data.personal.website);

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
        "mx-auto w-full max-w-[210mm] bg-white px-8 py-10 text-zinc-900 shadow-sm sm:px-10 sm:py-12",
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
            <header className="border-b border-zinc-200 pb-5">
              {fullName ? (
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                  {fullName}
                </h1>
              ) : null}
              {professionalTitle ? (
                <p className="mt-1 text-base text-zinc-600">{professionalTitle}</p>
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
              {experience.map((entry) => {
                const dates = formatExperienceDates(entry);
                const titleLine = [entry.jobTitle.trim(), entry.company.trim()]
                  .filter(Boolean)
                  .join(" at ");

                return (
                  <div key={entry.id}>
                    {titleLine ? (
                      <h3 className="text-sm font-semibold text-zinc-900">{titleLine}</h3>
                    ) : null}
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-zinc-500">
                      {hasText(entry.location) ? <span>{entry.location.trim()}</span> : null}
                      {dates ? <span>{dates}</span> : null}
                    </div>
                    {hasText(entry.description) ? (
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700">
                        {entry.description.trim()}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </PreviewSection>
          ) : null}

          {education.length > 0 ? (
            <PreviewSection title="Education">
              {education.map((entry) => {
                const dates = formatEducationDates(entry);
                const titleLine = [entry.degree.trim(), entry.institution.trim()]
                  .filter(Boolean)
                  .join(" — ");

                return (
                  <div key={entry.id}>
                    {titleLine ? (
                      <h3 className="text-sm font-semibold text-zinc-900">{titleLine}</h3>
                    ) : null}
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-zinc-500">
                      {hasText(entry.location) ? <span>{entry.location.trim()}</span> : null}
                      {dates ? <span>{dates}</span> : null}
                    </div>
                    {hasText(entry.description) ? (
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700">
                        {entry.description.trim()}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </PreviewSection>
          ) : null}

          {skills.length > 0 ? (
            <PreviewSection title="Skills">
              <p className="text-sm leading-relaxed text-zinc-700">
                {skills.map((skill) => skill.name.trim()).join(", ")}
              </p>
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
              {certifications.map((entry) => (
                <div key={entry.id}>
                  {hasText(entry.name) ? (
                    <h3 className="text-sm font-semibold text-zinc-900">
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
              <ul className="space-y-1 text-sm">
                {links.map((entry) => {
                  const label = entry.label.trim() || entry.url.trim();
                  const url = entry.url.trim();

                  return (
                    <li key={entry.id}>
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-700 underline-offset-2 hover:text-zinc-900 hover:underline"
                        >
                          {label}
                        </a>
                      ) : (
                        <span className="text-zinc-700">{label}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </PreviewSection>
          ) : null}
        </>
      )}
    </article>
  );
}
