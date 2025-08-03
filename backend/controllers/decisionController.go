package controllers

import (
	"context"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	openai "github.com/sashabaranov/go-openai"
)

type DecisionRequest struct {
	Options []string `json:"options"`
}

func DecisionEngineHandler(c *gin.Context) {
	var req DecisionRequest
	if err := c.ShouldBindJSON(&req); err != nil || len(req.Options) < 2 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please provide at least two options."})
		return
	}

	client := openai.NewClient(os.Getenv("OPENAI_API_KEY"))

	prompt := buildDecisionPrompt(req.Options)

	resp, err := client.CreateChatCompletion(context.Background(), openai.ChatCompletionRequest{
		Model: "gpt-4o-mini",
		Store: false,
		Messages: []openai.ChatCompletionMessage{
			{
				Role:    "system",
				Content: "You are a decision-making assistant. Always return the response in a strict JSON format with 'decision', 'factors', and 'suggestions' as keys. Use emojis in the factor names. No markdown or explanations outside JSON.",
			},
			{
				Role:    "user",
				Content: prompt,
			},
		},
		Temperature: 0.7,
	})
	if err != nil {
		log.Printf("OpenAI call failed: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Header("Content-Type", "application/json")
	c.String(http.StatusOK, resp.Choices[0].Message.Content)
}

func buildDecisionPrompt(options []string) string {
	var sb strings.Builder

	sb.WriteString("The user is trying to make a decision.\n")
	sb.WriteString("Options:\n")
	for i, opt := range options {
		sb.WriteString("- Option " + string(rune('A'+i)) + ": " + opt + "\n")
	}

	sb.WriteString(`

Your task:
1. Compare the options contextually.
2. Identify meaningful factors (each with an emoji in the name).
3. Return the response in the following **strict JSON format**:

{
  "decision": "Your final recommendation, highlight the better option with some reasoning.",
  "factors": {
    "Factor Name🧠": {
      "Option A": "Analysis",
      "Option B": "Analysis"
    },
    ...
  },
  "suggestions": "Short advice or insight relevant to the decision."
}

No markdown, no extra text, just JSON. Use emojis properly.
`)

	return sb.String()
}
