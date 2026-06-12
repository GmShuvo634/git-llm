import { NextResponse } from "next/server";
import { getCurrentForumUser } from "@/lib/forums-auth";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, context: RouteContext) {
  const user = await getCurrentForumUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await context.params;
  const post = await prisma.forumPost.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!post) {
    return NextResponse.json({ error: "Forum not found." }, { status: 404 });
  }

  await prisma.forumPost.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}
