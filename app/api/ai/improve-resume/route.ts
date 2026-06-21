import { NextResponse } from "next/server";
import {
  buildImproveResumeExperienceUserPrompt,
  IMPROVE_RESUME_EXPERIENCE_MAX_INPUT,
  IMPROVE_RESUME_EXPERIENCE_MAX_TOKENS,
  IMPROVE_RESUME_EXPERIENCE_MODEL,
  IMPROVE_RESUME_EXPERIENCE_SYSTEM_PROMPT,
  type ImproveResumeExperienceContext,
} from "@/lib/ai/improve-resume-experience-prompt";
import {
  buildImproveResumeSummaryUserPrompt,
  IMPROVE_RESUME_SUMMARY_MAX_INPUT,
  IMPROVE_RESUME_SUMMARY_MAX_TOKENS,
  IMPROVE_RESUME_SUMMARY_MODEL,
  IMPROVE_RESUME_SUMMARY_SYSTEM_PROMPT,
} from "@/lib/ai/improve-resume-summary-prompt";
import {
  assertRateLimit,
  getAuthenticatedUser,
  handleImprovementRouteError,
  rateLimitedResponse,
  runGroqImprovement,
  unauthorizedResponse,
} from "@/lib/ai/improvement-server";

type ImproveResumeSummaryBody = {
  field: "summary";
  text?: unknown;
};

type ImproveResumeExperienceBody = {
  field: "experience-description";
  text?: unknown;
  context?: unknown;
};

type ImproveResumeBody = ImproveResumeSummaryBody | ImproveResumeExperienceBody;

function parseText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseExperienceContext(value: unknown): ImproveResumeExperienceContext {
  if (!value || typeof value !== "object") {
    return {};
  }

  const context = value as Record<string, unknown>;

  return {
    jobTitle:
      typeof context.jobTitle === "string" ? context.jobTitle : undefined,
    company: typeof context.company === "string" ? context.company : undefined,
    location:
      typeof context.location === "string" ? context.location : undefined,
    startDate:
      typeof context.startDate === "string" ? context.startDate : undefined,
    endDate: typeof context.endDate === "string" ? context.endDate : undefined,
    isCurrent:
      typeof context.isCurrent === "boolean" ? context.isCurrent : undefined,
  };
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return unauthorizedResponse();
    }

    if (!assertRateLimit(user.id)) {
      return rateLimitedResponse();
    }

    const body = (await request.json()) as ImproveResumeBody;

    if (body.field === "summary") {
      const text = parseText(body.text);

      if (!text) {
        return NextResponse.json({ error: "Text is required." }, { status: 400 });
      }

      if (text.length > IMPROVE_RESUME_SUMMARY_MAX_INPUT) {
        return NextResponse.json({ error: "Text is too long." }, { status: 400 });
      }

      const improved = await runGroqImprovement({
        model: IMPROVE_RESUME_SUMMARY_MODEL,
        systemPrompt: IMPROVE_RESUME_SUMMARY_SYSTEM_PROMPT,
        userPrompt: buildImproveResumeSummaryUserPrompt(text),
        maxTokens: IMPROVE_RESUME_SUMMARY_MAX_TOKENS,
        temperature: 0.4,
      });

      return NextResponse.json({ text: improved });
    }

    if (body.field === "experience-description") {
      const text = parseText(body.text);

      if (!text) {
        return NextResponse.json({ error: "Text is required." }, { status: 400 });
      }

      if (text.length > IMPROVE_RESUME_EXPERIENCE_MAX_INPUT) {
        return NextResponse.json({ error: "Text is too long." }, { status: 400 });
      }

      const context = parseExperienceContext(body.context);

      const improved = await runGroqImprovement({
        model: IMPROVE_RESUME_EXPERIENCE_MODEL,
        systemPrompt: IMPROVE_RESUME_EXPERIENCE_SYSTEM_PROMPT,
        userPrompt: buildImproveResumeExperienceUserPrompt(text, context),
        maxTokens: IMPROVE_RESUME_EXPERIENCE_MAX_TOKENS,
        temperature: 0.4,
      });

      return NextResponse.json({ text: improved });
    }

    return NextResponse.json({ error: "Invalid field." }, { status: 400 });
  } catch (error) {
    return handleImprovementRouteError(error, "Failed to improve resume text.");
  }
}
