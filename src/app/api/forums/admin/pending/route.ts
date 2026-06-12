import { NextResponse } from "next/server";
import { ForumPostStatus } from "@prisma/client";
import { getCurrentForumUser } from "@/lib/forums-auth";
import { toForumPostView } from "@/lib/forums-mappers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentForumUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const pending = await prisma.forumPost.findMany({
    where: { status: ForumPostStatus.PENDING },
    include: {
      author: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ forums: pending.map(toForumPostView) });
}
