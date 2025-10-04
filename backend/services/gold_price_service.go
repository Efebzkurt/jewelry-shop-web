package services

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

type MetalPriceAPIResponse struct {
	Success bool               `json:"success"`
	Base    string             `json:"base"`
	Rates   map[string]float64 `json:"rates"`
}

var cachedGoldPrice float64
var lastFetchTime time.Time

func GetGoldPrice() (float64, error) {
	// Cache for 1 hour 
	if time.Since(lastFetchTime) < time.Hour && cachedGoldPrice > 0 {
		return cachedGoldPrice, nil
	}

	
	apiKey := os.Getenv("METAL_PRICE_API_KEY")
	if apiKey == "" {
		fmt.Println("Warning: METAL_PRICE_API_KEY not set")
		return 0.0, nil 
	}

	
	url := fmt.Sprintf("https://api.metalpriceapi.com/v1/latest?api_key=%s&base=USD&currencies=XAU", apiKey)
	
	resp, err := http.Get(url)
	if err != nil {
		fmt.Printf("Error fetching gold price: %v, using fallback\n", err)
		return 0.0, nil 
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		fmt.Printf("API returned status %d", resp.StatusCode)
		return 0.0, nil
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Error reading response: %v", err)
		return 0.0, nil
	}

	var result MetalPriceAPIResponse
	if err := json.Unmarshal(body, &result); err != nil {
		fmt.Printf("Error parsing JSON: %v", err)
		return 0.0, nil
	}

	if !result.Success {
		fmt.Println("API request unsuccessful")
		return 0.0, nil
	}


	xauRate, exists := result.Rates["XAU"]
	if !exists {
		fmt.Println("XAU rate not found in response")
		return 0.0, nil
	}
	
	goldPricePerOunce := xauRate //1 troy ounce of gold in USD
	
	goldPricePerGram := goldPricePerOunce / 31.1035

	cachedGoldPrice = goldPricePerGram
	lastFetchTime = time.Now()

	fmt.Printf("Gold price updated: $%.2f per troy ounce, $%.2f per gram\n", goldPricePerOunce, goldPricePerGram)
	return goldPricePerGram, nil
}