# Overview

This is a free-to-use template of a generic, flexible web app powered by:
- Sveltekit (Svelte v5).
- Shadcn-svelte.
- Tailwind.
- Clerk (Authentication)

Go to [https://sveltekit-shadcn.templates.guylahav.com](https://sveltekit-shadcn.templates.guylahav.com) to see it in action.

This template provides:
- Basic layouts that you can choose from: (configurable for inspection through the home page)
  - Collapsible navigation (Dynamic via direction).
  - Top bar navigation menu.
  - Bottom navigation menu (mobile style).
- Theme toggle.
- Pages:
  - Home
  - Example (To inspect the behavior of a standard page with scrollable content)
  - Error (To inspect the behavior of an error boundary)
  - Settings
  - Policies:
    - Terms & Conditions.
    - Privacy.
  - View Transition.
- Cookie management (with actual support for managing your cookies)
- SEO:
  Each page has an example of its minimal SEO object that should be defined for basic SEO.
- i18n:
  Support for English and Hebrew as examples for lr and rl directions (configurable in the footer).
- Manage internal content with Markdown

## Roadmap
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
