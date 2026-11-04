import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import nimbus, {
  defineConfig as defineNimbusConfig,
} from "@cloudflare/nimbus-docs";
import { tableScroll } from "@cloudflare/nimbus-docs/markdown";

const nimbusConfig = defineNimbusConfig({
  // Production address, hosted on Netlify. help.scorsync.com stays with
  // scorsync.com's own help.
  site: "https://support.scorsync.com",
  title: "Scorsync Support",
  description:
    "Step-by-step help for hosts, scoring table operators and judges running meets with Scorsync.",
  locale: "en",
  // The repo is private and readers are gym staff, so no GitHub link.
  github: null,
  socialImageAlt: "Scorsync Support",
  // Organised by audience, then task (never by code module). Mirrors the
  // IA approved in SCO-2053. Pages are placeholders until written.
  sidebar: {
    items: [
      "index",
      { label: "Start here", autogenerate: { directory: "start-here" } },
      { label: "Host", autogenerate: { directory: "host" } },
      { label: "Offline host (Scorsync Desktop)", autogenerate: { directory: "offline-host" } },
      { label: "Scoring table", autogenerate: { directory: "scoring-table" } },
      { label: "Judges and chairs", autogenerate: { directory: "judges" } },
      { label: "Meet-day runbook", autogenerate: { directory: "runbook" } },
      { label: "Help", autogenerate: { directory: "help" } },
      { label: "For writers", autogenerate: { directory: "style-guide" }, collapsed: true },
    ],
  },
});

export default defineConfig({
  // nimbus:adapter
  output: "static",
  // Tailwind v4 via its Vite plugin (the integration Astro recommends for
  // Tailwind v4 — replaces the PostCSS plugin, which doesn't build under
  // Astro 7's Vite 8 bundler).
  vite: {
    plugins: [tailwindcss()],
  },
  // Hover-prefetch link targets so full-page navigations feel instant without
  // a client-side router.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    nimbus(nimbusConfig, {
      // Authoring rules are opt-in by design — your repo, your taste. The
      // two below are the load-bearing pair: frontmatter has to validate
      // against the content schema for the page to render properly, and
      // broken internal links are 404s for your readers. Add the others
      // (heading hierarchy, code-block language, style, etc.) when you're
      // ready to enforce them — see `nimbus-docs lint --help`.
      rules: {
        "nimbus/frontmatter-shape": "error",
        "nimbus/internal-link": "error",
      },
      // Two house callouts on top of note/tip/caution/danger:
      //   :::review  "Needs Austin's review" (rules, scoring math, pricing,
      //              refunds, privacy, anything provisional)
      //   :::rule    a USA Gymnastics rulebook citation
      // Nimbus passes the alias straight through to <Aside type>, which
      // styles both (src/components/ui/aside/Aside.astro). The published
      // type only lists the four built-in slots, hence the cast.
      // Porting to Starlight: rewrite `:::review` to
      // `:::caution[Needs Austin's review]` and `:::rule[...]` to `:::note[...]`.
      admonitions: {
        typeAliases: { review: "review", rule: "rule" } as unknown as Record<
          string,
          "note" | "tip" | "caution" | "danger"
        >,
      },
      markdown: {
        // Wrap wide tables so they scroll instead of overflowing the page
        // (styled by `.nb-table-scroll` in src/styles/prose.css).
        hastPlugins: [tableScroll()],
        // `## Install {#install}` gives a heading a fixed id. A heading that
        // ends in other `{…}` text, such as `{account_id}` in a .md file, is
        // read as attributes too; remove this to keep it as text.
        features: { headingAttributes: true },
      },
    }),
  ],
});
