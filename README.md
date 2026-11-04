# Scorsync Support

The help site for people who run meets with Scorsync: hosts, offline hosts (Scorsync Desktop), scoring table operators, judges and chairs. Built with [Nimbus](https://nimbus-docs.com) (`@cloudflare/nimbus-docs`, pinned to **0.19.2**) on Astro, and hosted on Cloudflare Workers Static Assets.

Tracked in Linear: map SCO-2043, scaffold ticket SCO-2055. The IA comes from SCO-2053; the framework and host from SCO-2049.

## Work on it

Needs Node 22.12 or later.

```sh
npm ci
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run check      # Nimbus preflight: config, frontmatter, internal links, types
npm run typecheck  # astro check
```

CI (`.github/workflows/ci.yml`) runs `nimbus-docs check`, `astro check` and the build on every pull request.

## Where things are

| Path | What |
| -- | -- |
| `src/content/docs/` | The pages. One folder per audience (`host/`, `offline-host/`, `scoring-table/`, `judges/`), plus `start-here/`, `runbook/`, `help/` and `style-guide/`. |
| `astro.config.ts` | Site title, the sidebar order, and the two house callouts (`:::review`, `:::rule`). |
| `src/components/ui/aside/Aside.astro` | How every callout looks, including the house ones. |
| `src/content/partials/placeholder.mdx` | The "Placeholder" notice on pages not written yet. |
| `templates/article.mdx` | The article template. Copy it to start a page. |
| `netlify.toml` | Netlify build settings. |
| `public/_headers` | Caching headers. |

The house style is on the site itself, under **For writers**: [how we write](src/content/docs/style-guide/index.mdx), the [article template](src/content/docs/style-guide/article-template.mdx), [callouts](src/content/docs/style-guide/callouts.mdx) and [rulebook citations](src/content/docs/style-guide/rulebook-citations.mdx).

The internal Support playbook (restore, admin password reset, Reset meet, config flags) is **not** in this site, which will be public at launch.

## Deploys

Netlify watches this repo:

- **`main`** deploys to https://support.scorsync.com. The site is public.
- **Every pull request** gets a deploy preview URL, posted on the PR. Netlify marks previews `noindex`.
- To redeploy: push a commit, or Netlify → `scorsync-support` → Deploys → **Trigger deploy**.
- Build settings are in `netlify.toml`: build `npm run build`, publish `dist`, Node 22.
- DNS: `support.scorsync.com` is a CNAME at DigitalOcean (the scorsync.com DNS host) to the Netlify site.

## Upgrading Nimbus

Nimbus is pre-1.0 and its API can change between minor releases. Upgrade on purpose, never by range: follow "Upgrading Nimbus" in [AGENT.md](AGENT.md). If Nimbus ever forces content rewrites more than once, stalls for about 60 days, or changes direction, move to Starlight (SCO-2049). Content is written to make that cheap; see "Keep the exit cheap" in the style guide.
