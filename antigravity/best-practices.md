# Best Practices para Next.js en Real Estate

## ⚡ Rendimiento (Performance)
- Usar **React Server Components (RSC)** por defecto para listados y vistas de detalles.
- Limitar `'use client'` estrictamente a componentes con interactividad (botones de favoritos, filtros, mapas).
- Implementar **Incremental Static Regeneration (ISR)** en detalles de propiedad (`revalidate: 3600`).
- Usar siempre `next/image` con formatos WebP/AVIF y establecer `priority={true}` en las imágenes tipo *Hero*.
- Retrasar carga de mapas (Google/Mapbox) usando `next/dynamic` (`ssr: false`).

## 🔍 SEO (Búsqueda y Descubrimiento)
- Generar meta-tags dinámicamente con `generateMetadata` en las propiedades individuales.
- Usar **Json-Ld Schema Markup** (tipos `RealEstateAgent` y `Product`/`Offer`) para resultados ricos en Google.
- Crear rutas limpias y descriptivas (ej. `/properties/miami-luxury-villa-123`).
- Implementar `@vercel/og` para generar imágenes dinámicas optimizadas al compartir enlaces en redes.
- Configurar correctamente `sitemap.xml` dinámico para indexar rápidamente nuevas propiedades.

## 💾 Carga y Gestión de Datos
- Usar **Server-Side Pagination** híbrido: cargar rápido desde el servidor y hacer *infinite scrolling* en el cliente.
- Mantener los filtros en los **parámetros URL** (`?location=miami&beds=3`) para facilitar el cacheo y enlaces directos.
- Ejecutar prefetching agresivo (`<Link prefetch={true}>` o on-hover) en las tarjetas de propiedades.
- Incluir un caché estricto en el ORM (como Prisma o Drizzle) para evitar sobrecargar la Base de Datos en lecturas repetitivas.
- Usar índices en la base de datos (SQL) en campos como `price`, `location` e `isFeatured`.

## 🎨 UI/UX y Diseño (Premium Feel)
- Cargar *Skeleton Loaders* exactos mientras se obtienen datos para evitar el *Cumulative Layout Shift* (CLS).
- Elegir **tipografía impecable y espaciado generoso**; el nicho de Real Estate requiere minimalismo y lujo.
- Aplicar animaciones sutiles (*micro-interactions*) en *hover* sobre fotos o botones de "Contactar Agente".
- Implementar galerías *Lightbox* rápidas o carruseles CSS nativos en móviles para no depender de librerías pesadas en el thread principal.

## 💡 Features Clave y Retención
- **Comparador de propiedades**: Módulo "Side-by-Side" guardando IDs en LocalStorage o Cookies.
- **Tour 360º/3D embebido**: Mostrar videos de alta calidad o Matterport dentro del UI (sin saltar a otra pestaña).
- **Simulador de Hipoteca Activo**: Componente dinámico de calculadora en los detalles con tasas de mercado.
- **Agendamiento "In-App"**: Usar integraciones como Cal.com incrustado en el modal de visita.
- **Búsqueda guiada por IA o Vectores**: (Ej. *"Casa frente al mar por menos de $1M"* en un buscador libre).
