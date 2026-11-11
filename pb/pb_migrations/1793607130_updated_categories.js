/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wer92cyvir1iw9f")

  // remove
  collection.schema.removeField("wrx5ux0f")

  // remove
  collection.schema.removeField("mceitfbu")

  // remove
  collection.schema.removeField("u1vkqueg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "niqbxzi6",
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
    "id": "pkka5qsu",
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
    "id": "htfuqw6a",
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
    "id": "wrx5ux0f",
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
    "id": "mceitfbu",
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
    "id": "u1vkqueg",
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
  collection.schema.removeField("niqbxzi6")

  // remove
  collection.schema.removeField("pkka5qsu")

  // remove
  collection.schema.removeField("htfuqw6a")

  return dao.saveCollection(collection)
})
