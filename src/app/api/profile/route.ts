import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/store";
import type { Profile } from "@/lib/types";

export async function GET() {
  const data = await readData();
  return NextResponse.json(data.profile);
}

export async function PUT(request: Request) {
  const profile = (await request.json()) as Profile;
  const data = await readData();
  data.profile = profile;
  await writeData(data);
  return NextResponse.json(data.profile);
}
