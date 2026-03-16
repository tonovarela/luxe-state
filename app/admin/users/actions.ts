"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateUserRole(userId: string, newRole: string) {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized to update user roles. Admin access required.")
  }

  if (!["USER", "ADMIN"].includes(newRole)) {
    throw new Error("Invalid role specified.")
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  })

  revalidatePath("/admin/users")
}
