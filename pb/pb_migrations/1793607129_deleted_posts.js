/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3vef3qrnjnvgfcp");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "3vef3qrnjnvgfcp",
    "created": "2026-11-02 07:49:04.252Z",
    "updated": "2026-11-02 07:49:04.252Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [],
    "indexes": [],
    "listRule": "status = 'published'",
    "viewRule": "status = 'published'",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.id != \"\"",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
