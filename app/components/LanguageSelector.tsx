"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"

const languages = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
]

export default function LanguageSelector({ currentLocale }: { currentLocale: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLanguageChange = (newLocale: string) => {
    // Save language preference in a cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div className="relative group flex items-center">
      <select 
        value={currentLocale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        disabled={isPending}
        className="appearance-none bg-transparent text-sm font-medium text-mosque border border-mosque/20 rounded-md py-1 pl-2 pr-7 cursor-pointer focus:outline-none focus:ring-1 focus:ring-mosque/50 hover:bg-mosque/5 disabled:opacity-50 transition-colors"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="text-nordic-dark bg-white">
            {lang.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center text-mosque">
        <span className="material-icons text-[16px]">expand_more</span>
      </div>
    </div>
  )
}
