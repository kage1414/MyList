// Code generated by ent, DO NOT EDIT.

package ent

import (
	"MyList/ent/item"
	"MyList/ent/schema"
	"MyList/ent/user"

	"github.com/google/uuid"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	itemFields := schema.Item{}.Fields()
	_ = itemFields
	// itemDescPriority is the schema descriptor for priority field.
	itemDescPriority := itemFields[2].Descriptor()
	// item.PriorityValidator is a validator for the "priority" field. It is called by the builders before save.
	item.PriorityValidator = itemDescPriority.Validators[0].(func(int) error)
	// itemDescComplete is the schema descriptor for complete field.
	itemDescComplete := itemFields[3].Descriptor()
	// item.DefaultComplete holds the default value on creation for the complete field.
	item.DefaultComplete = itemDescComplete.Default.(bool)
	// itemDescID is the schema descriptor for id field.
	itemDescID := itemFields[0].Descriptor()
	// item.DefaultID holds the default value on creation for the id field.
	item.DefaultID = itemDescID.Default.(func() uuid.UUID)
	userFields := schema.User{}.Fields()
	_ = userFields
	// userDescID is the schema descriptor for id field.
	userDescID := userFields[0].Descriptor()
	// user.DefaultID holds the default value on creation for the id field.
	user.DefaultID = userDescID.Default.(func() uuid.UUID)
}
