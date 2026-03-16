"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminNavLinks() {
  const pathname = usePathname()

  const links = [
    { href: "/admin", label: "Dashboard", exact: true },
    { href: "/admin/properties", label: "Properties" },
    { href: "/admin/users", label: "Users" },
  ]

  return (
    <>
      {links.map((link) => {
        const isActive = link.exact 
          ? pathname === link.href 
          : pathname.startsWith(link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-mosque text-mosque"
                : "border-transparent text-nordic-muted hover:text-mosque hover:border-mosque/30"
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </>
  )
}
