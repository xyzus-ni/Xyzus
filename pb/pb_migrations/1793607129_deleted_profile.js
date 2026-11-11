/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("wibhsm57fuq1n0v");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "wibhsm57fuq1n0v",
    "created": "2026-11-02 07:49:04.253Z",
    "updated": "2026-11-02 07:49:04.253Z",
    "name": "profile",
    "type": "base",
    "system": false,
    "schema": [],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.id != \"\"",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
