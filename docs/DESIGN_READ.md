# Design Read

## Scope and sources

This is a design audit for Aayush Raj's personal portfolio. The V2 brief identifies the site as a dark, high-contrast, blueprint-editorial portfolio for a full-stack developer and Technical Co-founder of DOZO. The content source confirms the name, production-oriented positioning, NIT Hamirpur education, and DOZO co-founder role. Missing facts stay omitted rather than inferred.

Taste Skill's documentation and guide were fetched successfully on 2026-09-30:

- [Taste Skill docs](https://www.tasteskill.dev/docs)
- [Taste Skill guide](https://www.tasteskill.dev/guide)

Rules that affect this site:

- Declare a one-sentence design read and three dial values before implementation.
- Keep one page theme, one color system, one accent, and one corner-radius system.
- Avoid AI-purple gradients, mesh blobs, glow, glassmorphism, particles, floating objects, gradient text, fake dashboards, fake terminals, decorative SVG illustration, three-equal-card rows, decorative scroll cues, locale strips, status dots, and version labels.
- Keep the hero headline to two lines or fewer, subtext to 20 words or fewer, the primary CTA visible in the first viewport, and desktop navigation to one line under 80px tall.
- Prefer asymmetric grids, editorial composition, real images, and typographic cards when real project imagery is unavailable.
- Use CSS-first motion and established animation primitives. Do not use hand-rolled scroll listeners or animation loops that write React state.
- Respect reduced motion. Do not use em dashes or en dashes in copy.

## Reference sites

These are sites whose pages were fetchable. Notes below include only characteristics verified in the fetched page content. A text fetch cannot prove visual behavior that is not represented in the returned content.

### Pentagram

[https://www.pentagram.com/](https://www.pentagram.com/)

- Composition: A broad work-led homepage organized into thematic project groups, latest work, retrospectives, news, contact, and footer navigation.
- Typography: Strong editorial hierarchy is visible through large section titles, project names, category labels, and quoted statements about design and typography.
- Density: High content density, with many project modules and categories presented in a long, scannable page.
- Motion: Not verifiable from the fetched text.

### Paco Coursey

[https://paco.me/](https://paco.me/)

- Composition: Personal site organized around Building, Projects, Writing, Now, and Connect, with project and writing indexes rather than a marketing funnel.
- Typography: Text-led and compact, with short descriptive statements and clear linked lists.
- Density: Restrained but information-rich, using several concise content groups without large explanatory blocks.
- Motion: Not verifiable on the home page from the fetched text. The Craft page does verify that motion and interaction studies are a significant subject of the site.

### Rauno Freiberg

[https://rauno.me/](https://rauno.me/)

- Composition: A compact personal index linking Craft, Projects, Field Notes, and several time-stamped projects and archives.
- Typography: Short imperative statements and concise labels carry the voice; the fetched page shows a strong text-first identity.
- Density: Very lean, with a small number of links and a short sequence of memorable statements.
- Motion: Not verifiable from the fetched text.

### Lee Robinson

[https://leerob.com/](https://leerob.com/)

- Composition: Personal profile followed by Notes and Blogs indexes, with topic-specific links and dated writing.
- Typography: Plain, direct editorial typography is represented by a short biography, compact headings, and dated article titles.
- Density: Moderate and highly scannable, with many links grouped into simple lists rather than cards.
- Motion: Not verifiable from the fetched text.

### Bruno Simon

[https://bruno-simon.com/](https://bruno-simon.com/)

- Composition: A portfolio framed as an explorable world, with the invitation to drive around and discover the site.
- Typography: Minimal visible copy, centered on a short introduction and a clear creative-developer identity.
- Density: Very low in the fetched content, prioritizing an experience over information blocks.
- Motion: The copy explicitly describes driving and discovery, but the actual motion behavior is not verifiable from the text fetch.

### Awwwards portfolio directory

[https://www.awwwards.com/websites/portfolio/](https://www.awwwards.com/websites/portfolio/)

- Composition: A directory and inspiration index with filters, a large list of portfolio entries, and supporting site navigation.
- Typography: Functional directory hierarchy with collection title, descriptive copy, site names, and creator names.
- Density: High directory density, with many portfolio links in a scan-oriented listing.
- Motion: Not verifiable from the fetched text.

## Design dials

- `DESIGN_VARIANCE: 6`. The portfolio should have enough variation to distinguish a featured product, shipped projects, engineering history, and personal context, while a shared grid, type system, and token system keep it coherent.
- `MOTION_INTENSITY: 3`. Motion should clarify hierarchy through a hero entrance, one-time section reveals, image transitions, and restrained hover states, without becoming the portfolio's subject.
- `VISUAL_DENSITY: 5`. The site needs to prove technical range through many content sections, but compact editorial lists and deliberate whitespace should keep it readable.

## One-sentence design read

A dark blueprint-editorial portfolio that makes full-stack breadth visible through real project evidence, giant type, an engineering grid, and a Layer Map.

## Typography

Keep `Bricolage Grotesque + Geist + Geist Mono`.

- Bricolage Grotesque gives the hero and selected-work moments a strong technical display voice that supports the blueprint-editorial direction.
- Geist is a practical body and interface face for dense project descriptions, navigation, metadata, and accessible scanning.
- Geist Mono is appropriate for technologies, dates, statuses, and small engineering metadata where a code-adjacent texture adds meaning.
- Three families is the local maximum and is enough to create hierarchy without decorative type sprawl.
- Use Bricolage Grotesque selectively for display hierarchy. Long body copy, controls, and dense lists should remain in Geist for legibility and consistency.

## Color

Use one dark theme with one high-contrast orange accent. Values are defined in `app/globals.css`:

```css
:root {
  --background: #0A0A0B;
  --foreground: #F2F0EA;
  --muted: #8C8C86;
  --border: rgb(255 255 255 / 12%);
  --accent: #FF4D1F;
}
```

Contrast ratios against `--background: #0A0A0B`, calculated using WCAG 2.x relative luminance:

- `--foreground` on `--background`: `14.68:1`, comfortably above the `4.5:1` normal-text target.
- `--muted` on `--background`: `5.63:1`, above the `4.5:1` normal-text target.
- `--accent` on `--background`: `6.48:1`, above the `4.5:1` normal-text target for links and emphasis.
- `--border` on `--background`: `1.34:1`, intentionally structural only and not suitable for text or essential control boundaries by itself.

## Homepage structure and layout audit

The page should use a different layout family for every adjacent section. The following sequence has no adjacent sections sharing a layout family:

| Section | Layout family | Direction |
| --- | --- | --- |
| Nav | Single-line utility bar | Minimal identity, anchor links, and resume action in one compact row |
| Hero | Split editorial composition | Large serif introduction beside compact proof points and the visible `View Projects` CTA |
| Selected Work | Asymmetric project grid | One dominant project and smaller supporting projects, avoiding equal-card repetition |
| DOZO feature | Full-width case-study band | A dedicated product story with real imagery when available and a clear status treatment |
| Other Projects | Editorial index list | Dense scan-friendly rows with role, status, stack, and link rather than another card grid |
| About / Engineering | Two-column profile | Personal summary paired with engineering principles and evidence from the data files |
| Skills | Grouped matrix | Group technologies by meaningful capability areas with compact mono metadata |
| Experience and Recognition | Timeline and record list | Chronological experience or recognition records, with missing facts omitted |
| Currently Exploring | Stacked note index | Short dated or topic-based entries with room for evolving interests |
| Education | Institutional record | A restrained academic record with institution, program, graduation target, and verified marks |
| Contact | Oversized text CTA | A simple closing invitation with links, not a form unless a real email is available |
| Footer | Utility footer | Repeated identity, external links, resume, and copyright or site metadata |

No adjacent pair shares one layout family. No requested section is filler based on the current content model, so no merge is recommended. `Experience and Recognition` is already correctly merged as one evidence section, while `Selected Work`, `DOZO feature`, and `Other Projects` should remain distinct because they communicate different levels of project emphasis.

## 3D decision gate

**Expected outcome: A, no 3D.**

- **Identity:** Does 3D express Aayush's identity better than editorial typography, project evidence, and engineering metadata? No. The verified identity is a full-stack developer, not a spatial or game-based practice.
- **Storytelling:** Does 3D explain the work or make DOZO and the projects easier to understand? No. Real screenshots, project descriptions, architecture details, and status distinctions tell the story more directly.
- **Performance:** Is the benefit worth the runtime, GPU, bundle, and interaction cost? No. The brief prioritizes a fast, accessible portfolio with restrained motion and no unverified performance claims.
- **Mobile:** Does 3D remain legible, useful, and operable at 390x844 and below? No. A spatial interaction would compete with the required first-viewport CTA and project scanning on small screens.

## Performance approach

- **Server components:** Keep the homepage and all content sections as Server Components by default. Read the typed data modules on the server and keep content out of JSX literals. Add small client islands only for keyboard-operable menus, motion that cannot be expressed with CSS, or a real project interaction.
- **Image strategy:** Use `next/image` only for real project screenshots or supplied assets, with meaningful alt text, explicit dimensions, responsive sizes, and modern formats. If a project has no real image, render a plain typographic card and do not create a fake screenshot or empty image slot.
- **Font strategy:** Load Instrument Serif, Geist, and Geist Mono through `next/font`, with only the weights actually used. Set the CSS variables once in the root layout, use `font-display` behavior provided by `next/font`, and avoid runtime font loading.
- **Client islands:** Keep interactive code small and local. Use Motion for the allowed entrance, reveal, hover, image, and navigation transitions only. Respect `prefers-reduced-motion`, avoid scroll-jacking, infinite loops, heavy parallax, cursor trails, and React state updates from hand-rolled scroll listeners.
- **Delivery:** Prefer static rendering for the portfolio route, keep dependencies unchanged unless a real component requires one, and verify build, lint, TypeScript, mobile overflow, and browser console cleanliness before shipping.

Awaiting approval.
