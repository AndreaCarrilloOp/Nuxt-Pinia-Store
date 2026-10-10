<script setup lang="ts">
import { storeToRefs } from 'pinia'

const route = useRoute()
const store = useBooksStore()
const num = computed(() => Number(route.params.num))

await store.loadBooks()
await store.loadBook(num.value)

const { books, book, favorites } = storeToRefs(store)

if (!book.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Libro no encontrado'
  })
}

watch(num, async (value) => {
  await store.loadBook(value)
})

useHead({
  title: computed(() => book.value?.name ?? 'Detalle')
})

const index = computed(() =>
  books.value.findIndex((item) => item.num === num.value)
)

const previous = computed(() =>
  index.value > 0
    ? books.value[index.value - 1]
    : null
)

const next = computed(() =>
  index.value >= 0 && index.value < books.value.length - 1
    ? books.value[index.value + 1]
    : null
)
</script>

<template>
  <div class="site-shell">
    <HeaderView />

    <main class="main-content">
      <section
        v-if="book"
        class="container page-section detail-page"
      >
        <NuxtLink to="/books" class="back-link">
          ← Volver
        </NuxtLink>

        <header class="detail-heading">
          <div>
            <p class="eyebrow">
              #{{ book.num }} · {{ book.genre }}
            </p>
            <h1>{{ book.name }}</h1>
            <p class="detail-author">{{ book.author }}</p>
          </div>

          <button
            class="favorite-button favorite-button-text"
            type="button"
            :aria-pressed="favorites.includes(book.num)"
            @click="store.toggleFavorite(book.num)"
          >
            {{ favorites.includes(book.num)
              ? '★ Quitar favorito'
              : '☆ Agregar favorito' }}
          </button>
        </header>

        <section class="detail-section" aria-labelledby="book-data-title">
          <div class="section-heading">
            <p class="section-kicker">Detalle</p>
            <h2 id="book-data-title">Datos del libro</h2>
          </div>

          <dl class="detail-grid">
            <div class="detail-field">
              <dt>Identificador</dt>
              <dd>{{ book.num }}</dd>
            </div>

            <div class="detail-field">
              <dt>Nombre</dt>
              <dd>{{ book.name }}</dd>
            </div>

            <div class="detail-field">
              <dt>Autor</dt>
              <dd>{{ book.author }}</dd>
            </div>

            <div class="detail-field">
              <dt>Género</dt>
              <dd>{{ book.genre }}</dd>
            </div>

            <div class="detail-field">
              <dt>Calificación</dt>
              <dd>{{ book.user_rating }} / 5</dd>
            </div>

            <div class="detail-field">
              <dt>Reseñas</dt>
              <dd>{{ book.reviews }}</dd>
            </div>

            <div class="detail-field">
              <dt>Precio</dt>
              <dd>${{ book.price }}</dd>
            </div>

            <div class="detail-field">
              <dt>Año</dt>
              <dd>{{ book.year }}</dd>
            </div>
          </dl>
        </section>

        <nav
          class="record-navigation"
          aria-label="Navegación entre registros"
        >
          <NuxtLink
            v-if="previous"
            :to="`/books/${previous.num}`"
            class="nav-button"
          >
            Anterior
          </NuxtLink>

          <span
            v-else
            class="nav-button nav-button-disabled"
          >
            Anterior
          </span>

          <NuxtLink
            v-if="next"
            :to="`/books/${next.num}`"
            class="nav-button"
          >
            Siguiente
          </NuxtLink>

          <span
            v-else
            class="nav-button nav-button-disabled"
          >
            Siguiente
          </span>
        </nav>
      </section>
    </main>

    <FooterView />
  </div>
</template>
