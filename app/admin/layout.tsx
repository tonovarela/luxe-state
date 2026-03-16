import Link from "next/link"
import { ReactNode } from "react"
import { auth, signOut } from "@/auth"
import UserDropdown from "../components/UserDropdown"
import AdminNavLinks from "./components/AdminNavLinks"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  
  return (
    <div className="bg-background-light font-display text-nordic-dark min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-mosque/10 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo & Primary Nav */}
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group relative z-10">
                <span className="material-icons text-mosque text-3xl font-bold transition-transform group-hover:scale-110">villa</span>
                <span className="text-xl font-bold tracking-tight text-nordic-dark">
                  LuxeEstate
                </span>
              </Link>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <AdminNavLinks />
                <div className="flex items-center pl-6 border-l border-nordic-dark/10">
                  <Link
                    href="/"
                    className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold text-mosque bg-hint-green hover:bg-mosque/20 transition-colors"
                  >
                    <span className="material-icons text-[16px] mr-1.5">launch</span>
                    Return to Site
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Secondary Nav / Profile */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full text-nordic-muted hover:text-mosque hover:bg-mosque/5 transition-colors">
                <span className="material-icons text-xl">notifications_none</span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                {session?.user && (
                    <UserDropdown 
                      user={session.user} 
                      signOutText="Sign Out" 
                      onSignOut={async () => {
                        "use server"
                        await signOut()
                      }} 
                    />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full">
        {children}
      </main>
    </div>
  )
}
