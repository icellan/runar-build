# Rúnar Build

Documentation and landing page for the [Rúnar](https://github.com/icellan/runar) smart contract compiler for Bitcoin SV.

**Live site:** [runar.build](https://runar.build)

## What is Rúnar?

Rúnar is a multi-language smart contract compiler for Bitcoin SV. It compiles contracts written in TypeScript, Go, Rust, Python, Solidity, and Move into optimized Bitcoin Script through a 6-pass nanopass pipeline. All languages produce byte-identical output for the same contract logic.

### Related Projects

- **[Rúnar Compiler](https://github.com/icellan/runar)** — The compiler source code
- **[Rúnar Playground](https://runar.run)** — Interactive browser-based IDE and debugger for writing, compiling, and step-through debugging Rúnar contracts

## This Repository

This repository contains the source for the Rúnar documentation site at [runar.build](https://runar.build). It is built with [Astro](https://astro.build/), uses MDX for documentation content, React for interactive components, and Tailwind CSS v4 for styling. Full-text search is powered by [Pagefind](https://pagefind.app/).

### Documentation Sections

- **Getting Started** — Installation, quick start, project structure
- **Bitcoin & BSV Basics** — UTXO model, Bitcoin Script, transactions
- **Writing Contracts** — Language-specific guides for all six supported languages, plus a feature matrix
- **The Compiler** — Architecture, compilation pipeline, configuration, output artifacts
- **The SDK** — Deploying, calling, multi-signer, stateful contracts, token contracts, wallet integration
- **Testing & Debugging** — Test runner, fixtures, mocks, fuzzing, debugging compiled script
- **Advanced** — Covenant architecture, recursive contracts, ZK proofs, DAG topology, security
- **API Reference** — Compiler API, SDK API, decorators and types, CLI reference
- **Tutorials** — Hello World, fungible token, NFT, multi-party escrow
- **Examples** — Counter, auction, and more

## Tech Stack

- **Astro 6** — Static site generator
- **MDX** — Markdown with JSX components for documentation pages
- **React 19** — Interactive UI components
- **Tailwind CSS v4** — Styling with `@theme` directives
- **Pagefind** — Client-side full-text search (runs as a post-build step)
- **Cloudflare Pages** — Deployment target (configured via `wrangler.jsonc`)

## Prerequisites

- Node.js >= 22 (see `.nvmrc`)
- npm

## Getting Started

```sh
# Install dependencies
npm install

# Start the dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## Project Structure

```
runar-build/
├── astro.config.mjs          # Astro configuration (React, MDX, sitemap, Tailwind)
├── package.json               # Dependencies and scripts
├── pagefind.yml               # Pagefind search configuration
├── tsconfig.json              # TypeScript configuration with path aliases
├── wrangler.jsonc             # Cloudflare Pages deployment config
├── public/                    # Static assets (images, fonts, favicons)
├── src/
│   ├── components/            # Astro and React components
│   │   ├── docs/              # Documentation-specific components
│   │   ├── landing/           # Landing page components
│   │   ├── mdx/               # MDX component overrides
│   │   └── shared/            # Shared components (Logo, etc.)
│   ├── content/
│   │   └── docs/en/           # MDX documentation pages
│   │       ├── getting-started/
│   │       ├── bitcoin-bsv-basics/
│   │       ├── writing-contracts/
│   │       ├── compiler/
│   │       ├── sdk/
│   │       ├── testing-and-debugging/
│   │       ├── advanced/
│   │       ├── api-reference/
│   │       ├── tutorials/
│   │       └── examples/
│   ├── data/                  # Navigation structure, language data, features
│   ├── layouts/               # Page layouts
│   ├── pages/                 # Astro page routes
│   └── styles/                # Global CSS and Tailwind theme
└── dist/                      # Build output (git-ignored)
```

## Commands

| Command           | Action                                                    |
|:------------------|:----------------------------------------------------------|
| `npm install`     | Install dependencies                                      |
| `npm run dev`     | Start dev server at `localhost:4321`                      |
| `npm run build`   | Build production site to `./dist/` with Pagefind indexing |
| `npm run preview` | Preview the production build locally                      |
| `npm run check`   | Run Astro type checking                                   |

## Deployment

The site deploys to Cloudflare Pages. The `wrangler.jsonc` file points to the `./dist` build output directory. Deployments are triggered automatically on push to `main`.

## License

All rights reserved.
