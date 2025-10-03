import { useState, useEffect } from "react";
import { Product, FilterOptions } from "@/types/product";
import { productApi } from "@/services/api";

export const useProducts = (filters?: FilterOptions) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productApi.getProducts(filters);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    filters?.minPrice,
    filters?.maxPrice,
    filters?.minPopularity,
    filters?.maxPopularity,
  ]);

  return { products, loading, error };
};
