import pg from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:Shevaekamaharani@db.wgzenmtojctuvboxmxia.supabase.co:5432/postgres";

async function runMigration() {
  console.log("🔌 Menghubungkan ke Supabase Postgres...");
  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("✅ Terhubung ke Supabase Postgres!");

    const sqlPath = path.resolve(__dirname, "../supabase_schema.sql");
    const sql = fs.readFileSync(sqlPath, "utf-8");

    console.log("🚀 Menjalankan migrasi skema tabel (categories, projects, posts, profile, messages)...");
    await client.query(sql);
    console.log("🎉 Berhasil membuat semua tabel & RLS policy di Supabase!");
  } catch (err) {
    console.error("❌ Gagal migrasi:", err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
