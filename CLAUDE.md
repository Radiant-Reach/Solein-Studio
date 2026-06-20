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
