/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wer92cyvir1iw9f")

  // remove
  collection.schema.removeField("6sul2v0f")

  // remove
  collection.schema.removeField("wkjaii7l")

  // remove
  collection.schema.removeField("9j0xl2bt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "izsquu1u",
    "name": "name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y3i61iii",
    "name": "slug",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": true,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i0wt1pjl",
    "name": "description",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wer92cyvir1iw9f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6sul2v0f",
    "name": "name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wkjaii7l",
    "name": "slug",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": true,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9j0xl2bt",
    "name": "description",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("izsquu1u")

  // remove
  collection.schema.removeField("y3i61iii")

  // remove
  collection.schema.removeField("i0wt1pjl")

  return dao.saveCollection(collection)
})
