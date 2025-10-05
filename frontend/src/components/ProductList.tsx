"use client";
import { useProducts } from "@/hooks/useProducts";
import { FilterOptions } from "@/types/product";
import React, { useState } from "react";
import ProductCarousel from "./ProductCarousel";

export default function ProductList() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const { products, loading, error } = useProducts(filters);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-xl font-semibold mb-2">
            Error Loading Products
          </div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="my-4 px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 pt-4">
      <h1 className="text-[45px] font-medium text-black py-10 text-center">
        Product List
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No products found matching your criteria.
          </p>
        </div>
      ) : (
        <ProductCarousel products={products} />
      )}
    </div>
  );
}
