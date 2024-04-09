import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nss.nesas.tech'

  return [
    {
      url: baseUrl,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/chatbot`,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/article`,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/forum`,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date()
    }
  ]
}
