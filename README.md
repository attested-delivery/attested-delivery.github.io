# attested-delivery.github.io

The **marketing site** for [attested-delivery](https://github.com/attested-delivery)
— the org's GitHub Pages root, served at <https://attested-delivery.github.io/>.

> The digest is the release. Everything true about it travels with it.

This repo is intentionally separate from the reference **docs** (an Astro
Starlight site served at `/docs/`). Docs explain the system in depth; this site
introduces it and gets people to their first verified release. Brand voice and
the "marketing, not a product pitch" stance are defined in
[`design-system/BRAND.md`](./design-system/BRAND.md).

## Stack

- [Astro](https://astro.build) `6.4.8` (static output)
- Plain CSS driven entirely by design tokens — no CSS framework
- Package manager: `pnpm` (matches the docs repo)
- Node: current Active LTS (`>=22.12`, the Astro 6 floor). Verified against
  Node 24 "Krypton"; do not pin an EOL line.

## Design system

Everything visual is defined once in
[`design-system/tokens.json`](./design-system/tokens.json):

- **Color** — a "trust under threat" dark palette. The near-black field
  (`#0A0D13`–`#151B27`) is the hostile climate; verified-green (`#36D399`) is the
  single brand accent ("this held; it was checked"). Threat-red (`#FF5C6C`) and
  caution-amber (`#F4B740`) are semantic state colors only — never a second accent.
- **Typography** — system sans for prose, monospace for the wordmark, code, and
  any value you could copy and run. Sizes follow a 1.25 modular scale.
- **Spacing** — a 4px base unit (`--space-1` … `--space-10`).
- **Radii / shadows / layout** — `--radius-*`, `--shadow-*`, `--layout-*`.

### How tokens reach the page

There are **no hard-coded hex values** in the site's CSS. The flow is:

```text
design-system/tokens.json
        │  read at build time
        ▼
src/lib/tokens.js   →  flattens { value } leaves into CSS custom properties
        │                e.g. color.accent.base → --color-accent-base
        ▼
src/layouts/Base.astro  →  injects :root { --… } into <head>
        ▼
src/styles/global.css   →  every rule uses var(--…)
```

To change the brand, edit `tokens.json` and rebuild — nothing else.

### Logo

[`design-system/logo.svg`](./design-system/logo.svg) — a hexagonal seal (the
content digest) with a verification check struck through it and one deliberately
broken, threat-red notch (the seal is defined by what it holds closed). Usage
rules live in [`BRAND.md`](./design-system/BRAND.md). A mark-only favicon is at
`public/favicon.svg`.

## Site sections

All sections render on the single home page
([`src/pages/index.astro`](./src/pages/index.astro)):

| Section      | Component                                  | Purpose                                                                                                                                |
| ------------ | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Hero         | `src/components/Hero.astro`                | Names the 2026 threat climate and the security/delivery-posture value prop.                                                            |
| How it works | `src/components/HowItWorks.astro`          | The GitHub-native backend — SHA-pinning, SLSA provenance, attestations, Sigstore/cosign, fail-closed admission — in user-facing terms. |
| Quickstart   | `src/components/Quickstart.astro`          | Copy-pasteable commands to verify a release and adopt the pipeline.                                                                    |
| Community    | `src/components/Community.astro`           | Contribute, discussions, and the "adopt in your org" CTA.                                                                              |
| Nav / Footer | `src/components/Nav.astro`, `Footer.astro` | Shell and links (docs live at `/docs/`).                                                                                               |

## Develop & build

```sh
pnpm install        # install dependencies
pnpm dev            # local dev server (hot reload)
pnpm build          # static build → ./dist
pnpm preview        # serve the built ./dist locally
```

## Quality gates

```sh
pnpm run lint:format   # prettier --check (astro, js, css, json, md)
pnpm run lint:md       # markdownlint-cli2 over **/*.md
pnpm run lint          # both of the above
pnpm run check         # astro check (type/diagnostics)
```

CI for this repo should run `pnpm run build` and `pnpm run lint`; both must pass
before deploy. The site itself is published through the same attested pipeline it
describes.
