# Books Bestsellers Explorer

[![Nuxt](https://img.shields.io/badge/Nuxt-4.5.2-00DC82?logo=nuxtdotjs&logoColor=white)](https://nuxt.com/)
[![Vue](https://img.shields.io/badge/Vue-3-42B883?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Pinia](https://img.shields.io/badge/Pinia-4.0.3-FFD859?logo=pinia&logoColor=111)](https://pinia.vuejs.org/)
[![Nuxt Content](https://img.shields.io/badge/Nuxt%20Content-3.16.1-00DC82)](https://content.nuxt.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/)

Aplicación académica desarrollada con **Nuxt 4**, **Nuxt Content** y **Pinia** para explorar un catálogo de libros basado en el dataset *Amazon Top 50 Bestselling Books 2009–2019*.

El proyecto implementa carga de datos desde CSV, navegación por registros, cálculo de promedio, favoritos persistentes y paginación, manteniendo una arquitectura pequeña y alineada con los requerimientos de la tarea.

## Funcionalidades

- catálogo de libros cargado desde un archivo CSV mediante **Nuxt Content**;
- store global con **Pinia** para cargar el listado completo y registros individuales;
- detalle individual con todos los campos del dataset;
- navegación **Anterior / Siguiente** entre registros;
- promedio de calificación calculado desde el store;
- favoritos persistentes mediante `useCookie`;
- misma estructura visual para catálogo y favoritos;
- paginación discreta de **10 registros por página**;
- paginación de favoritos únicamente cuando existen más de 10 elementos;
- configuración preparada para despliegue estático en **Netlify**;
- diseño responsive con CSS propio y sin librerías visuales adicionales.

## Dataset

Se utiliza una muestra académica depurada de **80 registros únicos**, seleccionada a partir del dataset público:

**Amazon Top 50 Bestselling Books 2009–2019**

Fuente: [Kaggle](https://www.kaggle.com/datasets/sootersaalu/amazon-top-50-bestselling-books-2009-2019)

Antes de seleccionar la muestra se eliminaron repeticiones utilizando la combinación **título + autor**. Se conservan registros de todos los años entre **2009 y 2019**.

### Campos

| Campo | Descripción |
|---|---|
| `num` | Identificador único |
| `name` | Nombre del libro |
| `author` | Autor |
| `user_rating` | Calificación de usuarios |
| `reviews` | Cantidad de reseñas |
| `price` | Precio |
| `year` | Año |
| `genre` | Género |

Los encabezados se encuentran en minúscula y sin espacios, siguiendo el formato requerido para la colección de datos.

## Arquitectura

```text
content/bestsellers.csv
        │
        ▼
Nuxt Content
collection: books
        │
        ▼
Pinia Store
app/stores/books.ts
        │
        ├── loadBooks()
        ├── loadBook(num)
        ├── averageRating
        ├── favorites
        └── toggleFavorite(num)
        │
        ▼
Nuxt Pages
        ├── /books
        ├── /books/[num]
        └── /favorites
```

La colección `books` está declarada como `type: 'data'` en `content.config.ts`.

## Store de Pinia

El store centraliza únicamente el estado y las operaciones requeridas por la aplicación:

```ts
loadBooks()
loadBook(num)
averageRating
favorites
toggleFavorite(num)
```

`loadBooks()` obtiene el listado completo desde Nuxt Content, mientras que la paginación se aplica únicamente en la capa de presentación.

Los favoritos se almacenan mediante:

```ts
useCookie<number[]>('favorites')
```

Esto permite conservarlos después de recargar la página.

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Redirección al catálogo |
| `/books` | Listado completo con promedio y paginación |
| `/books/[num]` | Detalle individual y navegación anterior/siguiente |
| `/favorites` | Libros favoritos persistentes |

## Paginación

El catálogo muestra **10 registros por página** mediante una navegación sencilla:

```text
Anterior        1 / 8        Siguiente
```

La vista de favoritos utiliza el mismo mecanismo únicamente cuando la cantidad de favoritos supera los 10 elementos.

## Estructura del proyecto

```text
.
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   ├── components/
│   │   ├── FooterView.vue
│   │   └── HeaderView.vue
│   ├── pages/
│   │   ├── books/
│   │   │   ├── [num].vue
│   │   │   └── index.vue
│   │   ├── favorites.vue
│   │   └── index.vue
│   └── stores/
│       └── books.ts
├── content/
│   └── bestsellers.csv
├── content.config.ts
├── netlify.toml
├── nuxt.config.ts
├── package.json
└── tsconfig.json
```

## Instalación

Requisitos:

- Node.js
- npm

Clonar el repositorio e instalar dependencias:

```bash
git clone https://github.com/AndreaCarrilloOp/Nuxt-Pinia-Store.git
cd Nuxt-Pinia-Store
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:3000
```
