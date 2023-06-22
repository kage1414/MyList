package rest

import (
	"context"

	"MyList/ent"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(client *ent.Client, ctx context.Context) {
	r := gin.Default()
	i := Item{"/item", client, ctx}
	is := Items{"/items", client, ctx}

	Item.Setup(i, r)
	Items.Setup(is, r)
	r.Run()
}
