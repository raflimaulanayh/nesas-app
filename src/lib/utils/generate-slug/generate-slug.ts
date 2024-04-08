import slugify from 'slugify'

import prisma from '@/lib/utils/prisma'

export const generateSlug = async (title: string): Promise<string> => {
  let slug = slugify(title, { lower: true })
  let isSlugUnique = false
  let attemptCount = 1

  while (!isSlugUnique) {
    const existingArticle = await prisma.articles.findUnique({ where: { slug } })
    if (!existingArticle) {
      isSlugUnique = true
    } else {
      slug = `${slug}-${attemptCount}`
      attemptCount++
    }
  }

  return slug
}
