package rest

import (
	"context"
	"encoding/json"
	"io"
	"net/http"

	"MyList/ent"
	"MyList/ent/user"

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

type ItemDeleteBody struct {
	ID       *string `json:"id,omitempty"`
	Username *string `json:"username,omitempty"`
}

func (i Item) Setup(r *gin.RouterGroup) {
	r.GET(i.route, i.Get)
	r.POST(i.route, i.Post)
	r.DELETE(i.route, i.Delete)
}

func (i Item) Get(c *gin.Context) {
	id, _ := uuid.Parse(c.Query("id"))
	item, _ := i.client.Item.Get(i.ctx, id)
	c.JSON(http.StatusOK, gin.H{"item": item})
}

func (i Item) Post(c *gin.Context) {
	var body ItemPostBody
	bodyAsByteArray, bodyErr := io.ReadAll(c.Request.Body)
	if bodyErr != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	json.Unmarshal(bodyAsByteArray, &body)

	if body.Name == nil || body.Username == nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	userId, userErr := i.client.User.Create().
		SetUsername(*body.Username).
		OnConflictColumns(user.FieldUsername).
		UpdateNewValues().
		ID(i.ctx)

	if userErr != nil {
		c.AbortWithError(http.StatusInternalServerError, userErr)
		return
	}

	item, itemErr := i.client.Item.Create().
		SetName(*body.Name).
		SetNillablePriority(body.Priority).
		SetUserID(userId).
		Save(i.ctx)

	if itemErr != nil {
		c.AbortWithError(http.StatusInternalServerError, itemErr)
		return
	}

	c.JSON(http.StatusOK, gin.H{"item": item})
}

func (i Item) Delete(c *gin.Context) {
	var body ItemDeleteBody
	bodyAsByteArray, bodyErr := io.ReadAll(c.Request.Body)
	if bodyErr != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	json.Unmarshal(bodyAsByteArray, &body)

	if body.Username == nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	_, userErr := i.client.User.Create().
		SetUsername(*body.Username).
		OnConflictColumns(user.FieldUsername).
		UpdateNewValues().
		ID(i.ctx)

	if userErr != nil {
		c.AbortWithError(http.StatusInternalServerError, userErr)
		return
	}

	id, idErr := uuid.Parse(*body.ID)

	if idErr != nil {
		c.AbortWithError(http.StatusInternalServerError, idErr)
		return
	}

	itemErr := i.client.Item.DeleteOneID(id).Exec(i.ctx)

	if itemErr != nil {
		c.AbortWithError(http.StatusInternalServerError, itemErr)
		return
	}

	c.Status(http.StatusOK)
}
