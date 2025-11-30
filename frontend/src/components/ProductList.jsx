import React from 'react'
import ProductCard from './ProductCard'
import Pagination from './Pagination'

export default function ProductList({ data = { products: [], page: 1, totalPages: 1 }, onPageChange }) {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <Pagination page={data.page} totalPages={data.totalPages} onPageChange={onPageChange} />
    </section>
  )
}
