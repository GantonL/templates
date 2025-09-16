# Project: SvelteKit Shadcn v5 Template

## Project Overview

This project is a comprehensive full-stack web application template built with SvelteKit v5. It integrates `shadcn-svelte` for UI components, offering a modern and customizable interface. The tech stack is robust, featuring TypeScript for type safety, Drizzle ORM for database interactions with PostgreSQL, better-auth for authentication, and Tailwind CSS v4 for styling. The template is designed to be configuration-driven, emphasizing a maintainable and scalable architecture.

Key features include a complete authentication system with OAuth and email/password support, a responsive application shell, a theme system with dark/light modes, internationalization support (i18n), and a GDPR-compliant cookie management system. It also comes with pre-configured policy pages, SEO optimization, and a suite of developer tools, including CLI scripts for scaffolding new pages, markdown files, and API controllers.

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

## Authentication System

The template includes a complete authentication system built with [better-auth](https://better-auth.com), providing modern authentication patterns with excellent TypeScript support and SvelteKit integration.

### Authentication Features

*   **Multiple Authentication Methods**
    *   Email and password authentication with secure password handling
    *   OAuth integration (Google preconfigured, extensible for other providers)
    *   Session-based authentication with database persistence

*   **Security Features**
    *   Automatic session management and token rotation
    *   CSRF protection built-in
    *   Email verification for new accounts
    *   Secure password hashing and validation

*   **Developer Experience**
    *   Full TypeScript integration with type-safe auth state
    *   Reactive session management in Svelte components
    *   Automatic route protection middleware
    *   Server-side session access in load functions

### Authentication Architecture

```
src/lib/
├── server/auth/
│   ├── config.ts           # better-auth server configuration
│   └── handle.ts           # Authentication middleware & route protection
├── client/auth/
│   └── client.ts           # Client-side auth utilities
├── components/
│   ├── signin/             # Sign-in components and providers
│   └── signup/             # Registration components
└── server/database/schemas/
    └── auth.ts             # Database schema for auth tables

src/routes/
├── auth/                   # better-auth API endpoints (auto-generated)
└── [[lang]]/(application)/(auth)/
    ├── signin/             # Sign-in pages
    └── signup/             # Registration pages
```

### Usage Examples

#### Client-Side Authentication

```typescript
import authClient from '$lib/client/auth/client';

// Reactive session state
const session = authClient.useSession();

// Email/password authentication
await authClient.signIn.email({
    email: 'user@example.com',
    password: 'securePassword'
});

// OAuth authentication
await authClient.signIn.social({
    provider: 'google',
    callbackURL: '/dashboard'
});

// User registration
await authClient.signUp.email({
    email: 'newuser@example.com',
    password: 'securePassword',
    name: 'Full Name'
});
```

#### Server-Side Session Handling

```typescript
// In +layout.server.ts or +page.server.ts
export async function load({ event }) {
    // Session and user automatically available via middleware
    const { session, user } = event.locals;

    if (!session) {
        // Handle unauthenticated state
        throw redirect(302, '/signin');
    }

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}
```

#### Route Protection

Routes are automatically protected based on configuration. The system checks route patterns and applies authentication requirements:

```typescript
// Routes requiring authentication by default
// Override with authenticationRequired: false for public routes

// Example route configuration
{
    path: '/dashboard',
    authenticationRequired: true  // Protected
},
{
    path: '/about',
    authenticationRequired: false // Public
}
```

### Database Schema

The authentication system uses four core tables:

*   **user** - User profiles and account information
*   **session** - Active sessions with expiration tracking
*   **account** - OAuth provider account links
*   **verification** - Email verification and password reset tokens

### Environment Configuration

Required environment variables for full functionality:

```bash
# Database (already configured for local development)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Optional: Additional OAuth providers
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Authentication Flow

1. **Registration/Sign-in** - Users can register or sign in via multiple methods
2. **Session Creation** - Successful authentication creates a secure database session
3. **Route Protection** - Middleware automatically protects routes requiring authentication
4. **Session Management** - Sessions are maintained across requests with automatic renewal
5. **Sign-out** - Clean session termination and cleanup

### Integration with Existing Features

The authentication system integrates seamlessly with other template features:

*   **Internationalization** - Auth UI supports Hebrew/English with RTL/LTR layouts
*   **Theme System** - Authentication pages respect dark/light theme preferences
*   **Database Layer** - Uses the same Drizzle ORM setup as other database operations
*   **API Patterns** - Follows established request/response patterns for consistency
