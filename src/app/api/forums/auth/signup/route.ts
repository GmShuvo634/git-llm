import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { createForumSession, hashPassword } from "@/lib/forums-auth";
import { parseForumSignupPayload } from "@/lib/forums-validators";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const payload = parseForumSignupPayload(body);

  if (!payload) {
    return NextResponse.json(
      { error: "Invalid signup payload. Check required fields and password length." },
      { status: 400 },
    );
  }

  try {
    const user = await prisma.forumUser.create({
      data: {
        username: payload.username,
        email: payload.email,
        passwordHash: hashPassword(payload.password),
        fullName: payload.fullName,
        phoneNumber: payload.phoneNumber,
        undergraduateCollege: payload.undergraduateCollege,
        undergraduateCourse: payload.undergraduateCourse,
        city: payload.city,
        interestedIn: payload.interestedIn,
        currentOccupation: payload.currentOccupation,
        workExperienceMonths: payload.workExperienceMonths,
      },
    });

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
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Email ID or User Name already exists." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Could not create forum account." },
      { status: 500 },
    );
  }
}
