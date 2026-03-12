# Luxe Estate 🏡

Luxe Estate es una plataforma moderna para la exploración y presentación de bienes raíces de lujo. Está construida para ofrecer una experiencia rápida y atractiva tanto para buscar propiedades nuevas en el mercado como para descubrir colecciones destacadas.

## 🚀 Tecnologías

Este proyecto está construido con un stack moderno y escalable:

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Base de Datos**: Microsoft SQL Server 2022
- **ORM**: [Prisma](https://www.prisma.io/)
- **Lenguaje**: TypeScript y React 19

## 📋 Requisitos Previos

Asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) (v20 o superior)
- [Docker](https://www.docker.com/) y Docker Compose (para la base de datos local)
- Gestor de paquetes (`npm`, `yarn`, `pnpm`, o `bun`)

## 🛠️ Instalación y Configuración

### 1. Clonar e Instalar

Primero, clona el proyecto e instala las dependencias:

```bash
npm install
# o
yarn install
```

### 2. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en el archivo de plantilla `.env.template`:

```bash
cp .env.template .env
```

Asegúrate de que la variable `DATABASE_URL` apunte a tu instancia local de SQL Server. Por defecto, usando el entorno de Docker proporcionado, será algo como esto:

```env
DATABASE_URL="sqlserver://localhost:1433;database=master;user=sa;password=YourStrong!Passw0rd;trustServerCertificate=true"
```

### 3. Levantar la Base de Datos Local

El proyecto incluye un `docker-compose.yml` para levantar rápidamente una base de datos SQL Server:

```bash
docker-compose up -d
```

### 4. Configurar la Base de Datos

Una vez que el contenedor esté corriendo (puede tomar unos segundos en estar listo), sincroniza el esquema de Prisma y pobla la base de datos con los datos de prueba iniciales:

```bash
# Sincroniza el esquema con la DB
npx prisma db push

# Añade las propiedades de ejemplo ("seed")
npm run prisma db seed
# o directamente: npx prisma db seed
```

## 💻 Entorno de Desarrollo

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación funcionando. El sitio de desarrollo se actualizará automáticamente a medida que modifiques los archivos.

## 🌟 Características Principales

- **Paginación Server-Side**: Visualización eficiente de propiedades cargando los datos desde el servidor en bloques para mejorar el rendimiento.
- **Featured Collections**: Sistema de banderín integrado en base de datos (`isFeatured`) para destacar propiedades exclusivas en la vista principal.
- **Diseño Responsivo**: Experiencia de usuario optimizada para móviles, tabletas y computadoras de escritorio usando Tailwind CSS.

## 📂 Estructura del Proyecto

Las áreas clave del proyecto incluyen:

- `/app`: Componentes y páginas de Next.js (App Router).
- `/app/components`: Componentes reutilizables de UI (tarjetas, paginación, navbar, etc.).
- `/lib`: Utilidades y lógicas compartidas importantes, como las consultas al ORM.
- `/prisma`: Configuración del esquema de datos (`schema.prisma`) y el script para cargar datos iniciales (`seed.ts`).
- `docker-compose.yml`: Configuración para orquestar la capa de persistencia en local (SQL Server).
