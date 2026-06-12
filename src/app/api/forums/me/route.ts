import { NextResponse } from "next/server";
import { getCurrentForumUser } from "@/lib/forums-auth";

export async function GET() {
  const user = await getCurrentForumUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  return NextResponse.json({ user });
}
