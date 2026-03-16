"use client"

import { useTransition, useState } from "react"
import { updateUserRole } from "../actions"
import type { User } from "@prisma/client"

export default function UserCard({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleRoleChange = (newRole: string) => {
    setIsDropdownOpen(false)
    startTransition(async () => {
      try {
        await updateUserRole(user.id, newRole)
      } catch (error: any) {
        alert(error.message || "Failed to update role")
      }
    })
  }

  const roleLabels: Record<string, string> = {
    ADMIN: "Administrator",
    USER: "Viewer"  // We can treat default "USER" as "Viewer" for the design match
  }

  return (
    <div className={`user-card group relative bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:bg-hint-green transition-all flex flex-col md:grid md:grid-cols-12 gap-4 items-center ${isPending ? 'opacity-50' : ''}`}>
      {/* User Details */}
      <div className="col-span-12 md:col-span-4 flex items-center w-full">
        <div className="relative flex-shrink-0">
          {user.image ? (
            <img 
              alt={`Portrait of ${user.name}`} 
              className="h-12 w-12 rounded-full object-cover border-2 border-white" 
              src={user.image}
            />
          ) : (
             <div className="h-12 w-12 rounded-full bg-mosque/20 flex items-center justify-center text-mosque font-bold text-lg border-2 border-white">
               {user.name?.charAt(0) || "U"}
             </div>
          )}
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
        </div>
        <div className="ml-4 overflow-hidden">
          <div className="text-sm font-bold text-nordic-dark truncate">{user.name || "Unnamed User"}</div>
          <div className="text-xs text-nordic-muted truncate">{user.email || "No email"}</div>
          <div className="mt-1 text-[10px] px-2 py-0.5 inline-block bg-gray-50 rounded text-nordic-muted group-hover:bg-white/50 transition-colors">
            ID: #{user.id.slice(-6).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Role & Status */}
      <div className="col-span-12 md:col-span-3 w-full flex items-center justify-between md:justify-start gap-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
          user.role === 'ADMIN' ? 'bg-nordic-dark text-white' : 'bg-gray-100 text-gray-600'
        }`}>
            {roleLabels[user.role] || user.role}
        </span>
        <div className="flex items-center text-xs text-nordic-muted">
            <span className={`material-icons text-[14px] mr-1 ${user.role === 'ADMIN' ? 'text-mosque' : 'text-gray-400'}`}>
              {user.role === 'ADMIN' ? 'check_circle' : 'remove_circle_outline'}
            </span>
            {user.role === 'ADMIN' ? 'Active' : 'Inactive'}
        </div>
      </div>

      {/* Performance (Static placeholders based on HTML, since we don't have this in DB) */}
      <div className="col-span-12 md:col-span-3 w-full grid grid-cols-2 gap-4">
        <div>
           <div className="text-[10px] uppercase tracking-wider text-nordic-muted/70">Properties</div>
           <div className="text-sm font-semibold text-nordic-dark">{user.role === 'ADMIN' ? '24' : '0'}</div>
        </div>
        <div>
            <div className="text-[10px] uppercase tracking-wider text-nordic-muted/70">{user.role === 'ADMIN' ? 'Access Level' : 'Last Login'}</div>
            <div className="text-sm font-semibold text-nordic-dark">{user.role === 'ADMIN' ? 'Level 5' : '2mo ago'}</div>
        </div>
      </div>

      {/* Actions / Dropdown */}
      <div className="col-span-12 md:col-span-2 w-full flex justify-end relative">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={isPending}
          className={`inline-flex items-center px-4 py-2 border shadow-sm text-xs font-medium rounded-lg focus:outline-none transition-colors w-full md:w-auto justify-center ${
            user.role === 'ADMIN' 
              ? 'bg-mosque text-white border-transparent hover:bg-mosque/90' 
              : 'border-nordic-dark/10 bg-white text-nordic-dark hover:bg-nordic-dark hover:text-white'
          }`}
        >
          {isPending ? 'Updating...' : 'Change Role'}
          {!isPending && <span className="material-icons text-[16px] ml-2">{isDropdownOpen ? 'expand_less' : 'expand_more'}</span>}
        </button>

        {isDropdownOpen && (
           <div className="absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl bg-mosque ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-50 origin-top-right animate-fade-in-down">
             <div className="py-1" role="menu">
                 <button 
                   onClick={() => handleRoleChange('ADMIN')}
                   className={`w-full group flex items-center px-4 py-3 text-xs transition-colors ${user.role === 'ADMIN' ? 'bg-white/20 text-white font-medium' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                 >
                     <span className={`material-icons text-sm mr-3 ${user.role === 'ADMIN' ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>shield</span>
                     Administrator
                 </button>
                 <button 
                   onClick={() => handleRoleChange('USER')}
                   className={`w-full group flex items-center px-4 py-3 text-xs transition-colors ${user.role === 'USER' ? 'bg-white/20 text-white font-medium' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                 >
                     <span className={`material-icons text-sm mr-3 ${user.role === 'USER' ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>visibility</span>
                     Viewer (User)
                 </button>
             </div>
           </div>
        )}
      </div>
    </div>
  )
}
