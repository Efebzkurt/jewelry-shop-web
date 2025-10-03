export interface Product {
  id: string;
  name: string;
  popularityScore: number;
  weight: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
  price: number;
  popularityStars: number;
}

export type ColorOption = "yellow" | "rose" | "white";

export interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  minPopularity?: number;
  maxPopularity?: number;
}
