import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    books: defineCollection({
      type: 'data',
      source: 'bestsellers.csv',
      schema: z.object({
        num: z.number(),
        name: z.string(),
        author: z.string(),
        user_rating: z.number(),
        reviews: z.number(),
        price: z.number(),
        year: z.number(),
        genre: z.string()
      })
    })
  }
})
