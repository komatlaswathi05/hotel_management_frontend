# S Star Hotels

React + TypeScript + Vite, styled with [Tailwind CSS v4](https://tailwindcss.com) and linted with [ESLint](https://eslint.org).

## Scripts

- `npm run dev` – start the dev server
- `npm run build` – type-check and build for production
- `npm run lint` – run ESLint
- `npm run preview` – preview the production build

## Styling

Tailwind is wired in through the `@tailwindcss/vite` plugin (`vite.config.ts`) and imported in `src/index.css` with `@import 'tailwindcss';`. Use utility classes directly in components.

## Linting

ESLint uses the flat config in `eslint.config.js` with `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.
