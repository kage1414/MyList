package rest

import (
	"context"
	"net/http"

	"MyList/ent"

	"github.com/gin-gonic/gin"
)

type Items struct {
	route  string
	client *ent.Client
	ctx    context.Context
}

func (i Items) Setup(r *gin.Engine) {
	r.GET(i.route, i.Get)
}

func (i Items) Get(c *gin.Context) {
	items, _ := i.client.Item.Query().All(i.ctx)
	c.JSON(http.StatusOK, gin.H{"items": items})
}
