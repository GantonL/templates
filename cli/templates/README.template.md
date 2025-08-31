# {{PROJECT_NAME}}

A modern web application built with {{TEMPLATE_NAME}}.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- {{PACKAGE_MANAGER}}

### Installation

1. Install dependencies:
   ```bash
   {{PACKAGE_MANAGER}} install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration.

3. Start the development server:
   ```bash
   {{PACKAGE_MANAGER}} run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
{{PROJECT_NAME}}/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable components
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript types
│   └── routes/            # SvelteKit routes
├── static/                # Static assets
└── tests/                 # Test files
```

## 🛠️ Available Scripts

- `{{PACKAGE_MANAGER}} run dev` - Start development server
- `{{PACKAGE_MANAGER}} run build` - Build for production
- `{{PACKAGE_MANAGER}} run preview` - Preview production build
- `{{PACKAGE_MANAGER}} run test` - Run tests
- `{{PACKAGE_MANAGER}} run lint` - Lint code
- `{{PACKAGE_MANAGER}} run check` - Type check

## 📚 Learn More

- [SvelteKit Documentation](https://kit.svelte.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

---

*Generated with [Templates CLI](https://github.com/GantonL/templates)*