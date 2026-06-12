import { PrismaClient } from "@prisma/client";
import { randomBytes, scryptSync } from "node:crypto";

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  const email = (process.env.FORUM_ADMIN_EMAIL ?? "admin@getintoiims.com").toLowerCase();
  const username = process.env.FORUM_ADMIN_USERNAME ?? "GIIAdmin";
  const password = process.env.FORUM_ADMIN_PASSWORD ?? "ChangeMe123!";

  await prisma.forumUser.upsert({
    where: { email },
    update: {
      role: "ADMIN",
      username,
    },
    create: {
      email,
      username,
      passwordHash: hashPassword(password),
      fullName: "Forum Administrator",
      phoneNumber: "9999999999",
      undergraduateCollege: "N/A",
      undergraduateCourse: "N/A",
      city: "N/A",
      interestedIn: ["None"],
      role: "ADMIN",
    },
  });

  console.log(`Seeded/updated forum admin: ${email}`);
}

main()
  .catch((error) => {
    console.error("Failed to seed forum admin", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
