import React, { useState, useEffect } from 'react'
import ProductList from './components/ProductList'
import FilterBar from './components/FilterBar'
import { fetchProducts, fetchCategories } from './api'

export default function App() {
  const [productsData, setProductsData] = useState({ products: [], page: 1, totalPages: 1 })
  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '', search: '' })
  const [categories, setCategories] = useState([])

  useEffect(() => { fetchCategories().then(setCategories) }, [])

  async function load(page = 1) {
    const res = await fetchProducts({
      page,
      limit: 20,
      category: filters.category || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      search: filters.search || undefined
    })
    setProductsData({ products: res.products, page: res.page, totalPages: res.totalPages })
  }

  useEffect(() => { load(1) }, [filters])

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-4">
          <h1 className="text-3xl font-bold">Ecom – Phase 1</h1>
          <p className="text-sm text-muted">Product listing with pagination & filters</p>
        </header>

        <FilterBar
          categories={categories}
          filters={filters}
          setFilters={setFilters}
          onReset={() => setFilters({ category: '', minPrice: '', maxPrice: '', search: '' })}
        />

        <ProductList data={productsData} onPageChange={(p) => load(p)} />
      </div>
    </div>
  )
}
