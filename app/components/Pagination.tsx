"use client"

import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={`/?page=${currentPage - 1}`}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-nordic-dark/10 bg-white text-nordic-dark text-sm font-medium hover:border-mosque hover:text-mosque transition-all hover:shadow-md"
        >
          <span className="material-icons text-sm">chevron_left</span>
          Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 rounded-lg border border-nordic-dark/10 bg-white text-nordic-muted text-sm font-medium opacity-40 cursor-not-allowed">
          <span className="material-icons text-sm">chevron_left</span>
          Prev
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <Link
            key={page}
            href={`/?page=${page}`}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
              page === currentPage
                ? "bg-nordic-dark text-white shadow-sm"
                : "bg-white border border-nordic-dark/10 text-nordic-dark hover:border-mosque hover:text-mosque hover:shadow-md"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={`/?page=${currentPage + 1}`}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-nordic-dark/10 bg-white text-nordic-dark text-sm font-medium hover:border-mosque hover:text-mosque transition-all hover:shadow-md"
        >
          Next
          <span className="material-icons text-sm">chevron_right</span>
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 rounded-lg border border-nordic-dark/10 bg-white text-nordic-muted text-sm font-medium opacity-40 cursor-not-allowed">
          Next
          <span className="material-icons text-sm">chevron_right</span>
        </span>
      )}
    </div>
  )
}
