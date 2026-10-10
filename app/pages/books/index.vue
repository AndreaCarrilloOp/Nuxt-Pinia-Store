<script setup lang="ts">
import { storeToRefs } from 'pinia'

useHead({ title: 'Libros' })

const store = useBooksStore()
await store.loadBooks()

const { books, averageRating, favorites } = storeToRefs(store)

const currentPage = ref(1)
const perPage = 10

const totalPages = computed(() =>
  Math.max(1, Math.ceil(books.value.length / perPage))
)

const visibleBooks = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return books.value.slice(start, start + perPage)
})

watch(books, () => {
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
            <p class="eyebrow">Catálogo</p>
            <h1>Amazon Top Bestselling Books</h1>
            <p class="page-intro">
              Explora la colección y abre cada libro para consultar su información completa.
            </p>
          </div>

          <div class="metric-inline">
            <span>Promedio de calificación</span>
            <strong>{{ averageRating.toFixed(2) }}</strong>
            <small>/ 5</small>
          </div>
        </div>

        <div class="catalog-summary">
          <span>{{ books.length }} registros</span>
        </div>

        <div class="record-list">
          <article
            v-for="item in visibleBooks"
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
                :aria-label="favorites.includes(item.num) ? 'Quitar de favoritos' : 'Agregar a favoritos'"
                :aria-pressed="favorites.includes(item.num)"
                @click="store.toggleFavorite(item.num)"
              >
                {{ favorites.includes(item.num) ? '★ Favorito' : '☆ Favorito' }}
              </button>
            </div>
          </article>
        </div>

        <nav
          v-if="totalPages > 1"
          class="pagination"
          aria-label="Paginación del catálogo"
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
      </section>
    </main>

    <FooterView />
  </div>
</template>
