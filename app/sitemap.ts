import type { MetadataRoute } from "next";

import { profile } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = profile.siteUrl || "http://localhost:3000";

  return [
    {
      url: baseUrl,
    },
  ];
}
