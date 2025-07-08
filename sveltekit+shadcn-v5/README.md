# Overview

This is a free-to-use template of a generic, flexible web app powered by:
- Sveltekit (Svelte v5).
- Shadcn-svelte.
- Tailwind.
- Clerk (Authentication)

Go to [https://sveltekit-shadcn.templates.guylahav.com](https://sveltekit-shadcn.templates.guylahav.com) to see it in action.

This template provides:
- Theme dark/light toggle.
- Application shell component
- Pages:
  - Home
  - Example (To inspect the behavior of a standard page with scrollable content)
  - Error (To inspect the behavior of an error boundary)
  - Policies:
    - Terms & Conditions.
    - Privacy.
    - Cookies.
  - View Transition.
- Cookie management (with actual support for managing your cookies)
- SEO:
  - Each page has an example of its minimal SEO object that should be defined for basic SEO.
  - sitemap.xml + robots.txt
- i18n:
  Support for English and Hebrew as examples for lr and rl directions
    - Configurable via dropdown selection.
    - Configurable via route.
- Manage internal content with Markdown

## Roadmap
- Basic layouts that you can choose from: (configurable for inspection through the home page)
  - Collapsible navigation (Dynamic via direction).
  - Top bar navigation menu.
  - Bottom navigation menu (mobile style).
- Databse abstraction.
- CLI?

## Developing

```bash
bun run dev
```

## Building

To create a production version of your app:

```bash
bun run build
```

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
