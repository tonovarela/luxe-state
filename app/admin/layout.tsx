import Link from "next/link"
import { ReactNode } from "react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="mb-8 px-2">
            <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/admin"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <span className="ml-3">Overview</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/properties"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <span className="ml-3">Properties</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <span className="ml-3">Users</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 group mt-8"
              >
                <span className="ml-3">← Back to Site</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}
