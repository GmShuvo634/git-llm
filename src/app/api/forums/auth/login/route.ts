import { NextResponse } from "next/server";
import { createForumSession, verifyPassword } from "@/lib/forums-auth";
import { parseForumLoginPayload } from "@/lib/forums-validators";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const payload = parseForumLoginPayload(body);

  if (!payload) {
    return NextResponse.json({ error: "Invalid login payload." }, { status: 400 });
  }

  const user = await prisma.forumUser.findUnique({
    where: { email: payload.email },
  });

  if (!user || !verifyPassword(payload.password, user.passwordHash)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  await createForumSession(user.id);

  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    },
  });
}
