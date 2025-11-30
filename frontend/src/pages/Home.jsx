import { useState, useEffect } from "react";
import { getProducts } from "../api";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: "All",
    minPrice: "",
    maxPrice: "",
    search: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });

  useEffect(() => {
    fetchData();
  }, [filters, pagination.page]);

  const fetchData = async () => {
    const data = await getProducts({ ...filters, page: pagination.page });
    setProducts(data.products);
    setPagination({
      page: data.page,
      totalPages: data.totalPages,
    });

    if (categories.length === 0) {
      setCategories(data.categories || []);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Shop Now</h1>

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        categories={categories}
      />

      <div className="grid grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="btn"
          disabled={pagination.page === 1}
          onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
        >
          Prev
        </button>

        <span className="btn btn-disabled">
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <button
          className="btn"
          disabled={pagination.page === pagination.totalPages}
          onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
        >
          Next
        </button>
      </div>
    </div>
  );
}
