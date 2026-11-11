import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wgzenmtojctuvboxmxia.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_7ggBDVSxZnGqEzQoda6Iew_8YDyu_lj";

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("🚀 Menghubungkan ke Supabase di:", supabaseUrl);
  
  const dataPath = path.resolve(__dirname, "../src/lib/data/initialData.json");
  const initialData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  // 1. Seed Categories
  console.log("📦 Seeding categories...");
  const categoryMap = new Map();
  for (const cat of initialData.categories) {
    const { data, error } = await supabase
      .from("categories")
      .upsert({ name: cat.name, slug: cat.slug, description: cat.description }, { onConflict: "slug" })
      .select();
    if (error) {
      console.warn(`Gagal upsert category ${cat.name}:`, error.message);
    } else if (data && data[0]) {
      categoryMap.set(cat.slug, data[0].id);
    }
  }

  // 2. Seed Projects
  console.log("📦 Seeding projects...");
  for (const proj of initialData.projects) {
    const { error } = await supabase
      .from("projects")
      .upsert({
        title: proj.title,
        slug: proj.slug,
        summary: proj.summary,
        description: proj.description,
        tech: proj.tech,
        cover: proj.cover || null,
        video_url: proj.video_url || null,
        repo_url: proj.repo_url || null,
        demo_url: proj.demo_url || null,
        status: proj.status,
        featured: proj.featured ?? false,
        visible: proj.visible ?? true,
        order: proj.order ?? 0
      }, { onConflict: "slug" });
    if (error) console.warn(`Gagal upsert project ${proj.title}:`, error.message);
  }

  // 3. Seed Profile
  console.log("📦 Seeding profile...");
  if (initialData.profile) {
    const p = initialData.profile;
    const { error } = await supabase
      .from("profile")
      .upsert({
        name: p.name,
        headline: p.headline,
        bio: p.bio,
        location: p.location,
        avatar: p.avatar || null,
        cv_url: p.cv_url || null,
        social_links: p.social_links || {}
      });
    if (error) console.warn("Gagal upsert profile:", error.message);
  }

  // 4. Seed Posts
  console.log("📦 Seeding posts...");
  for (const post of initialData.posts) {
    const categoryId = categoryMap.get(post.category_slug) || null;
    const { error } = await supabase
      .from("posts")
      .upsert({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        abstract: post.abstract || null,
        content: post.content,
        cover: post.cover || null,
        category_id: categoryId,
        tags: post.tags || [],
        lang: post.lang || "id",
        references: post.references || null,
        status: post.status || "published",
        published_at: post.published_at || new Date().toISOString(),
        reading_time: post.reading_time || 5
      }, { onConflict: "slug" });
    if (error) console.warn(`Gagal upsert post ${post.title}:`, error.message);
  }

  console.log("✅ Seeding selesai!");
}

seed().catch((err) => {
  console.error("❌ Seeding gagal:", err);
  process.exit(1);
});
