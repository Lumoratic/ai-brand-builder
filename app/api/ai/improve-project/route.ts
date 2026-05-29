import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import {
  buildImproveProjectUserPrompt,
  IMPROVE_PROJECT_MAX_INPUT,
  IMPROVE_PROJECT_MODEL,
  IMPROVE_PROJECT_SYSTEM_PROMPT,
} from "@/lib/ai/improve-project-prompt";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import { createClient } from "@/lib/supabase/server";

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured.");
  }
  return new Groq({ apiKey });
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!checkRateLimit(user.id)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
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

    const groq = getGroqClient();
    const completion = await groq.chat.completions.create({
      model: IMPROVE_PROJECT_MODEL,
      temperature: 0.4,
      max_tokens: 220,
      messages: [
        { role: "system", content: IMPROVE_PROJECT_SYSTEM_PROMPT },
        { role: "user", content: buildImproveProjectUserPrompt(description) },
      ],
    });

    const improved = completion.choices[0]?.message?.content?.trim();

    if (!improved) {
      return NextResponse.json(
        { error: "No improvement was generated. Try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ description: improved });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to improve description.";

    if (message.includes("GROQ_API_KEY")) {
      return NextResponse.json({ error: message }, { status: 503 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
