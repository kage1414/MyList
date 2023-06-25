package rest

import (
	"context"
	"fmt"
	"net/http"

	"MyList/ent"
	"MyList/ent/user"

	"github.com/gin-gonic/gin"
)

type Items struct {
	route  string
	client *ent.Client
	ctx    context.Context
}

func (i Items) Setup(r *gin.RouterGroup) {
	r.GET(i.route, i.Get)
}

func (i Items) Get(c *gin.Context) {
	username, exists := c.GetQuery("username")

	if !exists || username == "" {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	items, itemErr := i.client.User.
		Query().
		Where(user.UsernameEQ(username)).
		QueryItems().
		All(i.ctx)

	fmt.Println(items)

	if itemErr != nil {
		c.AbortWithError(http.StatusInternalServerError, itemErr)
		return
	}
	c.JSON(http.StatusOK, gin.H{"items": items})
}
