"use client"

import { updateUserRole } from "./actions"
import { useTransition } from "react"
import type { User } from "@prisma/client"

export default function UserRoleSelect({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition()

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value
    startTransition(async () => {
      try {
        await updateUserRole(user.id, newRole)
        alert(`User role updated to ${newRole}`)
      } catch (error: any) {
        alert(error.message || "Failed to update role")
      }
    })
  }

  return (
    <select
      disabled={isPending}
      className={`block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white ${isPending ? 'opacity-50' : ''}`}
      defaultValue={user.role}
      onChange={handleRoleChange}
    >
      <option value="USER">User</option>
      <option value="ADMIN">Admin</option>
    </select>
  )
}
