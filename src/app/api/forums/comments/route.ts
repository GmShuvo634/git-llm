import { NextResponse } from "next/server";
import { ForumPostStatus } from "@prisma/client";
import { getCurrentForumUser } from "@/lib/forums-auth";
import { toForumCommentView } from "@/lib/forums-mappers";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const user = await getCurrentForumUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const postId = typeof body?.forumId === "string" ? body.forumId : "";
  const text = typeof body?.text === "string" ? body.text.trim() : "";

  if (!postId || !text) {
    return NextResponse.json(
      { error: "Forum ID and comment text are required." },
      { status: 400 },
    );
  }

  const post = await prisma.forumPost.findUnique({
    where: { id: postId },
    select: { id: true, status: true },
  });

  if (!post || post.status !== ForumPostStatus.PUBLISHED) {
    return NextResponse.json(
      { error: "Comments are allowed only on published forums." },
      { status: 400 },
    );
  }

  const comment = await prisma.forumComment.create({
    data: {
      postId,
      authorId: user.id,
      text,
    },
    include: {
      author: true,
    },
  });

  return NextResponse.json({
    ok: true,
    comment: toForumCommentView(comment),
  });
}
