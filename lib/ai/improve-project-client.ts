export async function improveProjectDescription(
  description: string
): Promise<string> {
  const response = await fetch("/api/ai/improve-project", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });

  const data = (await response.json()) as {
    description?: string;
    error?: string;
  };

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to improve description.");
  }

  if (!data.description) {
    throw new Error("No improvement was returned.");
  }

  return data.description;
}
