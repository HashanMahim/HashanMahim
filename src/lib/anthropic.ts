import Anthropic from "@anthropic-ai/sdk";
import type { Profile, PostSourceType } from "./types";

const client = new Anthropic();

const TONE_INSTRUCTIONS: Record<string, string> = {
  professional: "professional and polished",
  enthusiastic: "enthusiastic and energetic",
  reflective: "reflective and thoughtful",
};

export async function generateLinkedInPost(params: {
  profile: Profile;
  sourceType: PostSourceType;
  sourceTitle: string;
  details: string;
  tone: string;
}): Promise<string> {
  const { profile, sourceType, sourceTitle, details, tone } = params;
  const toneDescription = TONE_INSTRUCTIONS[tone] ?? tone;

  const sourceLabel: Record<PostSourceType, string> = {
    project: "a personal/academic project",
    experience: "an internship or work experience",
    coursework: "a coursework achievement",
    custom: "an achievement",
  };

  const prompt = `Write a LinkedIn post for a student announcing ${sourceLabel[sourceType]}.

Student name: ${profile.name || "the student"}
Student headline: ${profile.headline || "N/A"}

Title: ${sourceTitle}
Details: ${details}

Tone: ${toneDescription}

Requirements:
- 3-6 short paragraphs, LinkedIn style, no markdown formatting, no headers.
- Written in first person, as if the student is posting it themselves.
- End with 3-5 relevant hashtags on their own line.
- Do not use excessive emojis (at most 1-2 total).
- Do not invent facts not present in the details provided.
- Return only the post text, nothing else.`;

  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content returned from Claude");
  }
  return textBlock.text.trim();
}
