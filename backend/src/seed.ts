import { prisma } from "./lib/prisma.js";

export async function seedUsersIfEmpty() {
  const count = await prisma.user.count();
  if (count > 0) return;

  await prisma.user.createMany({
    data: [
      { name: "Ada Admin", role: "admin" },
      { name: "Olivia Owner", role: "owner" },
      { name: "Uma User", role: "user" },
    ],
  });
}
