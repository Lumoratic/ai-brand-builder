import type { ImproveResumeExperienceContext } from "@/lib/ai/improve-resume-experience-prompt";

type ImproveResumeResponse = {
  text?: string;
  error?: string;
};

async function postImproveResume(body: Record<string, unknown>): Promise<string> {
  const response = await fetch("/api/ai/improve-resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as ImproveResumeResponse;

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to improve resume text.");
  }

  if (!data.text) {
    throw new Error("No improvement was returned.");
  }

  return data.text;
}

export async function improveResumeSummary(text: string): Promise<string> {
  return postImproveResume({ field: "summary", text });
}

export async function improveResumeExperienceDescription(
  text: string,
  context: ImproveResumeExperienceContext = {}
): Promise<string> {
  return postImproveResume({
    field: "experience-description",
    text,
    context,
  });
}
