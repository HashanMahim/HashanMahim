import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/store";

export async function GET() {
  const data = await readData();
  return NextResponse.json(data.posts);
}

export async function DELETE(request: Request) {
  const { id } = (await request.json()) as { id: string };
  const data = await readData();
  data.posts = data.posts.filter((p) => p.id !== id);
  await writeData(data);
  return NextResponse.json(data.posts);
}
