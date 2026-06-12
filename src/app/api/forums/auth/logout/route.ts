import { NextResponse } from "next/server";
import { clearForumSession } from "@/lib/forums-auth";

export async function POST() {
  await clearForumSession();
  return NextResponse.json({ ok: true });
}
