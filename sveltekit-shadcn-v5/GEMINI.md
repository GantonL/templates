# Project: SvelteKit Shadcn v5 Template

## Project Overview

This project is a comprehensive full-stack web application template built with SvelteKit v5. It integrates `shadcn-svelte` for UI components, offering a modern and customizable interface. The tech stack is robust, featuring TypeScript for type safety, Drizzle ORM for database interactions with PostgreSQL, and Tailwind CSS v4 for styling. The template is designed to be configuration-driven, emphasizing a maintainable and scalable architecture.

Key features include a responsive application shell, a theme system with dark/light modes, internationalization support (i18n), and a GDPR-compliant cookie management system. It also comes with pre-configured policy pages, SEO optimization, and a suite of developer tools, including CLI scripts for scaffolding new pages, markdown files, and API controllers.

## Building and Running

The project uses `bun` as the package manager. The following commands are essential for development and deployment:

### Local Development

1.  **Install Dependencies:**
    ```bash
    bun install
    ```

2.  **Start the local database (requires Docker):**
    ```bash
    bun run local:db:up
    ```

3.  **Run database migrations:**
    ```bash
    bun run db:migrate
    ```

4.  **Start the development server:**
    ```bash
    bun run dev
    ```

5.  **Stop the local database:**
    ```bash
    bun run local:db:down
    ```

### Building and Previewing

*   **Build for production:**
    ```bash
    bun run build
    ```
*   **Preview the production build:**
    ```bash
    bun run preview
    ```

### Testing

The project uses Vitest for unit testing and Playwright for end-to-end testing.

*   **Run server-side tests:**
    ```bash
    bun run test:server
    ```
*   **Start the test database:**
    ```bash
    bun run test:db:up
    ```
*   **Stop the test database:**
    ```bash
    bun run test:db:down
    ```

## Development Conventions

### Code Style and Formatting

The project uses Prettier for code formatting and ESLint for linting.

*   **Format code:**
    ```bash
    bun run format
    ```
*   **Check for linting errors:**
    ```bash
    bun run lint
    ```

### Database

The project uses Drizzle ORM for database management.

*   **Generate database migrations:**
    ```bash
    bun run db:generate
    ```
*   **Apply database migrations:**
    ```bash
    bun run db:migrate
    ```
*   **Push schema changes directly to the database (for development):**
    ```bash
    bun run db:push
    ```
*   **Open Drizzle Studio:**
    ```bash
    bun run db:studio
    ```

### CLI Scaffolding Tools

The project includes custom CLI scripts to automate common development tasks.

*   **Create a new page:**
    ```bash
    bun run create:page <path>
    ```
*   **Create markdown files for all locales:**
    ```bash
    bun run create:md <filename>
    ```
*   **Create an API controller:**
    ```bash
    bun run create:api-controller <path>
    ```
