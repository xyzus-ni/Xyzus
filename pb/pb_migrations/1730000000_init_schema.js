/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const snapshot = [
    {
      name: "categories",
      type: "base",
      system: false,
      schema: [
        {
          name: "name",
          type: "text",
          required: true,
          options: { min: 1, max: 100 }
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          options: { min: 1, max: 100 }
        },
        {
          name: "description",
          type: "text",
          required: false,
          options: { max: 500 }
        }
      ],
      listRule: "",
      viewRule: "",
      createRule: "@request.auth.id != \"\"",
      updateRule: "@request.auth.id != \"\"",
      deleteRule: "@request.auth.id != \"\""
    },
    {
      name: "posts",
      type: "base",
      system: false,
      schema: [
        {
          name: "title",
          type: "text",
          required: true,
          options: { min: 1, max: 300 }
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          options: { min: 1, max: 300 }
        },
        {
          name: "excerpt",
          type: "text",
          required: false,
          options: { max: 1000 }
        },
        {
          name: "abstract",
          type: "text",
          required: false
        },
        {
          name: "content",
          type: "text",
          required: false
        },
        {
          name: "cover",
          type: "file",
          required: false,
          options: {
            maxSelect: 1,
            maxSize: 10485760,
            mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"]
          }
        },
        {
          name: "attachments",
          type: "file",
          required: false,
          options: {
            maxSelect: 5,
            maxSize: 52428800,
            mimeTypes: ["application/pdf", "application/zip"]
          }
        },
        {
          name: "category",
          type: "text",
          required: false
        },
        {
          name: "tags",
          type: "json",
          required: false
        },
        {
          name: "lang",
          type: "text",
          required: false,
          options: { min: 2, max: 5 }
        },
        {
          name: "references",
          type: "text",
          required: false
        },
        {
          name: "status",
          type: "select",
          required: true,
          options: {
            maxSelect: 1,
            values: ["draft", "published"]
          }
        },
        {
          name: "published_at",
          type: "date",
          required: false
        },
        {
          name: "reading_time",
          type: "number",
          required: false
        }
      ],
      listRule: "status = 'published'",
      viewRule: "status = 'published'",
      createRule: "@request.auth.id != \"\"",
      updateRule: "@request.auth.id != \"\"",
      deleteRule: "@request.auth.id != \"\""
    },
    {
      name: "projects",
      type: "base",
      system: false,
      schema: [
        {
          name: "title",
          type: "text",
          required: true,
          options: { min: 1, max: 200 }
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          options: { min: 1, max: 200 }
        },
        {
          name: "summary",
          type: "text",
          required: true,
          options: { min: 1, max: 1000 }
        },
        {
          name: "description",
          type: "text",
          required: false
        },
        {
          name: "tech",
          type: "json",
          required: false
        },
        {
          name: "cover",
          type: "file",
          required: false,
          options: {
            maxSelect: 1,
            maxSize: 10485760,
            mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"]
          }
        },
        {
          name: "gallery",
          type: "file",
          required: false,
          options: {
            maxSelect: 10,
            maxSize: 10485760,
            mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"]
          }
        },
        {
          name: "video_url",
          type: "text",
          required: false
        },
        {
          name: "repo_url",
          type: "text",
          required: false
        },
        {
          name: "demo_url",
          type: "text",
          required: false
        },
        {
          name: "status",
          type: "text",
          required: false
        },
        {
          name: "featured",
          type: "bool",
          required: false
        },
        {
          name: "visible",
          type: "bool",
          required: false
        },
        {
          name: "order",
          type: "number",
          required: false
        }
      ],
      listRule: "visible = true",
      viewRule: "visible = true",
      createRule: "@request.auth.id != \"\"",
      updateRule: "@request.auth.id != \"\"",
      deleteRule: "@request.auth.id != \"\""
    },
    {
      name: "profile",
      type: "base",
      system: false,
      schema: [
        {
          name: "name",
          type: "text",
          required: true
        },
        {
          name: "headline",
          type: "text",
          required: true
        },
        {
          name: "bio",
          type: "text",
          required: false
        },
        {
          name: "lokasi",
          type: "text",
          required: false
        },
        {
          name: "social_links",
          type: "json",
          required: false
        },
        {
          name: "cv",
          type: "file",
          required: false,
          options: {
            maxSelect: 1,
            maxSize: 10485760,
            mimeTypes: ["application/pdf"]
          }
        }
      ],
      listRule: "",
      viewRule: "",
      createRule: "@request.auth.id != \"\"",
      updateRule: "@request.auth.id != \"\"",
      deleteRule: "@request.auth.id != \"\""
    },
    {
      name: "messages",
      type: "base",
      system: false,
      schema: [
        {
          name: "name",
          type: "text",
          required: true,
          options: { min: 1, max: 100 }
        },
        {
          name: "email",
          type: "email",
          required: true
        },
        {
          name: "subject",
          type: "text",
          required: false,
          options: { max: 200 }
        },
        {
          name: "message",
          type: "text",
          required: true,
          options: { min: 1, max: 5000 }
        }
      ],
      listRule: "@request.auth.id != \"\"",
      viewRule: "@request.auth.id != \"\"",
      createRule: "",
      updateRule: "@request.auth.id != \"\"",
      deleteRule: "@request.auth.id != \"\""
    }
  ];

  return Dao(db).importCollections(snapshot, false);
}, (db) => {
  return null;
});
