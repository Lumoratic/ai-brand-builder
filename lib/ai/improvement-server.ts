import { NextResponse } from "next/server";
import { getGroqClient } from "@/lib/ai/groq";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import { createClient } from "@/lib/supabase/server";

export class ImprovementEmptyError extends Error {
  constructor() {
    super("No improvement was generated. Try again.");
    this.name = "ImprovementEmptyError";
  }
}

export async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function rateLimitedResponse() {
  return NextResponse.json(
    { error: "Too many requests. Please wait a moment and try again." },
    { status: 429 }
  );
}

export function assertRateLimit(userId: string) {
  return checkRateLimit(userId);
}

type RunGroqImprovementOptions = {
  model: string;
  systemPrompt: string;
  userPrompt: string;
  maxTokens: number;
  temperature?: number;
};

export async function runGroqImprovement({
  model,
  systemPrompt,
  userPrompt,
  maxTokens,
  temperature = 0.4,
}: RunGroqImprovementOptions): Promise<string> {
  const groq = getGroqClient();
  const completion = await groq.chat.completions.create({
    model,
    temperature,
    max_tokens: maxTokens,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const improved = completion.choices[0]?.message?.content?.trim();

  if (!improved) {
    throw new ImprovementEmptyError();
  }

  return improved;
}

export function handleImprovementRouteError(
  error: unknown,
  fallbackMessage: string
) {
  if (error instanceof ImprovementEmptyError) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  const message =
    error instanceof Error ? error.message : fallbackMessage;

  if (message.includes("GROQ_API_KEY")) {
    return NextResponse.json({ error: message }, { status: 503 });
  }

  return NextResponse.json({ error: message }, { status: 500 });
}
