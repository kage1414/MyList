package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Item holds the schema definition for the Item entity.
type Item struct {
	ent.Schema
}

// Fields of the Item.
func (Item) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			StorageKey("oid"),
		field.String("name"),
		field.Int("priority").
			Range(1, 100),
		field.Bool("complete").
			Default(false),
	}
}

// Edges of the Item.
func (Item) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("items").
			Unique(),
	}
}
