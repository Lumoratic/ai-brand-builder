import { NextResponse } from "next/server";
import {
  buildImproveProjectUserPrompt,
  IMPROVE_PROJECT_MAX_INPUT,
  IMPROVE_PROJECT_MODEL,
  IMPROVE_PROJECT_SYSTEM_PROMPT,
} from "@/lib/ai/improve-project-prompt";
import {
  assertRateLimit,
  getAuthenticatedUser,
  handleImprovementRouteError,
  rateLimitedResponse,
  runGroqImprovement,
  unauthorizedResponse,
} from "@/lib/ai/improvement-server";

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return unauthorizedResponse();
    }

    if (!assertRateLimit(user.id)) {
      return rateLimitedResponse();
    }

    const body = (await request.json()) as { description?: unknown };
    const description =
      typeof body.description === "string" ? body.description.trim() : "";

    if (!description) {
      return NextResponse.json(
        { error: "Description is required." },
        { status: 400 }
      );
    }

    if (description.length > IMPROVE_PROJECT_MAX_INPUT) {
      return NextResponse.json(
        { error: "Description is too long." },
        { status: 400 }
      );
    }

    const improved = await runGroqImprovement({
      model: IMPROVE_PROJECT_MODEL,
      systemPrompt: IMPROVE_PROJECT_SYSTEM_PROMPT,
      userPrompt: buildImproveProjectUserPrompt(description),
      maxTokens: 220,
      temperature: 0.4,
    });

    return NextResponse.json({ description: improved });
  } catch (error) {
    return handleImprovementRouteError(
      error,
      "Failed to improve description."
    );
  }
}
