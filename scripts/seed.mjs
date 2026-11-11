import PocketBase from "pocketbase";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFilePath = path.join(__dirname, "../src/lib/data/initialData.json");
const rawData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

const {
  profile: initialProfile,
  categories: initialCategories,
  projects: initialProjects,
  posts: initialPosts,
} = rawData;

const PB_URL = process.env.POCKETBASE_URL || "http://127.0.0.1:8090";
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || "admin@mahesa.local";
const ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD || "AdminMahesa123!Secure";

async function main() {
  console.log("🚀 Memulai proses sinkronisasi & seeding data PocketBase ke:", PB_URL);
  const pb = new PocketBase(PB_URL);
  pb.autoCancellation(false);

  // 1. Autentikasi Admin
  try {
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log("✅ Berhasil login sebagai Admin:", ADMIN_EMAIL);
  } catch {
    console.warn("⚠️ Gagal login sebagai admin. Mencoba membuat admin baru...");
    try {
      await pb.admins.create({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        passwordConfirm: ADMIN_PASSWORD,
      });
      await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
      console.log("✅ Berhasil membuat dan login sebagai admin baru!");
    } catch (createErr) {
      console.error("❌ Gagal membuat akun admin:", createErr.message);
      console.log("💡 Pastikan PocketBase telah berjalan (`npm run pb` atau `docker compose up`)");
      process.exit(1);
    }
  }

  // 2. Sinkronisasi Skema Koleksi
  console.log("📐 Memverifikasi skema koleksi PocketBase...");
  const existingCollections = await pb.collections.getFullList();
  const byName = new Map(existingCollections.map((c) => [c.name, c]));

  const upsert = async (def) => {
    const existing = byName.get(def.name);
    try {
      if (existing) {
        await pb.collections.update(existing.id, def);
      } else {
        await pb.collections.create(def);
      }
    } catch (err) {
      console.error("❌ Gagal update skema", def.name, ":", JSON.stringify(err.response?.data || err.message));
    }
  };

  await upsert({
    name: "categories",
    type: "base",
    schema: [
      { name: "name", type: "text", required: true },
      { name: "slug", type: "text", required: true, unique: true },
      { name: "description", type: "text" },
    ],
    listRule: "",
    viewRule: "",
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  });

  await upsert({
    name: "posts",
    type: "base",
    schema: [
      { name: "title", type: "text", required: true },
      { name: "slug", type: "text", required: true, unique: true },
      { name: "excerpt", type: "text" },
      { name: "abstract", type: "text" },
      { name: "content", type: "text" },
      { name: "cover", type: "file", options: { maxSelect: 1, maxSize: 5242880, mimeTypes: [] } },
      { name: "attachments", type: "file", options: { maxSelect: 5, maxSize: 20971520, mimeTypes: [] } },
      { name: "category", type: "text" },
      { name: "tags", type: "json", options: { maxSize: 2000000 } },
      { name: "lang", type: "text" },
      { name: "references", type: "text" },
      { name: "status", type: "select", required: true, options: { maxSelect: 1, values: ["draft", "published"] } },
      { name: "published_at", type: "date" },
      { name: "reading_time", type: "number" },
    ],
    listRule: "status = 'published'",
    viewRule: "status = 'published'",
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  });

  await upsert({
    name: "projects",
    type: "base",
    schema: [
      { name: "title", type: "text", required: true },
      { name: "slug", type: "text", required: true, unique: true },
      { name: "summary", type: "text", required: true },
      { name: "description", type: "text" },
      { name: "tech", type: "json", options: { maxSize: 2000000 } },
      { name: "cover", type: "file", options: { maxSelect: 1, maxSize: 5242880, mimeTypes: [] } },
      { name: "gallery", type: "file", options: { maxSelect: 10, maxSize: 5242880, mimeTypes: [] } },
      { name: "video_url", type: "text" },
      { name: "repo_url", type: "text" },
      { name: "demo_url", type: "text" },
      { name: "status", type: "text" },
      { name: "featured", type: "bool" },
      { name: "visible", type: "bool" },
      { name: "order", type: "number" },
    ],
    listRule: "visible = true",
    viewRule: "visible = true",
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  });

  await upsert({
    name: "profile",
    type: "base",
    schema: [
      { name: "name", type: "text", required: true },
      { name: "headline", type: "text", required: true },
      { name: "bio", type: "text" },
      { name: "lokasi", type: "text" },
      { name: "social_links", type: "json", options: { maxSize: 2000000 } },
      { name: "cv", type: "file", options: { maxSelect: 1, maxSize: 10485760, mimeTypes: [] } },
    ],
    listRule: "",
    viewRule: "",
    createRule: '@request.auth.id != ""',
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  });

  await upsert({
    name: "messages",
    type: "base",
    schema: [
      { name: "name", type: "text", required: true },
      { name: "email", type: "email", required: true },
      { name: "subject", type: "text" },
      { name: "message", type: "text", required: true },
    ],
    listRule: '@request.auth.id != ""',
    viewRule: '@request.auth.id != ""',
    createRule: "",
    updateRule: '@request.auth.id != ""',
    deleteRule: '@request.auth.id != ""',
  });
  console.log("   - Semua koleksi dan API rules terverifikasi.");

  // 3. Seeding Profile
  console.log("👤 Menyinkronkan profil pengguna...");
  try {
    const existing = await pb.collection("profile").getList(1, 1);
    if (existing.items.length > 0) {
      await pb.collection("profile").update(existing.items[0].id, initialProfile);
      console.log("   - Profil diperbarui.");
    } else {
      await pb.collection("profile").create(initialProfile);
      console.log("   - Profil baru dibuat.");
    }
  } catch (err) {
    console.error("❌ Gagal seeding profil:", err.message);
  }

  // 4. Seeding Categories
  console.log("📂 Menyinkronkan kategori blog...");
  for (const cat of initialCategories) {
    try {
      const existing = await pb.collection("categories").getList(1, 1, {
        filter: `slug = '${cat.slug}'`,
      });
      if (existing.items.length === 0) {
        await pb.collection("categories").create(cat);
        console.log(`   + Kategori ditambahkan: ${cat.name}`);
      } else {
        await pb.collection("categories").update(existing.items[0].id, cat);
        console.log(`   * Kategori diperbarui: ${cat.name}`);
      }
    } catch (err) {
      console.error(`   - Error kategori ${cat.name}:`, err.message);
    }
  }

  // 5. Seeding Projects (8 Proyek LinkedIn)
  console.log("🛠️ Menyinkronkan 8 data proyek...");
  for (const proj of initialProjects) {
    try {
      const existing = await pb.collection("projects").getList(1, 1, {
        filter: `slug = '${proj.slug}'`,
      });
      if (existing.items.length === 0) {
        await pb.collection("projects").create(proj);
        console.log(`   + Proyek ditambahkan: ${proj.title}`);
      } else {
        await pb.collection("projects").update(existing.items[0].id, proj);
        console.log(`   * Proyek diperbarui: ${proj.title}`);
      }
    } catch (err) {
      console.error(`   - Error proyek ${proj.title}:`, err.message);
    }
  }

  // 6. Seeding Posts (1 Published, 1 Draft)
  console.log("📝 Menyinkronkan artikel blog awal...");
  for (const post of initialPosts) {
    try {
      const existing = await pb.collection("posts").getList(1, 1, {
        filter: `slug = '${post.slug}'`,
      });
      if (existing.items.length === 0) {
        await pb.collection("posts").create(post);
        console.log(`   + Artikel ditambahkan [${post.status}]: ${post.title}`);
      } else {
        await pb.collection("posts").update(existing.items[0].id, post);
        console.log(`   * Artikel diperbarui [${post.status}]: ${post.title}`);
      }
    } catch (err) {
      console.error(`   - Error artikel ${post.title}:`, err.message);
    }
  }

  console.log("\n🎉 Seeding PocketBase selesai dengan sempurna!");
}

main().catch((err) => {
  console.error("FATAL ERROR pada seed:", err);
  process.exit(1);
});
