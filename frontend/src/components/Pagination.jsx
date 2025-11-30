import React from 'react'

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null
  const pages = []
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, page + 2)

  for (let p = start; p <= end; p++) pages.push(p)

  return (
    <div className="join mt-6 flex justify-center gap-2">
      <button className="btn btn-sm" onClick={() => onPageChange(1)} disabled={page === 1}>
        First
      </button>
      <button className="btn btn-sm" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`btn btn-sm ${p === page ? 'btn-active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="btn btn-sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
      <button
        className="btn btn-sm"
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      >
        Last
      </button>
    </div>
  )
}
