package services

import (
	"backend/models"
	"encoding/json"
	"fmt"
	"io"
	"os"
)

func LoadProducts() ([]models.Product, error) {
	file, err := os.Open("data/products.json")
	if err != nil {
		return nil, err
	}
	defer file.Close()

	byteValue, err := io.ReadAll(file)
	if err != nil {
		return nil, err
	}

	var productData []models.ProductData
	if err := json.Unmarshal(byteValue, &productData); err != nil {
		return nil, err
	}

	goldPrice, err := GetGoldPrice()
	if err != nil {
		goldPrice = 65.0 
	}

	products := make([]models.Product, len(productData))
	for i, pd := range productData {
		
		price := (pd.PopularityScore + 1) * pd.Weight * goldPrice
		
		// Convert popularity score to stars (0-100 -> 0-5 stars)
		popularityStars := pd.PopularityScore * 5

		products[i] = models.Product{
			ID:              fmt.Sprintf("product-%d", i+1),
			Name:            pd.Name,
			PopularityScore: pd.PopularityScore,
			Weight:          pd.Weight,
			Images:          pd.Images,
			Price:           price,
			PopularityStars: popularityStars,
		}
	}

	return products, nil
}

func FilterProducts(products []models.Product, minPrice, maxPrice *float64, minPopularity, maxPopularity *float64) []models.Product {
	filtered := make([]models.Product, 0)

	for _, product := range products {
		// Price filter
		if minPrice != nil && product.Price < *minPrice {
			continue
		}
		if maxPrice != nil && product.Price > *maxPrice {
			continue
		}

		// Popularity filter
		if minPopularity != nil && product.PopularityScore < *minPopularity {
			continue
		}
		if maxPopularity != nil && product.PopularityScore > *maxPopularity {
			continue
		}

		filtered = append(filtered, product)
	}

	return filtered
}