import { NextResponse } from "next/server";
import { ForumPostStatus } from "@prisma/client";
import { getCurrentForumUser } from "@/lib/forums-auth";
import { toForumPostView } from "@/lib/forums-mappers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.forumPost.findMany({
    where: { status: ForumPostStatus.PUBLISHED },
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

  return NextResponse.json({ forums: posts.map(toForumPostView) });
}

export async function POST(request: Request) {
  const user = await getCurrentForumUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const category = typeof body?.category === "string" ? body.category.trim() : "";
  const text = typeof body?.body === "string" ? body.body.trim() : "";

  if (!title || !category || !text) {
    return NextResponse.json(
      { error: "Title, category and body are required." },
      { status: 400 },
    );
  }

  const created = await prisma.forumPost.create({
    data: {
      title,
      category,
      body: text,
      authorId: user.id,
      status: ForumPostStatus.PENDING,
    },
    include: {
      author: true,
      comments: { include: { author: true } },
    },
  });

  return NextResponse.json({
    ok: true,
    message: "Forum submitted. It will be published after admin approval.",
    forum: toForumPostView(created),
  });
}
