"use client";

import { useState } from "react";
import Image from "next/image";
import { Product, ColorOption } from "@/types/product";
import ColorPicker from "./ColorPicker";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ColorOption>("yellow");

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const displayedRating = fullStars + (hasHalfStar ? 0.5 : 0);
    const ratingText = displayedRating.toFixed(1);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-5 h-5 fill-orange-200"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-5 h-5" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${product.id}`}>
                <stop offset="50%" stopColor="#FFD6A8" /> {/*orange-200*/}
                <stop offset="50%" stopColor="#D1D5DC" /> {/*gray-300*/}
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-${product.id})`}
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-5 h-5 fill-gray-300"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}

        <div className="ml-2 text-[14px] font-bold text-black">
          {ratingText}/5
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-4xl overflow-hidden hover:shadow-lg cursor-pointer transition-shadow duration-300 ">
      <div className="relative aspect-square ">
        <Image
          src={product.images[selectedColor]}
          alt={product.name}
          fill
          className="object-cover rounded-4xl"
        />
      </div>
      <div className="p-2">
        <p className="text-[15px] font-montserrat font-medium text-black mb-2">
          {product.name}
        </p>
        <p className="text-[15px] font-montserrat font-normal text-black ">
          ${product.price.toFixed(2)} USD
        </p>

        <div className="my-4">
          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        </div>
        <div className="mb-8">{renderStars(product.popularityStars)}</div>
      </div>
    </div>
  );
}
