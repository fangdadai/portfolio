# Fangda Dai — Personal System

A professional and personal portfolio inspired by vintage field guides: warm paper, serif headings, muted teal and rust, monospaced labels, squared controls, and restrained motion.

## Local preview

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173/portfolio/`. Run `npm run build` to create the production bundle.

Run `npm test` for the pathfinding checks. Both the build and tests run in GitHub Actions before deployment.

## What is included

- An immediate profile screen with the full-color `fangda-2026.jpg` portrait, professional focus, personal interests, and an interactive `human.log`.
- Three dated project demos in compact, expandable rows: HelloASL (2026), Raiinet (2023), and DigAvi (2023). Players load on demand; opening another demo closes the previous one.
- An interactive A* pathfinding lab with editable obstacles, a search trace, shortest routes, keyboard controls, and reduced-motion support. Run `node --test src/lib/pathfinding.test.js` to check the algorithm against an independent breadth-first search.
- The complete 10-entry photo archive from the original portfolio.
- Project and journal readers, collection filters, responsive navigation, and a searchable command palette available with **⌘K / Ctrl+K**.
- Keyboard focus handling, reduced-motion support, responsive layouts, and no analytics or new production dependencies.
- A small “cover to cover” stamp on the first downward scroll to the page bottom. It appears once per page visit, dismisses after 6.5 seconds or with its close button, and respects reduced-motion preferences.

Edit profile, project, and journal data in `src/content/`. See [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) for examples.

## Hosting

`vite.config.js` uses `/portfolio/` as its base path. The existing GitHub Actions workflow builds and publishes the site to GitHub Pages when changes are pushed to `main`. Local changes do not publish automatically.
