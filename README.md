# Grayola.io - Gestión de Proyectos de Diseño

## Descripción

Grayola.io es una plataforma de gestión de proyectos de diseño gráfico, edición de video y diseño UX/UI. Permite a diferentes tipos de usuarios (Clientes, Project Managers y Diseñadores) gestionar proyectos de diseño de forma eficiente.

Esta aplicación está construida con **Next.js** para el frontend y la API, **Tailwind CSS** para los estilos, y **Supabase** para el backend, incluyendo autenticación y base de datos.

## Tecnologías Utilizadas

-   **Frontend**: [Next.js](https://nextjs.org/)
-   **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
-   **Backend**: [Next.js](https://nextjs.org/), [Supabase](https://supabase.io/) (Base de datos PostgreSQL, Autenticación)
-   **Autenticación**: Supabase Authentication
-   **Iconos**: [React Icons](https://react-icons.github.io/react-icons/)

## Roles de Usuario

La aplicación tiene diferentes roles, con permisos específicos:

-   **Cliente**: Puede crear nuevos proyectos.
-   **Project Manager**: Puede ver todos los proyectos, asignar proyectos a diseñadores, editar y eliminar proyectos.
-   **Diseñador**: Puede ver los proyectos que se le asignen, pero no puede editar ni eliminar proyectos.
-   **Superusuario (Admin)**: Acceso a la gestión de usuarios a través de un panel de administración.

## Funcionalidades

### 1. **Autenticación y Autorización**

-   Autenticación de usuarios utilizando Supabase.
-   Diferentes niveles de acceso según el rol de usuario: Cliente, Project Manager, Diseñador, Superusuario.

### 2. **Gestión de Proyectos**

-   **Crear Proyectos**: Los clientes pueden crear nuevos proyectos, asignarles un título, descripción y subir archivos.
-   **Editar Proyectos**: Los Project Managers pueden editar los detalles de los proyectos.
-   **Eliminar Proyectos**: Los Project Managers pueden eliminar proyectos existentes.
-   **Asignación de Diseñadores**: Los Project Managers pueden asignar diseñadores a proyectos.
-   **Visualización de Proyectos**: Los diseñadores pueden ver solo los proyectos que se les asignen.

       **Gestión de Usuarios**

-   **Editar Roles**: Los Superusuarios pueden editar los roles de cada usuario registrado.
-   **Eliminar Usuarios**: Los Superusuarios pueden eliminar usuarios registrados.

### 3. **Interfaz de Usuario**

-   **Diseño Moderno y Limpio**: La interfaz está construida con [Tailwind CSS](https://tailwindcss.com/), asegurando una experiencia de usuario limpia y accesible.

### 4. **Panel de Administración**

-   **Dashboard para Superusuario**: Acceso a un panel administrativo donde el superusuario puede gestionar los roles de los usuarios y eliminar usuarios.

## Cómo Ejecutar el Proyecto

### Requisitos

1. Tener [Node.js](https://nodejs.org/) instalado en tu máquina (se recomienda la versión LTS).
2. Tener una cuenta en [Supabase](https://supabase.io/) y configurar el proyecto con tu API y URL.

### Pasos de Instalación

1. **Clonar el repositorio**:

    ```bash
    git clone https://github.com/tu_usuario/grayola.io.git
    ```

2. **Instalar dependencias**:

    Navega a la carpeta del proyecto e instala las dependencias con npm:

    ```bash
    cd grayola.io
    npm install
    ```

3. **Configurar las variables de entorno**:

    Crea un archivo `.env.local` en la raíz del proyecto y agrega las siguientes variables de entorno (obtenidas desde Supabase):

    ```env
    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    SUPABASE_SERVICE_ROLE=
    ```

4. **Ejecutar el proyecto**:

    Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

    El proyecto estará disponible en `http://localhost:3000`.

## Usuarios Administrador de Prueba

Puedes probar la administración de usuario para editar rol o eliminar en la ruta /admin, utilizando el siguiente usuario para acceder como superusuario:

-   **Email**: `admin@admin.com`
-   **Contraseña**: `Admin123`

Este usuario tiene acceso a la gestión de roles de usuario.

## Despliegue en Vercel

La aplicación esta desplegada bajo el siguiente dominio:
"DOMINIO VERCEL"

---
