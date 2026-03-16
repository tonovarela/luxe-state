"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface UserDropdownProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  signOutText: string
  onSignOut: () => void
}

export default function UserDropdown({ user, signOutText, onSignOut }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.addEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative border-l border-nordic-dark/10 ml-2 pl-2" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-transparent hover:ring-mosque transition-all relative">
          {user.image ? (
            <Image
              alt={user.name || "Profile"}
              className="w-full h-full object-cover"
              src={user.image}
              fill
              unoptimized
              sizes="36px"
            />
          ) : (
            <div className="w-full h-full bg-mosque text-white flex items-center justify-center font-bold">
              {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a3833] rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-100 dark:border-primary/20">
          <div className="px-4 py-2 border-b border-gray-100 dark:border-primary/20">
            <p className="text-sm font-medium text-nordic-dark dark:text-white truncate">{user.name}</p>
            <p className="text-xs text-nordic/60 dark:text-gray-400 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => {
              setIsOpen(false)
              onSignOut()
            }}
            className="w-full text-left flex items-center justify-between px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
          >
            <span>{signOutText}</span>
            <span className="material-icons text-[18px] group-hover:translate-x-1 transition-transform">logout</span>
          </button>
        </div>
      )}
    </div>
  )
}
