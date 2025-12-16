import type { MetadataRoute } from 'next';
import { STORY } from '@/config/story';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: STORY.url,
      lastModified: new Date(STORY.publicationDate),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
