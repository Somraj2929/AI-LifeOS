package controllers

import (
	"context"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	openai "github.com/sashabaranov/go-openai"
)

type ItineraryRequest struct {
	From         string   `json:"from"`
	To           string   `json:"to"`
	Stops        []string `json:"stops"`
	Dates        struct {
		From string `json:"from"`
		To   string `json:"to"`
	} `json:"dates"`
	Preferences   []string `json:"preferences"`
	AdditionalReq string   `json:"additionalReq"`
}

func ItineraryController(c *gin.Context) {
	var req ItineraryRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	client := openai.NewClient(os.Getenv("OPENAI_API_KEY"))

	prompt := buildItineraryPrompt(req)

	resp, err := client.CreateChatCompletion(context.Background(), openai.ChatCompletionRequest{
		Model: "gpt-4o-mini",
		Store: false,
		Messages: []openai.ChatCompletionMessage{
			{
				Role:    "system",
				Content: "You are a travel planning assistant. Always return the response in strict JSON format matching the requested fields. Follow structure closely. Do not include any text outside the JSON.",
			},
			{
				Role:    "user",
				Content: prompt,
			},
		},
		Temperature: 0.8,
	})
	if err != nil {
		log.Printf("OpenAI call failed: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Header("Content-Type", "application/json")
	c.String(http.StatusOK, resp.Choices[0].Message.Content)
}




func buildItineraryPrompt(req ItineraryRequest) string {
	var sb strings.Builder

	sb.WriteString("Create a travel itinerary with the following data:\n\n")
	sb.WriteString("From: " + req.From + "\n")
	sb.WriteString("To: " + req.To + "\n")

	if len(req.Stops) > 0 {
		sb.WriteString("Stops:\n")
		for _, stop := range req.Stops {
			sb.WriteString("- " + stop + "\n")
		}
	} else {
		sb.WriteString("Stops: None\n")
	}

	sb.WriteString("Dates:\n")
	sb.WriteString("- From: " + req.Dates.From + "\n")
	sb.WriteString("- To: " + req.Dates.To + "\n")

	sb.WriteString("Preferences (travel modes):\n")
	for _, pref := range req.Preferences {
		sb.WriteString("- " + pref + "\n")
	}

	if req.AdditionalReq != "" {
		sb.WriteString("Additional Request: " + req.AdditionalReq + "\n")
	}

	// Format date duration
	start, _ := time.Parse("2006-01-02", req.Dates.From)
	end, _ := time.Parse("2006-01-02", req.Dates.To)
	days := int(end.Sub(start).Hours()/24) + 1

	sb.WriteString("\nGenerate a full itinerary in the following strict JSON format:\n")
	sb.WriteString(`{
  "tripSummary": {
    "from": "string",
    "to": "string",
    "stops": ["string"],
    "dates": {
      "start": "YYYY-MM-DD",
      "end": "YYYY-MM-DD"
    },
    "preferences": ["string"]
  },
  "travelArrangements": [ // Based on preferences
    {
      "mode": "string",
	  "trainName": "string",  // if mode is train
	  "airline": "string", // if mode is flight
	  "provider": "string", // if mode is bus
      "departureLocation": "string",
      "arrivalLocation": "string",
      "departure": "ISO timestamp",
      "arrival": "ISO timestamp",
      "duration": "string",
      "price": "string",
      "bookingLink": "url"
    },
	//if preferences have cab then following structure
	{	
	  "mode": "string",
      "purpose": "string",
      "bookingOption": "string",
      "approxCost": "string",
      "contact": "phone/email",
	  "pickupLocation": "string",
    }
  ],
  "itinerary": [ // Day-wise plan, ` + string(rune(days)) + ` days
    {
      "day": "Day N",
      "date": "YYYY-MM-DD",
      "location": "string",
      "title": "2-word creative title",
      "activities": ["..."]
    }
  ],
  "suggestedPlaces": ["place1", "place2", "etc"],
  "additionalInfo": "any important travel note"
}

Guidelines:
1. Include unique day titles for each day like "Adventure Awaits", "Cultural Exploration", etc. keep it creative.
2. Use additionalReq to enrich the 'activities' & 'suggestedPlaces' for each day or destination/stop.
3. If stops array is empty, skip stop planning.
4. Provide minimum 2-3 good places for final destination and 1 for each stop.
5. Match modes of travel only from preferences list & provide accurate data from reliable sources.
6. Provide correct contact details for cab booking if available. if not, use 'null'.
7. Include total travel distances if possible in activities.
8. Make sure to generate a complete itinerary with all required fields including depature day & return daywise activities.
9. No explanation or markdown. Only JSON.
`)

	return sb.String()
}
