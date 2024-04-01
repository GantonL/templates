# Overview

This is a free to use template of a generic, flexible web app powered by:
- Sveltekit.
- Shadcn-svelte.
- Tailwind.

This template provides:
- Basic layouts that you can choose from: (configurable for inspection through the settings page)
  - Collapsible left side navigation.
  - Top bar navigation menu.
  - Bottom navigation menu (mobile style).
- Theme toggle.
- Pages:
  - Home
  - Example (To inspect the behavior of standard page with scrollable content)
  - Error (To inspect the behavior of an error boundry)
  - Settings
  - Policies:
    - Terms & Conditions.
    - Privacy.
  - View Transition.
- Cookie management (with actual support for managing your cookies).
- SEO:
  Each page has an example of it's minimal seo object that should be defined for basic seo.

## Developing

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
