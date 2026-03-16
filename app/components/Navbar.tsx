import Image from "next/image"
import Link from "next/link"
import LanguageSelector from "./LanguageSelector"
import { auth, signIn, signOut } from "@/auth"
import UserDropdown from "./UserDropdown"

export default async function Navbar({ dict = {}, currentLocale = "es" }: { dict?: any, currentLocale?: string }) {
  const session = await auth()
  
  // Use fallbacks in case dict is incomplete
  const t = {
    buy: dict.navbar?.buy || dict.buy || "Buy",
    rent: dict.navbar?.rent || dict.rent || "Rent",
    sell: dict.navbar?.sell || dict.sell || "Sell",
    savedHomes: dict.navbar?.savedHomes || dict.savedHomes || "Saved Homes",
    luxeEstate: dict.navbar?.luxeEstate || dict.luxeEstate || "LuxeEstate",
    signIn: dict.auth?.signIn || dict.signIn || "Sign In",
    signOut: dict.auth?.signOut || dict.signOut || "Sign Out"
  }

  return (
    <nav className="sticky top-0 z-50 bg-background-light/95 backdrop-blur-md border-b border-nordic-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative">
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group relative z-10">
            <span className="material-icons text-mosque text-3xl font-bold transition-transform group-hover:scale-110">villa</span>
            <span className="text-xl font-bold tracking-tight text-nordic-dark">
              {t.luxeEstate}
            </span>
          </Link>

          <div className="hidden md:flex items-center justify-center space-x-10 absolute inset-x-0 mx-auto w-fit">
            <a className="text-mosque font-medium text-sm border-b-2 border-mosque px-1 py-1" href="#">
              {t.buy}
            </a>
            <a className="text-nordic-dark/70 hover:text-nordic-dark font-medium text-sm hover:border-b-2 hover:border-nordic-dark/20 px-1 py-1 transition-all" href="#">
              {t.rent}
            </a>
            <a className="text-nordic-dark/70 hover:text-nordic-dark font-medium text-sm hover:border-b-2 hover:border-nordic-dark/20 px-1 py-1 transition-all" href="#">
              {t.sell}
            </a>
            <a className="text-nordic-dark/70 hover:text-nordic-dark font-medium text-sm hover:border-b-2 hover:border-nordic-dark/20 px-1 py-1 transition-all" href="#">
              {t.savedHomes}
            </a>
          </div>

          <div className="flex items-center space-x-4 ml-auto lg:space-x-6 relative z-10">
            <LanguageSelector currentLocale={currentLocale} />
            
            <button className="text-nordic-dark hover:text-mosque transition-colors hidden sm:block">
              <span className="material-icons">search</span>
            </button>
            <button className="text-nordic-dark hover:text-mosque transition-colors relative hidden sm:block">
              <span className="material-icons">notifications_none</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-background-light"></span>
            </button>
            {session?.user ? (
              <UserDropdown 
                user={session.user} 
                signOutText={t.signOut} 
                onSignOut={async () => {
                  "use server"
                  await signOut()
                }} 
              />
            ) : (
              <Link href="/login" className="flex items-center pl-2 border-l border-nordic-dark/10 ml-2">
                <span className="text-sm font-medium text-nordic-dark hover:text-mosque transition-colors">{t.signIn}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-nordic-dark/5 bg-background-light overflow-hidden h-0 transition-all duration-300">
        <div className="px-4 py-2 space-y-1">
          <a className="block px-3 py-2 rounded-md text-base font-medium text-mosque bg-mosque/10" href="#">
            {t.buy}
          </a>
          <a className="block px-3 py-2 rounded-md text-base font-medium text-nordic-dark hover:bg-black/5" href="#">
            {t.rent}
          </a>
          <a className="block px-3 py-2 rounded-md text-base font-medium text-nordic-dark hover:bg-black/5" href="#">
            {t.sell}
          </a>
          <a className="block px-3 py-2 rounded-md text-base font-medium text-nordic-dark hover:bg-black/5" href="#">
            {t.savedHomes}
          </a>
        </div>
      </div>
    </nav>
  )
}
