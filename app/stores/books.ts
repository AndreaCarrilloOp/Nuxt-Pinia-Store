import { defineStore } from 'pinia'

export interface Book {
  num: number
  name: string
  author: string
  user_rating: number
  reviews: number
  price: number
  year: number
  genre: string
}

export const useBooksStore = defineStore('books', () => {
  const books = ref<Book[]>([])
  const book = ref<Book | null>(null)
  const favorites = useCookie<number[]>('favorites', {
    default: () => []
  })

  const averageRating = computed(() => {
    if (!books.value.length) return 0

    const total = books.value.reduce(
      (sum, item) => sum + item.user_rating,
      0
    )

    return total / books.value.length
  })

  async function loadBooks() {
    books.value = await queryCollection('books')
      .order('num', 'ASC')
      .all()
  }

  async function loadBook(num: number) {
    book.value = await queryCollection('books')
      .where('num', '=', num)
      .first()
  }

  function toggleFavorite(num: number) {
    const current = favorites.value ?? []

    favorites.value = current.includes(num)
      ? current.filter((item) => item !== num)
      : [...current, num]
  }

  return {
    books,
    book,
    favorites,
    averageRating,
    loadBooks,
    loadBook,
    toggleFavorite
  }
})
