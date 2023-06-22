package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"MyList/ent"
	"MyList/ent/migrate"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func Client() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	client, err := ent.Open("postgres",
		fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable",
			os.Getenv("PG_HOST"),
			os.Getenv("PG_PORT"),
			os.Getenv("PG_USER"),
			os.Getenv("PG_DBNAME"),
			os.Getenv("PG_PASS"),
		),
	)
	if err != nil {
		log.Fatalf("failed opening connection to postgres: %v", err)
	}
	defer client.Close()

	if err := client.Schema.Create(context.Background(), migrate.WithGlobalUniqueID(true)); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}
}
