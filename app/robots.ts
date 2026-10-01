import type { MetadataRoute } from "next";

import { profile } from "@/data/profile";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = profile.siteUrl || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
