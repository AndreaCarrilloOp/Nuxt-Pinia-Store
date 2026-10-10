<script setup lang="ts">
import { storeToRefs } from 'pinia'

useHead({ title: 'Favoritos' })

const store = useBooksStore()
await store.loadBooks()

const { books, favorites } = storeToRefs(store)

const currentPage = ref(1)
const perPage = 10

const favoriteBooks = computed(() =>
  books.value.filter((item) => favorites.value.includes(item.num))
)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(favoriteBooks.value.length / perPage))
)

const visibleFavorites = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return favoriteBooks.value.slice(start, start + perPage)
})

watch(favoriteBooks, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }
})

function changePage(page: number) {
  currentPage.value = Math.min(Math.max(page, 1), totalPages.value)

  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="site-shell">
    <HeaderView />

    <main class="main-content">
      <section class="container page-section">
        <div class="page-heading">
          <div>
            <p class="eyebrow">Favoritos</p>
            <h1>Mis libros favoritos</h1>
            <p class="page-intro">
              Consulta los libros que guardaste como favoritos.
            </p>
          </div>

          <div class="metric-inline">
            <span>Total</span>
            <strong>{{ favoriteBooks.length }}</strong>
            <small>libros</small>
          </div>
        </div>

        <div v-if="favoriteBooks.length" class="record-list">
          <article
            v-for="item in visibleFavorites"
            :key="item.num"
            class="record-row"
          >
            <div class="record-primary">
              <span class="record-number">#{{ item.num }}</span>

              <div>
                <h2 class="record-name">
                  <NuxtLink :to="`/books/${item.num}`">
                    {{ item.name }}
                  </NuxtLink>
                </h2>
                <p class="record-author">{{ item.author }}</p>
              </div>
            </div>

            <div class="record-facts">
              <div class="fact">
                <span>Año</span>
                <strong>{{ item.year }}</strong>
              </div>

              <div class="fact">
                <span>Género</span>
                <strong>{{ item.genre }}</strong>
              </div>
            </div>

            <div class="record-actions">
              <NuxtLink
                :to="`/books/${item.num}`"
                class="detail-button"
              >
                Detalle
              </NuxtLink>

              <button
                class="favorite-button"
                type="button"
                aria-label="Quitar de favoritos"
                @click="store.toggleFavorite(item.num)"
              >
                ★ Quitar
              </button>
            </div>
          </article>
        </div>

        <nav
          v-if="favoriteBooks.length > perPage"
          class="pagination"
          aria-label="Paginación de favoritos"
        >
          <button
            type="button"
            class="pagination-link"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            Anterior
          </button>

          <span class="pagination-count">
            {{ currentPage }} / {{ totalPages }}
          </span>

          <button
            type="button"
            class="pagination-link"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            Siguiente
          </button>
        </nav>

        <div v-else class="empty-state">
          <h2>No hay favoritos</h2>
          <p>Selecciona libros desde el catálogo o desde su detalle.</p>
          <NuxtLink to="/books" class="detail-button">
            Ver libros
          </NuxtLink>
        </div>
      </section>
    </main>

    <FooterView />
  </div>
</template>
