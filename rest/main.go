package rest

import (
	"context"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"

	"MyList/ent"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(client *ent.Client, ctx context.Context) {
	r := gin.Default()

	api := r.Group("/api")
	i := Item{"/item", client, ctx}
	is := Items{"/items", client, ctx}

	Item.Setup(i, api)
	Items.Setup(is, api)

	env := os.Getenv("GO_ENV")

	if env == "development" {
		r.NoRoute(reverseProxy)
	} else {
		r.Use(static.Serve("/", static.LocalFile("./ui/dist", true)))
	}
	r.Run()
}

func reverseProxy(c *gin.Context) {
	remote, _ := url.Parse("http://localhost:5173")
	proxy := httputil.NewSingleHostReverseProxy(remote)
	proxy.Director = func(req *http.Request) {
		req.Header = c.Request.Header
		req.Host = remote.Host
		req.URL = c.Request.URL
		req.URL.Scheme = remote.Scheme
		req.URL.Host = remote.Host
	}

	proxy.ServeHTTP(c.Writer, c.Request)
}
