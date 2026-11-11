import React from "react";
import { getProjects, getPosts } from "@/lib/pocketbase";
import { HomeContent } from "./HomeContent";

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  const [featuredProjects, latestPostsRes] = await Promise.all([
    getProjects({ featuredOnly: true }),
    getPosts({ page: 1, perPage: 3 }),
  ]);

  const projects = featuredProjects.slice(0, 3);
  const posts = latestPostsRes.items.slice(0, 3);

  return <HomeContent projects={projects} posts={posts} />;
}
