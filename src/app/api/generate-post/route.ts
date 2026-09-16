import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { readData, writeData } from "@/lib/store";
import { generateLinkedInPost } from "@/lib/anthropic";
import type { PostSourceType, GeneratedPost } from "@/lib/types";

interface GenerateRequestBody {
  sourceType: PostSourceType;
  sourceId?: string;
  sourceTitle: string;
  details: string;
  tone: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as GenerateRequestBody;
  const data = await readData();

  try {
    const content = await generateLinkedInPost({
      profile: data.profile,
      sourceType: body.sourceType,
      sourceTitle: body.sourceTitle,
      details: body.details,
      tone: body.tone,
    });

    const post: GeneratedPost = {
      id: crypto.randomUUID(),
      sourceType: body.sourceType,
      sourceTitle: body.sourceTitle,
      tone: body.tone,
      content,
      createdAt: new Date().toISOString(),
    };

    data.posts = [post, ...data.posts];
    await writeData(data);

    return NextResponse.json(post);
  } catch (err) {
    if (
      err instanceof Anthropic.AuthenticationError ||
      (err instanceof Error && err.message.includes("Could not resolve authentication method"))
    ) {
      return NextResponse.json(
        { error: "Missing or invalid ANTHROPIC_API_KEY. Set it in your environment to enable post generation." },
        { status: 401 },
      );
    }
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "Rate limited by the Claude API. Try again shortly." },
        { status: 429 },
      );
    }
    if (err instanceof Anthropic.APIError) {
      return NextResponse.json({ error: `Claude API error: ${err.message}` }, { status: 502 });
    }
    return NextResponse.json({ error: "Failed to generate post." }, { status: 500 });
  }
}
