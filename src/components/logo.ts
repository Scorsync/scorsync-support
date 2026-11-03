/**
 * The site's logo, drawn once for every place it appears: the header and the
 * docs layout (Logo.astro) and the social cards (src/pages/og/_card.ts).
 * Replace the drawing here to rebrand them all. Keep it a single-colour
 * mark; each place fills it with its own text colour.
 */
// Placeholder mark (a podium) until Scorsync's own mark is dropped in.
export const logo = {
  /** The drawing's box; callers size it by height and keep the ratio. */
  width: 30,
  height: 24,
  paths: ["M0 13h9v11H0z", "M10.5 4h9v20h-9z", "M21 9h9v15h-9z"],
};
