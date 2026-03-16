import { prisma } from "@/lib/prisma"
import UserCard from "./components/UserCard"
import Link from "next/link"

export default async function AdminUsersPage(props: {
  searchParams?: Promise<{
    role?: string
  }>
}) {
  const searchParams = await props.searchParams
  const roleFilter = searchParams?.role || "ALL"

  const whereClause = roleFilter !== "ALL" ? { role: roleFilter } : {}

  const users = await prisma.user.findMany({
    where: whereClause,
    orderBy: {
      id: "asc"
    }
  })

  return (
    <div className="w-full pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-grow space-y-4">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-nordic-dark">User Directory</h1>
          <p className="text-nordic-muted dark:text-gray-400 mt-1 text-sm">Manage user access and roles for your properties.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative group w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons text-nordic-muted/40 group-focus-within:text-mosque text-xl">search</span>
            </div>
            <input 
               className="block w-full pl-10 pr-3 py-2.5 border border-nordic-dark/10 rounded-lg bg-white text-nordic-dark shadow-sm placeholder-nordic-muted/60 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-sm outline-none" 
               placeholder="Search by name, email..." 
               type="text" 
            />
          </div>
        </div>
      </header>
      
      {/* Tabs */}
      <div className="mt-8 flex gap-6 border-b border-nordic-dark/10 overflow-x-auto mb-6">
        <Link 
          href="/admin/users" 
          className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors ${roleFilter === 'ALL' ? 'font-semibold text-mosque border-b-2 border-mosque' : 'text-nordic-muted hover:text-nordic-dark'}`}
        >
          All Users
        </Link>
        <Link 
          href="/admin/users?role=ADMIN" 
          className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors ${roleFilter === 'ADMIN' ? 'font-semibold text-mosque border-b-2 border-mosque' : 'text-nordic-muted hover:text-nordic-dark'}`}
        >
          Admins
        </Link>
        <Link 
          href="/admin/users?role=USER" 
          className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors ${roleFilter === 'USER' ? 'font-semibold text-mosque border-b-2 border-mosque' : 'text-nordic-muted hover:text-nordic-dark'}`}
        >
          Viewers
        </Link>
      </div>

      <div className="hidden md:grid grid-cols-12 gap-4 px-6 text-xs font-semibold uppercase tracking-wider text-nordic-muted mb-2">
        <div className="col-span-4">User Details</div>
        <div className="col-span-3">Role &amp; Status</div>
        <div className="col-span-3">Performance</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-10 text-nordic-muted">
          No users found
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
      
      {/* Pagination Footer */}
      <footer className="mt-8 border-t border-nordic-dark/5 bg-background-light py-6">
        <div className="flex items-center justify-between">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-nordic-muted">
                  Showing <span className="font-medium text-nordic-dark">{users.length > 0 ? 1 : 0}</span> to <span className="font-medium text-nordic-dark">{users.length}</span> of <span className="font-medium text-nordic-dark">{users.length}</span> users
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
