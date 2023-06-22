package rest

import (
	"context"

	"MyList/ent"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(client *ent.Client, ctx context.Context) {
	r := gin.Default()

	r.Use(static.Serve("/", static.LocalFile("./ui/dist", true)))

	api := r.Group("/api")
	i := Item{"/item", client, ctx}
	is := Items{"/items", client, ctx}

	Item.Setup(i, api)
	Items.Setup(is, api)
	r.Run()
}
