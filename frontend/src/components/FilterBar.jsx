import React from 'react'

export default function FilterBar({ categories = [], filters, setFilters, onReset }) {
  return (
    <div className="card bg-base-100 shadow mb-6 p-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            className="select select-bordered w-48"
            value={filters.category}
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Min Price</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-36"
            value={filters.minPrice}
            onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Max Price</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-36"
            value={filters.maxPrice}
            onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Search</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-48"
            placeholder="Search product..."
            value={filters.search || ""}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          />
        </div>

        <div className="ml-auto">
          <button className="btn btn-outline mr-2" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
