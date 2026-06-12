import { NextResponse } from "next/server";
import { getCurrentForumUser } from "@/lib/forums-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentForumUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await prisma.forumUser.findMany({
    select: {
      id: true,
      username: true,
      email: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ users });
}
