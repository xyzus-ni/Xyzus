import { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/pocketbase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mahesatirtha.dev";

  const [postsRes, projects] = await Promise.all([
    getPosts({ perPage: 100 }),
    getProjects(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = postsRes.items.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updated ? new Date(post.updated) : new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
