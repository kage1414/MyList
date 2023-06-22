package rest

import (
	"context"

	"MyList/ent"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(client *ent.Client, ctx context.Context) {
	r := gin.Default()
	i := Item{"/item", client, ctx}

	Item.Setup(i, r)
	r.Run()
}
