# CLAUDE.md Reality-Check Notes

Findings from building the `Navigation` organism (2026-06-18) — things that
turned out to be wrong, missing, or out of sync between `CLAUDE.md` and the
actual codebase. Read this alongside `CLAUDE.md`; it isn't a replacement.

## Bugs found in shared utils (fixed)

- **`iterateBreakpoints` in `src/utils/styled.ts` looked up the wrong key.**
  It filtered on `` `$${breakpoint}` in breakpoints `` but then read the value
  via `breakpoints[breakpoint]` (no `$`), which is always `undefined` since
  only `$`-prefixed props exist. This made every `<Hidden>` instance collapse
  to `display: none` regardless of props, and broke `Text`'s responsive
  `$base/$md/...` css overrides the same way. Fixed to read
  `breakpoints[`$${breakpoint}`]`. If `<Hidden>` or breakpoint-responsive
  `<Text>` props ever look like they're "not working", this is the first
  place to check that the fix wasn't reverted.
- **`scrollLockAtom` was imported by `src/hooks/useScrollLock.ts` but never
  exported from `src/store/index.ts`.** The hook was dead/unusable until a
  real consumer (the Navigation mobile menu) tried to use it. Added the atom.
- **`src/utils/slugify.ts` imports the `slugify` npm package, but it was
  never declared in `package.json` dependencies.** It only worked because
  some other package transitively installed it. Added `"slugify": "^1.6.6"`
  to dependencies — it's a real, used dependency now.

## CLAUDE.md sections that don't match the actual code

- **Typography scale values.** CLAUDE.md's table says `H100` (20px) →
  `H900` (105px). Actual scale in `Typography.style.ts` is `H100` (12px) →
  `H1000` (80px) — different numbers and an extra `H1000` step not in the doc.
- **Import alias.** CLAUDE.md examples use `@/utils/format/slugify` style
  imports. There is no `@/` alias configured. `tsconfig.json` sets
  `baseUrl: "src"`, so real imports are bare module-style, e.g.
  `import slugify from 'utils/slugify'`, `import { Link } from
  'components/atoms/Link'`.
- **`slugify.ts` location.** CLAUDE.md says `src/utils/format/slugify.ts`.
  The real file is `src/utils/slugify.ts` (the `format/` folder only holds
  `formatDate.ts` and `formatNumbers.ts`).

## Minor additive change made

- `components/atoms/Link/Link.tsx`'s `LinkProps` didn't expose
  `activeClassName`, `partiallyActive`, or `onClick`, even though the
  underlying `GatsbyLink`/`LocalizedLink` already support them at runtime via
  the `{...props}` passthrough. Added them to the type so active-link
  styling (`&.active`) can be done the idiomatic Gatsby way instead of
  hand-rolling pathname tracking. No behavior change for existing usages.
