import { NextResponse } from "next/server";
import { ForumPostStatus } from "@prisma/client";
import { getCurrentForumUser } from "@/lib/forums-auth";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_request: Request, context: RouteContext) {
  const user = await getCurrentForumUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await context.params;
  const existing = await prisma.forumPost.findUnique({
    where: { id },
    select: { id: true, status: true },
  });

  if (!existing) {
    return NextResponse.json({ error: "Forum not found." }, { status: 404 });
  }

  if (existing.status === ForumPostStatus.PUBLISHED) {
    return NextResponse.json({ ok: true, message: "Forum is already published." });
  }

  await prisma.forumPost.update({
    where: { id },
    data: {
      status: ForumPostStatus.PUBLISHED,
      approvedAt: new Date(),
      approvedById: user.id,
    },
  });

  return NextResponse.json({ ok: true });
}
