import { IMPROVE_PROJECT_MODEL } from "@/lib/ai/improve-project-prompt";

export const IMPROVE_RESUME_SUMMARY_MODEL = IMPROVE_PROJECT_MODEL;

export const IMPROVE_RESUME_SUMMARY_MAX_INPUT = 2000;

export const IMPROVE_RESUME_SUMMARY_MAX_TOKENS = 320;

export const IMPROVE_RESUME_SUMMARY_SYSTEM_PROMPT = `You improve professional resume summary paragraphs.

Rules:
- Improve only the user-provided summary text. Do not invent roles, employers, skills, tools, metrics, or achievements.
- Preserve the original meaning and facts exactly.
- Rewrite for clarity, flow, and a professional recruiter-friendly tone.
- Keep it concise: usually 3–5 sentences unless the input clearly needs more.
- First-person is acceptable when the original uses it; do not force a different voice.
- No buzzword spam, no hype, no fake metrics, no exaggerated language.
- No markdown, bullet points, or labels — plain paragraph text only.
- If the input is very thin, polish what is there without fabricating context.

Return only the improved summary text.`;

export function buildImproveResumeSummaryUserPrompt(summary: string): string {
  return `Improve this resume summary:\n\n${summary.trim()}`;
}
