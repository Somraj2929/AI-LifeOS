package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/Somraj2929/AI-LifeOS/backend/controllers"
)

func RegisterRoutes(r *gin.Engine) {
	r.POST("/decision-engine", controllers.DecisionEngineHandler)
	r.POST("/generate-itinerary", controllers.ItineraryController)
}
