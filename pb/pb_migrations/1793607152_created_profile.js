/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "feafnckubl09zu5",
    "created": "2026-11-02 08:12:32.449Z",
    "updated": "2026-11-02 08:12:32.449Z",
    "name": "profile",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ompldymn",
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
      },
      {
        "system": false,
        "id": "dlakbjmo",
        "name": "headline",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "3uwxjdoi",
        "name": "bio",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "olrk91vk",
        "name": "lokasi",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "nmgtvbad",
        "name": "social_links",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      },
      {
        "system": false,
        "id": "2qzklcoi",
        "name": "cv",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": null,
          "maxSelect": 1,
          "maxSize": 10485760,
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.id != \"\"",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("feafnckubl09zu5");

  return dao.deleteCollection(collection);
})
