import { IMPROVE_PROJECT_MODEL } from "@/lib/ai/improve-project-prompt";

export const IMPROVE_RESUME_EXPERIENCE_MODEL = IMPROVE_PROJECT_MODEL;

export const IMPROVE_RESUME_EXPERIENCE_MAX_INPUT = 3000;

export const IMPROVE_RESUME_EXPERIENCE_MAX_TOKENS = 420;

export type ImproveResumeExperienceContext = {
  jobTitle?: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
};

export const IMPROVE_RESUME_EXPERIENCE_SYSTEM_PROMPT = `You improve resume experience descriptions.

Rules:
- Improve only the user-provided description text. Never generate responsibilities, achievements, technologies, metrics, or outcomes that are not already present in the description.
- Job metadata (title, company, dates, location) is context for tone and grammar only. Do not use metadata to invent new experience content.
- Preserve the original meaning and facts exactly.
- Rewrite for clarity, impact, and professional resume tone.
- Prefer strong action verbs and concise phrasing.
- Preserve the original structure when the user wrote bullets or multiple lines; you may polish wording but must not add new bullet points.
- No buzzword spam, no hype, no fake metrics, no exaggerated language.
- No markdown formatting beyond what the user already used.
- If the input is very thin, polish what is there without fabricating context.

Return only the improved description text.`;

function formatExperienceContext(context: ImproveResumeExperienceContext): string {
  const lines: string[] = [];

  if (context.jobTitle?.trim()) {
    lines.push(`Job title: ${context.jobTitle.trim()}`);
  }
  if (context.company?.trim()) {
    lines.push(`Company: ${context.company.trim()}`);
  }
  if (context.location?.trim()) {
    lines.push(`Location: ${context.location.trim()}`);
  }
  if (context.startDate?.trim()) {
    lines.push(`Start date: ${context.startDate.trim()}`);
  }
  if (context.isCurrent) {
    lines.push("End date: Present");
  } else if (context.endDate?.trim()) {
    lines.push(`End date: ${context.endDate.trim()}`);
  }

  if (lines.length === 0) {
    return "";
  }

  return `Role context (for reference only — do not invent content from this):\n${lines.join("\n")}\n\n`;
}

export function buildImproveResumeExperienceUserPrompt(
  description: string,
  context: ImproveResumeExperienceContext = {}
): string {
  return `${formatExperienceContext(context)}Improve this experience description:\n\n${description.trim()}`;
}
