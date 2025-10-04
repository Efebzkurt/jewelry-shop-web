package handlers

import (
	"backend/services"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func GetProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	products, err := services.LoadProducts()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	
	queryParams := r.URL.Query()
	
	var minPrice, maxPrice, minPopularity, maxPopularity *float64

	if minPriceStr := queryParams.Get("minPrice"); minPriceStr != "" {
		if val, err := strconv.ParseFloat(minPriceStr, 64); err == nil {
			minPrice = &val
		}
	}

	if maxPriceStr := queryParams.Get("maxPrice"); maxPriceStr != "" {
		if val, err := strconv.ParseFloat(maxPriceStr, 64); err == nil {
			maxPrice = &val
		}
	}

	if minPopStr := queryParams.Get("minPopularity"); minPopStr != "" {
		if val, err := strconv.ParseFloat(minPopStr, 64); err == nil {
			minPopularity = &val
		}
	}

	if maxPopStr := queryParams.Get("maxPopularity"); maxPopStr != "" {
		if val, err := strconv.ParseFloat(maxPopStr, 64); err == nil {
			maxPopularity = &val
		}
	}

	// Filters
	if minPrice != nil || maxPrice != nil || minPopularity != nil || maxPopularity != nil {
		products = services.FilterProducts(products, minPrice, maxPrice, minPopularity, maxPopularity)
	}

	json.NewEncoder(w).Encode(products)
}

func GetProductByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	params := mux.Vars(r)
	id := params["id"]

	products, err := services.LoadProducts()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for _, product := range products {
		if product.ID == id {
			json.NewEncoder(w).Encode(product)
			return
		}
	}

	http.Error(w, "Product not found", http.StatusNotFound)
}