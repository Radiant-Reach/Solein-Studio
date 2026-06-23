# RR-Website — Coding Principles

## Tech Stack

| Layer      | Technology                                                      |
| ---------- | --------------------------------------------------------------- |
| Framework  | **Gatsby 5** (SSG) + React 18 + TypeScript 5                    |
| Styling    | **styled-components 6** with `*.style.ts` colocated files       |
| Animations | **GSAP 3** + `@gsap/react` (ScrollTrigger, contextSafe pattern) |
| CMS        | **WordPress** via `gatsby-source-wordpress` + GraphQL           |
| Forms      | **react-hook-form 7** + **Zod 3** (schema-first validation)     |
| State      | **Jotai 2** atoms for global UI state                           |
| i18n       | **gatsby-theme-i18n** + **react-i18next**                       |
| Images     | `gatsby-plugin-image` (`GatsbyImage` / `StaticImage`)           |
| Carousels  | **Swiper 11**                                                   |
| Fonts      | Marcellus (default, serif), Caveat (secondary, not yet used)   |

---

## Folder Architecture

```
src/
├── components/
│   ├── atoms/          # Base UI: Button, Typography, Container, Image, Input, Link, Icon, Seo, Hidden, Spacing
│   ├── molecules/      # Composites: AnimatedText, AnimatedImage, Swiper, Field, Modals
│   └── organisms/      # Page sections: Homepage/*, CTABreak, Forms, Legal
├── pages/              # Gatsby page templates — one file per route
├── views/              # Layout wrappers (Layout, Layout_Landing, NormalLayout)
├── hooks/
│   ├── useFormatQueryData/   # CMS data transformers (one file per page)
│   ├── seo.ts                # SEO data formatter
│   └── cms/                  # Standalone CMS fetch hooks (e.g. useServices)
├── animations/         # GSAP timeline files (enterAnimation, slice_in, etc.)
├── styles/             # theme.ts, media.ts, mixins.ts, global.ts, normalize.ts
├── types/              # domain.ts, page.ts, theme.d.ts, global.d.ts
├── utils/              # styled.ts, gtm.ts, format/, navigate.ts, isSSR.ts
├── constants/          # Shared constant values
├── store/              # Jotai atoms
├── translation/        # i18n config + locale JSON files
└── assets/             # icons/, images/, videos/
```

### Route Conventions

- One file per route in `src/pages/`. Filename = URL slug (e.g. `automatyzacja-biznesu.tsx` → `/automatyzacja-biznesu`).
- Pages that pull CMS data export a `query` constant at the bottom of the file and receive `data` via `PageProps<Queries.XyzQuery>`.
- Pages without CMS (landing pages) have no `query` export; all content comes from `useFormatQueryData` with static fallbacks.
- Layout variants: `<Layout>` for main pages (nav + footer), `<Layout_Landing>` for standalone landing pages.

---

## Design System

### Breakpoints

```ts
base: 0 | xs: 350 | sm: 576 | md: 768 | lg: 992 | xl: 1200 | xxl: 1440 | xl3: 1600 | desktop: 1920
```

Use `media.md.min` / `media.lg.max` helpers from `src/styles/media.ts` — never write raw `@media` strings.

### Color Tokens (`src/styles/theme.ts`)

| Token                          | Value                                          |
| ------------------------------ | ----------------------------------------------- |
| `terracotta`                    | `#AF3D23` — primary brand color                |
| `brick`                         | `#90181A` — deep red, pressed/emphasis         |
| `orange`                        | `#FE5900` — bright accent, highlights/CTA      |
| `espresso`                      | `#361E1C` — near-black warm brown, ink         |
| `cream`                         | `#FCF9D9` — pale sun yellow, light-on-dark     |
| `sand`                          | `#FAF5EB` — warm off-white, page background    |
| `terracotta700`–`terracotta050` | Terracotta tint/shade scale                    |
| `ink900`–`ink100`               | Espresso-based warm neutral scale              |
| `sand50`–`sand300`              | Sand/cream surface scale                       |
| `cream100`/`cream200`           | Cream surface scale                            |
| `creamA8`, `cream33`            | Cream alpha tints (muted text / border-on-dark)|
| `espresso1F`/`espresso38`/`espresso6B` | Espresso alpha tints (soft/medium/strong borders) |
| `primary100/50/20`              | Legacy blue accent scale (unused by brand UI)  |
| `gray100`–`gray00`              | Neutral scale                                  |
| `danger`                        | `#90181A` (= `brick`)                          |
| `success`                       | `#5A7A3C`                                      |

Always reference theme tokens via `${({ theme }) => theme.colors.terracotta}` — never hardcode hex values.

### Typography Scale

Use the `<Text>` atom (Typography component) with scale props, never arbitrary `font-size`.

| Prop        | Range                                   | Usage               |
| ----------- | --------------------------------------- | ------------------- |
| Headings    | `H100` (20px) → `H900` (105px)          | Marcellus serif     |
| Body        | `BodySmall` (10px) → `BodyLarge` (18px) | Marcellus           |
| B-scale     | `B100` → `B900`                         | Serif body variants |

```tsx
<Text
  $base={H400} // mobile
  $md={H600} // tablet
  $xl={H800} // desktop
  $color="white"
  $align={{ base: 'center', lg: 'left' }}
/>
```

### Inline Script-Font Accents

For the recurring "word in script font" heading accent (e.g. "Poznaj Studio *Soleil*"), do **not** wrap it in a dedicated component. Use a plain `<span className="styled">` and insert its text via `dangerouslySetInnerHTML` — `Text`'s own stylesheet already targets `span.styled` to apply the secondary (Caveat) font:

```tsx
heading: (
  <>
    Poznaj Studio{' '}
    <span className="styled" dangerouslySetInnerHTML={{ __html: 'Soleil' }} />
  </>
)
```

When the whole heading string (not just one inline word) needs the markup — e.g. a `feature.heading` field consumed directly by a component — skip the JSX fragment and pass the raw HTML string straight through, rendering it with `dangerouslySetInnerHTML` on the `Text` element itself (no `children`):

```ts
heading: 'W samym sercu <span class="styled">Wrocławia</span>'
```

```tsx
<Text as="h3" $base={H500} dangerouslySetInnerHTML={{ __html: feature.heading }} />
```

### Rendering Dynamic Text

This generalizes beyond script accents: **any leaf element rendering a single dynamic string value renders it via `dangerouslySetInnerHTML`, not JSX children.** This applies to `Text`, raw host elements (`span`, `div`, `h1`–`h6`, `p`, `dt`, `dd`, `label`), the `Button` atom, and `Link`-derived components (`Link`'s prop type includes `dangerouslySetInnerHTML?: { __html: string }` specifically to support this).

```tsx
// Don't
<Text as="h3" $base={H400}>{category.title}</Text>
<FooterLink to={link.path}>{link.name}</FooterLink>

// Do
<Text as="h3" $base={H400} dangerouslySetInnerHTML={{ __html: category.title }} />
<FooterLink to={link.path} dangerouslySetInnerHTML={{ __html: link.name }} />
```

For content that mixes static text with a variable (`← {backLabel}`), build one template-literal string instead and still use `dangerouslySetInnerHTML`:

```tsx
<BackLink to={backTo} dangerouslySetInnerHTML={{ __html: `← ${backLabel}` }} />
```

**Exceptions — keep plain JSX children:**

- Props/`children` typed `React.ReactNode` (not `string`) where the value may legitimately contain other components or the script-accent fragment — e.g. `SectionHeading`'s `children`, `Lightbox`'s `children`, `PricingRules`' `notice`. Forcing these through `dangerouslySetInnerHTML` would break whenever an actual element (not just text) is passed.
- Children that are themselves nested components/elements (e.g. a `<Text>` nested inside another `<Text>` for separate styling) — these can't be flattened into one HTML string without losing that nested styling.
- Static string literals with no variable involved (e.g. `<Text>Polityka prywatności · Regulamin</Text>`) — there's no `{value}` to swap out, so this rule doesn't apply.

### Container Variants

```tsx
<Container $variant="normal" />   // max-width: 1920px
<Container $variant="wide" />     // max-width: 1440px
<Container $variant="slim" />     // max-width: 1000px
<Container $variant="compact" />  // max-width: 750px
<Container $variant="full" />     // no max-width
```

---

## Section Structure

Every page section follows this two-layer wrapper pattern:

```
<Wrapper>           ← full-width, sets background color, vertical padding, section ID
  <InnerWrapper>    ← extends Container, constrains max-width, holds layout (flex/grid)
    <Content>       ← semantic layout regions (TopContent, ButtomText, Heading, etc.)
      ...
    </Content>
  </InnerWrapper>
</Wrapper>
```

### Organism Scope

Each organism renders exactly **one** standalone section (`<Wrapper>` with one background/padding context) — never bundle a second, visually distinct section (e.g. a closing CTA banner) inside another organism's return value, even via a `<>...</>` fragment. If a CTA/banner pattern is shared across multiple pages, build it as its own **molecule** (e.g. `CtaBanner`) and compose it directly in the page file as a sibling of the organism it follows:

```tsx
// src/pages/page-name.tsx
const { SECTION_DATA, CTA_BANNER_DATA } = useFormatQueryData()

<Section {...SECTION_DATA} />
<CtaBanner {...CTA_BANNER_DATA} />
```

The hook returns a separate top-level data key for the shared molecule (e.g. `CTA_BANNER_DATA`) rather than folding its fields into the preceding organism's props. This keeps each organism independently reusable/testable as a single section, and keeps page composition (which sections appear, in what order) visible in the page file instead of hidden inside an organism.

### Styled Component Rules

- Styles primarily live in a sibling `ComponentName.style.ts` file, imported as named exports (e.g. `import { ButtonWrapper, ButtonIcon } from './Button.style'`) — not as an `import * as S` namespace.
- One-off styled components used only inside a single component file (e.g. small `Flex` wrappers) may be defined inline in the `.tsx` file instead of being extracted to `.style.ts`.
- Transient props (styled-components internal, not forwarded to DOM) use the `$` prefix: `$variant`, `$reverse`, `$hasVideo`.
- Use the `Transienty<T>` utility type from `src/utils/types.ts` when converting prop interfaces to transient ones.

### Responsive Visibility

Use the `<Hidden>` atom to show/hide per breakpoint — never conditional rendering that hydrates differently:

```tsx
<Hidden $base="hidden" $md="visible">Desktop-only content</Hidden>
<Hidden $base="visible" $md="hidden">Mobile-only content</Hidden>
```

### Animation at Section Level

Use molecule wrappers — never call GSAP directly inside section components:

```tsx
<AnimatedText as="h2">{heading}</AnimatedText>   // GSAP slice-in on scroll
<AnimatedImage {...image} />                      // Fade-in on scroll via ScrollTrigger
```

When writing custom GSAP in a component, always use `contextSafe` from `useGSAP` to prevent memory leaks on unmount.

---

## Data Flow: useFormatQueryData

All prop data for every section — whether sourced from WordPress CMS or hardcoded static content — must flow through a `useFormatQueryData` hook. This is the single source of truth for what each section renders.

### When a page has a GraphQL query

```ts
// src/hooks/useFormatQueryData/page-name.ts
export const useFormatQueryData = (cmsData: Queries.PageNameQuery) => {
  return useMemo(() => {
    const PAGE = cmsData.page?.AcfGroup!

    const HERO_DATA = {
      heading: PAGE.heroHeading!,
      button: { label: PAGE.heroCta?.title!, to: PAGE.heroCta?.url! },
    } satisfies HeroProps

    const PRICING_DATA = {
      plans:
        PAGE.pricingPlans?.map((p) => ({
          name: p?.name!,
          price: p?.price!,
        }))! || [],
    } satisfies PricingProps

    return { HERO_DATA, PRICING_DATA }
  }, [JSON.stringify(cmsData)])
}
```

### When a page has NO GraphQL query

Define the static content inside the same hook file as plain objects. The hook receives no arguments and returns the same shape:

```ts
// src/hooks/useFormatQueryData/page-name.ts
export const useFormatQueryData = () => {
  return useMemo(() => {
    const HERO_DATA = {
      heading: 'Automatyzacja Biznesu',
      button: { label: 'Umów konsultację', to: '/kontakt' },
    } satisfies HeroProps

    const SERVICES_DATA: ServiceSectionProps[] = [
      {
        badge: 'Lead Generation',
        title: 'Pozyskuj klientów automatycznie',
        features: ['CRM integration', 'Email sequences', 'Lead scoring'],
        reverse: false,
      },
    ]

    return { HERO_DATA, SERVICES_DATA }
  }, [])
}
```

### Rules

1. **Never pass raw CMS fields directly as props.** Always go through `useFormatQueryData`.
2. **All returned constants use SCREAMING_SNAKE_CASE**: `HERO_DATA`, `PRICING_DATA`.
3. **Use `satisfies ComponentPropsType`** instead of an explicit type annotation — it gives type-checking without widening.
4. **Memoize with `useMemo`**. Dependencies: `[JSON.stringify(cmsData)]` for CMS hooks, `[]` for static hooks.
5. **Spread the result directly onto the section component**: `<Hero {...HERO_DATA} />`.
6. **One hook file per page** under `src/hooks/useFormatQueryData/`.
7. **Every array item must have an `id` field** generated with `slugify` from `src/utils/format/slugify.ts` — derived from a stable, human-readable field (e.g. title, name, badge). Never use array index alone as a key.

```ts
import slugify from '@/utils/format/slugify'

const SERVICES_DATA =
  PAGE.services?.map((s) => ({
    id: slugify(s?.title!), // ← stable, readable key
    title: s?.title!,
    description: s?.description!,
  }))! || []
```

---

## ACF & WordPress Content Principles

This project's WordPress/ACF backend code lives in `wordpress/` at the repo
root (separate from the Gatsby frontend in `src/`) — currently
`wordpress/solein-studio.php`, a procedural file hooked into `acf/init`,
mirroring the structure of a typical client theme/plugin functions file.

### The hook is the field spec

A page's `useFormatQueryData` hook (in its **static-object** form, before a
GraphQL query exists) already defines the exact shape the CMS needs to
produce. When writing ACF fields for a page:

- Every top-level key in the hook's returned `*_DATA` object → one ACF field
  (or a group of fields under a tab).
- Every array → an ACF **repeater** field, with one sub-field per key in the
  array's item shape.
- Every nested object inside an array item → repeater sub-fields (one level
  of nesting is normal; avoid going deeper than two levels — if a shape
  needs that, it's a sign the inner shape should be its own CPT instead).

### Choosing CPT vs. repeater vs. options page

| Data shape | Use |
| --- | --- |
| Items with their own identity/detail page, or reused across more than one page's hook (e.g. `EVENTS` reused by `wydarzenia.tsx` + the event detail template; rooms reused by `home.tsx` + `nasze-sale.tsx` + the room detail template) | **Custom Post Type** (e.g. `Wydarzenie`, `Sala`) |
| Content scoped to exactly one page, with no detail page of its own (FAQ items, pricing plan rows, possibility cards) | **Repeater field** on that page's own field group |
| Site-wide facts with no detail page, referenced from more than one hook (contact info, social links, shared pricing tables, the studio equipment list) | **ACF Options Page** (`Ustawienia Globalne`) |

When in doubt, check whether the *same* constant (in `src/constants/*.ts`)
or prop shape is imported by more than one hook — that's the signal it
belongs on a CPT or the options page rather than being duplicated per page.

### CPT-driven pages use `gatsby-node.ts`, not static files under `src/pages/`

Once content is a CPT (`Sala`, `Wydarzenie`, `Lokalizacja`, `Mozliwosc` —
the post types that show up in WP's left-hand admin menu), its pages are
generated dynamically, one per post, instead of hand-written as
`src/pages/nasze-sale/sala-wschod.tsx`-style files per known slug. Adding a
new WP post must produce a working page with **zero code changes** — that's
the whole point of it being a CPT rather than a repeater.

The pattern (adapted from a reference project, kept in `create/pages/`):

1. `gatsby-node.ts`'s `createPages` API runs one GraphQL query fetching
   just the `slug` of every node across all CPTs, then calls
   `createCustomPages` from `create/pages/index.ts`.
2. `create/pages/index.ts` delegates to one `create{X}Pages` function per
   CPT (`sala.ts`, `wydarzenie.ts`, `lokalizacja.ts`, `mozliwosc.ts`).
3. Each of those loops over its nodes and calls `actions.createPage({ path, component: path.resolve('./src/templates/X.tsx'), context: { slug: node.slug } })`.
   Only the `slug` goes into `context` — not the full node data.
4. The template in `src/templates/X.tsx` has its **own** `query($slug: String)`
   GraphQL query (using the `$slug` from page context) and calls
   `useFormatQueryData(data)` exactly like a static page does. This keeps
   every page — static or CPT-generated — on the same hook+query
   convention; only how the page's route gets created differs.
5. The hook behind a CPT template (e.g. `useFormatQueryData/sala.tsx`) is
   **generic** — one hook serves every post of that type, not one hook per
   known slug. Seed strings for placeholder data (`pickFromSeed`) must be
   derived from the real queried slug/title, never a hardcoded string,
   since the same hook now runs for posts that don't exist yet at
   write-time.

### Nav/Footer link lists that enumerate a CPT are fetched live, not hardcoded

Anywhere the UI lists "all posts of a CPT" — the `Navigation` organism's
"Nasze sale" dropdown, the `Footer`'s "Możliwości wydarzeń" and location
links — that list is fetched with `useStaticQuery` inside the component
(see `Navigation.tsx`, `Footer.tsx`), not a hardcoded array in
`*.constants.ts`. The constants file keeps only what's genuinely static
(labels, non-CPT links); anything that should grow when an editor adds a
new WP post is queried live so it appears without a deploy.

### Don't add a manual `id`/`slug` field

WordPress's own post slug is the canonical identifier — mirror the existing
TS code, where `EventRecord.id` already doubles as the URL slug. Pull it via
the post's `slug` in the GraphQL query; never add a redundant ACF text field
for it. The same applies to repeater rows: `useFormatQueryData` already
regenerates a stable `id` with `slugify(...)` from whichever field is the
natural human-readable label (see the CMS example above) — don't store an
id in ACF for repeater rows either.

### Naming & GraphQL exposure

- Prefix every CPT slug and options-page menu slug with `{$client_key}_`
  (e.g. `soleil_studio_wydarzenie`) to avoid collisions with other
  plugins/themes — same convention as the reference snippet this file grew
  from.
- Every CPT, options page, and `acf_add_local_field_group()` call must set
  `show_in_graphql => true` plus an explicit `graphql_field_name` (or
  `graphql_single_name`/`graphql_plural_name` for post types) written in
  **camelCase** — that's the name `gatsby-source-wordpress` will actually
  expose on `Queries.*`, so write it the way you'd want to read it in a hook
  (`cmsData.page.cennikFields.heading`), not the PHP snake_case `name`.
- Image/gallery fields use `'return_format' => 'id'`, not `'url'` or
  `'array'` — that's what lets WPGraphQL for ACF resolve a real
  `MediaItem` (with `srcSet`, alt text, etc.) instead of a bare string.

### CTA buttons use one ACF `link` field, not a label/url pair

Every `ctaLabel`/`ctaTo` pair in the TS props maps to **one** ACF field of
type `link` (`ssx_cta_link_field()` in `wordpress/solein-studio.php`), not
two separate fields (a `text` label + a `page_link`/`url`). A `link` field
bundles `{title, url, target}` in one value and its picker handles both
internal pages and external URLs — which matters because CTAs in this
project point to both (most go to other pages, but `Instagram`/the booking
iframe go to a full URL), and splitting label+url into two fields meant
silently switching field types (`page_link` for internal, `url` for
external) depending on the target. One field type now covers every case.

This changes the GraphQL shape on the consuming end: a CTA arrives as one
nested field (`cta.title`, `cta.url`, `cta.target`) instead of two flat
strings (`ctaLabel`, `ctaUrl`). When migrating a hook from static to
CMS-backed, map `cmsData...cta?.title` / `cmsData...cta?.url` into the
existing flat `ctaLabel`/`ctaTo` prop shape inside the hook — the organism
itself never needs to know the CMS field was nested.

### Hard WordPress length limits — don't prefix CPT/taxonomy names with `$client_key`

`register_post_type()` silently fails (no error, the CPT just never
registers) if its name exceeds **20 characters**; `register_taxonomy()`
caps at **32**. `{$client_key}_wydarzenie` alone is already 24 — too long
the moment any client slug is more than a few characters. This is exactly
how the `Wydarzenie` CPT went missing from the admin menu while `Sala`
(under the limit) worked fine, with no error anywhere to point at it.

Give CPT/taxonomy *names* (the string passed to `register_post_type`/
`register_taxonomy`, not their labels, rewrite slugs, or GraphQL names —
none of which have this limit) their own short prefix instead, e.g. `ssx_`
in `wordpress/solein-studio.php` (`ssx_wydarzenie`, `ssx_sala`,
`ssx_wydarzenie_typ`). `$client_key` stays in use for the options page menu
slug and every field group's `graphql_field_name`, since neither has a
length cap. When adding a new CPT/taxonomy, count the registered name's
characters before testing in wp-admin — a CPT that doesn't appear after
activating is the first thing to suspect.

### Verify `menu_icon` against the real Dashicons list

An invalid `dashicons-*` class (one that isn't in WordPress's actual
Dashicons set) doesn't error either — the menu item just renders with no
icon. `dashicons-door-open` doesn't exist and was silently dropped for the
`Sala` CPT; `dashicons-store` (confirmed from this project's own reference
snippet) does. Cross-check any new icon name against
https://developer.wordpress.org/resource/dashicons/ before using it,
rather than guessing a plausible-sounding class name.

### Page-level field groups: `location` for wp-admin, `graphql_types` for the schema

Each page-level group is scoped in `wp-admin` via `location`: `post_type ==
page` AND `page_template == "{slug}.php"`, matching the virtual page
template registered in `theme_page_templates`. This is what makes the
"Cennik" field group show up *only* on the page whose Page Attributes →
Template is set to "Cennik", etc. — exactly what an editor expects.

WPGraphQL for ACF, however, infers a field group's GraphQL type from
`location` too, and only knows how to do that for a *plain* `post_type`
rule — the moment a `page_template` condition is ANDed alongside it, the
plugin gives up on the mapping entirely (confirmed by testing live: the
group vanished from `WpPage`'s `*Fields` key the instant `page_template`
was added, while ACF's own admin UI matched the combined rule correctly
the whole time). Dropping `page_template` "fixed" GraphQL exposure at the
cost of every one of these 8 groups appearing on *every* Page's edit
screen — pure wp-admin clutter, since the frontend was always correct
(each Gatsby template selects its own field group by name from whichever
`wpPage` it queries by slug).

The real fix is `graphql_types`: an explicit, separate setting that tells
WPGraphQL for ACF which GraphQL type(s) to expose a group on, independent
of whatever `location` says. `location` stays precise (admin scoping via
`page_template` is restored); `graphql_types => ['Page']` makes the
mapping to the `Page` GraphQL type explicit instead of inferred, so the
group reaches the schema regardless of how complex `location` is:

```php
$page_location = function ($template) {
    return array(
        array(
            array('param' => 'post_type', 'operator' => '==', 'value' => 'page'),
            array('param' => 'page_template', 'operator' => '==', 'value' => $template),
        ),
    );
};
$page_graphql_types = array('Page');

acf_add_local_field_group(array(
    'graphql_field_name' => 'cennikFields',
    'show_in_graphql'    => true,
    'graphql_types'      => $page_graphql_types,
    'location'           => $page_location("{$client_key}-cennik.php"),
    // ...
));
```

When adding a field group whose `location` rule WPGraphQL for ACF can't
cleanly infer from (anything beyond a single `post_type`/CPT rule — a
page template, a specific post, a taxonomy term, etc.), set `graphql_types`
explicitly rather than simplifying the `location` rule to work around it.

### Every ACF field `name` must be unique across all field groups sharing a parent type — no exceptions

Multiple field groups attached to the same parent (the 8 page-level groups
all on `Page` via `graphql_types`, or the 4 options-page groups all on
`UstawieniaGlobalne`) **must never reuse a field `name`** between them, for
two distinct reasons depending on the field type:

**1. Top-level scalar/text/link fields — a real data-corruption bug, not just a GraphQL quirk.**
ACF stores a *top-level* field's value as plain WordPress postmeta keyed
by the field's bare `name`, with no namespacing by which field group
declared it. `eyebrow`/`heading`/`lead` were originally declared bare on
6–7 of the 8 page-level groups (Cennik, FAQ, Galeria, Kontakt, NaszeSale,
Wydarzenia, Rezerwacja) — meaning, on any given Page post, ALL of those
groups' same-named field read/write the *exact same* postmeta row.
Confirmed live: the real "Kontakt" page's `kontaktFields.eyebrow`/
`.heading` returned "Nasze sale" / "Dwa wnętrza, jedno słońce" — literally
the Nasze Sale page's copy — straight from WPGraphQL with no Gatsby
involved, because at some point a same-named field box for a different
group was visible and saved on that same post (most likely while the
admin-clutter state — see below — had every group's identically-named
field visible on every page at once). **Fix: every formerly-bare field
(`eyebrow`, `heading`, `lead`, etc.) on every page-level group is now
prefixed per page** (`faq_eyebrow`, `kontakt_heading`, `cennik_lead`, ...),
matching what Home and the original Cennik fields already did correctly
(`rooms_eyebrow`, `addons_heading`, ...). Renaming changes the postmeta
key, so already-filled-in content needs re-entering once a renamed field
ships.

**2. Nested `group`/`repeater` fields — a `gatsby-source-wordpress` sourcing bug.**
`ssx_cta_banner_fields()` is shared by Home, FAQ and the `Mozliwosc` CPT's
"CTA Banner" block, originally named `cta_banner` at all three call
sites — Home's and FAQ's `ctaBanner.heading`/`.text`/`.cta` came back
`null` through **Gatsby** (while `fieldGroupName` on the same object
resolved fine, and WPGraphQL itself returned the real saved values when
queried directly) because `gatsby-source-wordpress` gets confused
resolving values for two same-named, same-shaped nested groups that are
siblings on one parent type — even though their GraphQL type names were
already distinct (`WpPage_Homefields_CtaBanner` vs
`WpPage_Faqfields_CtaBanner`). `Mozliwosc`'s identical block sourced fine
the whole time, since `Mozliwosc` doesn't share a parent type with
anything. Fixed the same way: `home_cta_banner` / `faq_cta_banner` /
`mozliwosc_cta_banner` (the third wasn't actively broken, renamed anyway
since it's free insurance).

**Rule going forward, for every field — scalar or grouped:** give every
field's own `name` a call-site-specific prefix the moment it's declared on
a field group that shares (or could ever share) a parent type with
another group — never the bare name a shared helper's docblock suggests,
and never "no collision today so it's fine." Two groups only need to be
**registered** with the same `graphql_types`/parent type for the
top-level-field bug to bite; nothing about their `location` rules needs
to overlap, and nothing needs to be queried together in the same request.
Before adding any new field or shared-helper call site, check: does any
other field group already attached to this same parent type use this
exact `name`? If yes, or it's ambiguous, name it uniquely. This applies
equally to the **options page** group (`group_ssx_options_kontakt`,
`group_ssx_options_social`, `group_ssx_options_cennik`,
`group_ssx_options_equipment` — four groups sharing one parent type,
`UstawieniaGlobalne`) — audited as of this writing with no collisions
(`links`, `categories`, `pojedyncza_sala`, `cale_studio`, ... are all
unique across the four) — and to any future CPT/options group that ends
up sharing a parent type with another.

### Keep structural copy out of ACF

Only fields whose value genuinely differs per page/post belong in ACF —
the same "no hardcoded strings" spirit as the frontend, but it cuts both
ways. Repeated UI labels that never vary by content (`"W cenie"`,
`"Wszystko, czego potrzebujesz"`, aria-label strings) stay hardcoded in the
React component, exactly like today. Don't manufacture an ACF field just
because a hook happens to have a key for it — check whether the value is
the same across every page/post before deciding it's editorial content.

### Migrating a hook from static to CMS-backed

Don't delete a hook's static fallback object when you add the matching ACF
fields — follow the existing "When a page has a GraphQL query" pattern:
the hook starts accepting `cmsData`, and maps ACF fields into the same prop
shape the static version already produced. The organism never needs to
change.

---

## Page Template Structure

```tsx
// src/pages/page-name.tsx

const PageName: React.FC<PageProps<Queries.PageNameQuery>> = ({ data }) => {
  const { HERO_DATA, SERVICES_DATA } = useFormatQueryData(data) // or useFormatQueryData() for static

  return (
    <Layout>
      <Seo {...formatSeoData(data.page?.seo)} />

      <Hero {...HERO_DATA} />

      <LazyLoad once offset={200} height={1200}>
        <Suspense fallback={<div />}>
          <Services {...SERVICES_DATA} />
        </Suspense>
      </LazyLoad>
    </Layout>
  )
}

export default PageName

// GraphQL query at the bottom (omit entirely for static pages)
export const query = graphql`
  query PageName {
    page: wpPage(slug: { eq: "slug" }) {
      seo { ...WpSEO }
      AcfGroup { heroHeading ... }
    }
  }
`
```

Use `<LazyLoad once offset={200}>` + `React.lazy` / `Suspense` for every section below the fold.

---

## SEO & Metadata

### Seo Component

Place `<Seo>` as the first child inside `<Layout>` on every page:

```tsx
<Seo
  title="Page Title | Radiant Reach"
  description="..."
  ogTitle="..."
  ogDescription="..."
  ogImage="https://..."
  twitterTitle="..."
  twitterImage="https://..."
  robots="index, follow" // default from env: GATSBY_ROBOTS
/>
```

### From CMS

Transform WordPress Yoast SEO fields with `formatSeoData` from `src/hooks/seo.ts`:

```tsx
import { formatSeoData } from '@/hooks/seo'

const PAGE_SEO = data.page?.seo

const SEO = formatSeoData(PAGE_SEO)

<Seo {...SEO} />
```

### For static pages

```tsx
<Seo
  title="Automatyzacja Biznesu | Radiant Reach"
  description="Automatyzujemy procesy sprzedażowe..."
/>
```

### Rules

- Every page must have a unique `title` and `description`.
- `robots` defaults to `env.GATSBY_ROBOTS` — override per-page only when explicitly required.
- OG and Twitter tags always fall back to `title` / `description` if not provided.

---

## TypeScript Conventions

- **Component props** are defined as `export type ComponentNameProps = { ... }` in the component file or in `src/types/domain.ts` / `src/types/page.ts` for shared types.
- **Use `satisfies` not `as`** for type assertion — it preserves the inferred type while checking against the target.
- **Transient styled props** use `$` prefix. Use the `Transienty<T>` utility to convert a props interface.
- **Breakpoint-aware props** use the `BreakpointValue<T>` utility: `gap: BreakpointValue<string>`.
- Non-null assertions (`!`) are allowed only inside `useFormatQueryData` where CMS fields are known to exist. Avoid elsewhere.
- Do not use `any`. Use `unknown` and narrow where needed.

---

## Styling Rules

- Styles shared across a component (or reused elsewhere) live in `ComponentName.style.ts` (or `.styles.ts`), imported via named exports (e.g. `import { Wrapper, InnerWrapper } from './ComponentName.style'`).
- Small, component-local styled components (e.g. a single `Flex` wrapper) may be defined inline in the `.tsx` file rather than extracted.
- Use `polished`'s `rem()` via the `pxToRem` utility from `src/styles/mixins.ts` — no raw `px` for spacing.
- Global keyframes (`fadeUp`, `softPulse`) live in `src/animations/animations.ts`.
- Use `generatePropMedia` from `src/utils/styled.ts` for breakpoint-responsive CSS values:

```ts
${({ theme, $gap }) => generatePropMedia(theme, $gap, v => css`gap: ${v};`)}
```

---

## State Management

- **UI state** (modal open/close, transition refs): Jotai atom in `src/store/`.
- **Server state** (CMS data): Gatsby GraphQL query in the page file, or standalone hook in `src/hooks/cms/`.
- **Form state**: react-hook-form — never useState for form fields.
- No Redux. No React Context for UI state.

---

## Forms

Define a Zod schema first, derive the TypeScript type from it, then pass to react-hook-form:

```ts
const schema = z.object({
  email: z.string().email('Nieprawidłowy email'),
  message: z.string().min(10, 'Minimum 10 znaków'),
})
type FormData = z.infer<typeof schema>

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(schema),
})
```

Use the `<Field>` molecule (not raw `<input>`) — it renders the label, input, and error text together.

---

## Animations

- Page entrance (door animation): `src/animations/enterAnimation.ts` — triggered once by the Layout.
- Text reveal on scroll: use `<AnimatedText>` molecule — never call `slice_in` directly in section code.
- Image reveal on scroll: use `<AnimatedImage>` molecule.
- Custom GSAP timelines: write in `src/animations/` as standalone functions, not inside components.
- Always use `useGSAP` hook and wrap callbacks in `contextSafe()` to prevent cleanup issues.

---

## Images

```tsx
// Gatsby image (from CMS or imported file):
<Image src={gatsbyImageData} alt="description" objectFit="cover" />

// Art direction (different image on mobile):
<Image src={desktopImage} srcMobile={mobileImage} alt="description" />

// Lazy loading behavior:
<Image loading="eager" />  // Hero / above fold only
<Image loading="lazy" />   // Everything else (default)
```

Never use raw `<img>` tags for content images — always use the `<Image>` atom.

---

## Links & Navigation

Use the `<Link>` atom — it auto-detects internal vs. external and applies i18n locale prefix:

```tsx
<Link to="/kontakt">Contact</Link>       // internal → Gatsby Link
<Link to="https://...">External</Link>   // external → <a target="_blank" rel="noopener">
```

Use `ArrowButton` for CTA links with visual arrow treatment. Use `Button` for form submits.

---

## Google Tag Manager

GTM events are fired via utilities in `src/utils/gtm.ts`. Push events with:

```ts
import { sendGtmEvent } from 'utils/gtm'

sendGtmEvent({ event: 'form_submit', form_name: 'contact' })
```

Do not access `window.dataLayer` directly from components — always go through `sendGtmEvent`.

---

## Verification

Do not verify UI changes by starting the Gatsby dev server and taking Playwright/browser screenshots. Rely on `eslint` and `tsc --noEmit` for correctness, and let the user check the visual result themselves. Only spin up a dev server / browser verification loop if the user explicitly asks for it.

---

## Landing Page Checklist

When adding a new landing page:

- [ ] Create `src/pages/slug.tsx` using `<Layout_Landing>` (not `<Layout>`).
- [ ] Create `src/hooks/useFormatQueryData/slug.ts` with all static content.
- [ ] Add `<Seo>` with unique title and description.
- [ ] Each section gets `Wrapper` / `InnerWrapper` from its own `*.style.ts`.
- [ ] Sections below the fold are wrapped in `<LazyLoad once offset={200}>`.
- [ ] Alternating service sections use `reverse={i % 2 === 1}` prop.
- [ ] No raw hardcoded strings in JSX — all content comes from `useFormatQueryData`.
