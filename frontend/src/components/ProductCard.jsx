import React from 'react'

export default function ProductCard({ product }) {
  return (
    <div className="card card-compact w-full bg-base-100 shadow">
      <figure>
        <img src={product.image} alt={product.name} className="object-cover h-40 w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{product.name}</h2>
        <p className="text-sm text-muted">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <div className="font-bold">₹{product.price.toFixed(2)}</div>
            <div className="text-sm">Rating: {product.rating || 0}</div>
          </div>
          <button className="btn btn-primary btn-sm">Add</button>
        </div>
      </div>
    </div>
  )
}
