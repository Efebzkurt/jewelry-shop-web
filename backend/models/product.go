package models

type Product struct {
	ID              string            `json:"id"`
	Name            string            `json:"name"`
	PopularityScore float64           `json:"popularityScore"`
	Weight          float64           `json:"weight"`
	Images          map[string]string `json:"images"`
	Price           float64           `json:"price"`
	PopularityStars float64           `json:"popularityStars"`
}

type ProductData struct {
	Name            string            `json:"name"`
	PopularityScore float64           `json:"popularityScore"`
	Weight          float64           `json:"weight"`
	Images          map[string]string `json:"images"`
}