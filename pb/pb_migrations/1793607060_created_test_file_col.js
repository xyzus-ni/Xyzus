/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "1p2np7qslh8b3s1",
    "created": "2026-11-02 08:11:00.347Z",
    "updated": "2026-11-02 08:11:00.347Z",
    "name": "test_file_col",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "m7qfrllp",
        "name": "my_file",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": null,
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1p2np7qslh8b3s1");

  return dao.deleteCollection(collection);
})
