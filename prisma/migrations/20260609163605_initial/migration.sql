-- CreateEnum
CREATE TYPE "ForumUserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ForumPostStatus" AS ENUM ('PENDING', 'PUBLISHED');

-- CreateTable
CREATE TABLE "ForumUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "undergraduateCollege" TEXT NOT NULL,
    "undergraduateCourse" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "interestedIn" TEXT[],
    "currentOccupation" TEXT,
    "workExperienceMonths" TEXT,
    "role" "ForumUserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumSession" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ForumSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" "ForumPostStatus" NOT NULL DEFAULT 'PENDING',
    "authorId" TEXT NOT NULL,
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumComment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForumComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForumUser_username_key" ON "ForumUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ForumUser_email_key" ON "ForumUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ForumSession_tokenHash_key" ON "ForumSession"("tokenHash");

-- CreateIndex
CREATE INDEX "ForumSession_userId_idx" ON "ForumSession"("userId");

-- CreateIndex
CREATE INDEX "ForumSession_expiresAt_idx" ON "ForumSession"("expiresAt");

-- CreateIndex
CREATE INDEX "ForumPost_status_createdAt_idx" ON "ForumPost"("status", "createdAt");

-- CreateIndex
CREATE INDEX "ForumPost_authorId_idx" ON "ForumPost"("authorId");

-- CreateIndex
CREATE INDEX "ForumComment_postId_createdAt_idx" ON "ForumComment"("postId", "createdAt");

-- CreateIndex
CREATE INDEX "ForumComment_authorId_idx" ON "ForumComment"("authorId");

-- AddForeignKey
ALTER TABLE "ForumSession" ADD CONSTRAINT "ForumSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ForumUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumPost" ADD CONSTRAINT "ForumPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "ForumUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumPost" ADD CONSTRAINT "ForumPost_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "ForumUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumComment" ADD CONSTRAINT "ForumComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "ForumPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumComment" ADD CONSTRAINT "ForumComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "ForumUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
