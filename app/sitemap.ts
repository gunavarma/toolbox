import type { MetadataRoute } from "next";
import { tools, categories } from "@/data/tools";
import { blogPosts } from "@/data/blog";

const BASE_URL = "https://toolxbox.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // 1. Add Category routes
  const categoryRoutes = categories.map((cat) => ({
    url: `${BASE_URL}/tools/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 2. Add Tool routes (67 tools)
  const toolRoutes = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.category}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9, // Utility pages get higher index priorities
  }));

  // 3. Add Blog routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...categoryRoutes, ...toolRoutes, ...blogRoutes];
}
