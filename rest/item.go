package rest

import (
	"context"
	"encoding/json"
	"io"
	"net/http"

	"MyList/ent"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Item struct {
	route  string
	client *ent.Client
	ctx    context.Context
}

type ItemPostBody struct {
	Name     *string `json:"name,omitempty"`
	Priority *int    `json:"priority,omitempty"`
	Username *string `json:"username,omitempty"`
}

func (i Item) Setup(r *gin.Engine) {
	r.GET(i.route, i.Get)
	r.POST(i.route, i.Post)
}

func (i Item) Get(c *gin.Context) {
	id, _ := uuid.Parse(c.Query("id"))
	item, _ := i.client.Item.Get(i.ctx, id)
	c.JSON(http.StatusOK, gin.H{"item": item})
}

func (i Item) Post(c *gin.Context) {
	var body ItemPostBody
	bodyAsByteArray, _ := io.ReadAll(c.Request.Body)
	json.Unmarshal(bodyAsByteArray, &body)

	if body.Name == nil || body.Username == nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// newID, _ := i.client.User.Create().SetUsername(*body.Username).Save(i.ctx)

	item, err := i.client.Item.Create().SetName(*body.Name).SetNillablePriority(body.Priority).Save(i.ctx)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, gin.H{"item": item})
}
