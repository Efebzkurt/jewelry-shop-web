import { Product, FilterOptions } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const productApi = {
  //Get Product
  async getProducts(filters?: FilterOptions): Promise<Product[]> {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.minPrice !== undefined)
        params.append("minPrice", filters.minPrice.toString());
      if (filters.maxPrice !== undefined)
        params.append("maxPrice", filters.maxPrice.toString());
      if (filters.minPopularity !== undefined)
        params.append("minPopularity", filters.minPopularity.toString());
      if (filters.maxPopularity !== undefined)
        params.append("maxPopularity", filters.maxPopularity.toString());
    }

    const url = `${API_BASE_URL}/products${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  },

  //Get Product by id
  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return response.json();
  },
};
