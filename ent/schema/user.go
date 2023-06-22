package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Item holds the schema definition for the Item entity.
type User struct {
	ent.Schema
}

// Fields of the Item.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			StorageKey("oid"),
		field.String("name"),
		field.Int("username"),
	}
}

// Edges of the Item.
func (User) Edges() []ent.Edge {
	return nil
}
