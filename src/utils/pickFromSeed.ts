// Deterministic per-seed pick (not Math.random()) — useFormatQueryData hooks are
// memoized once, and Gatsby pre-renders pages at build time, so true randomness
// would pick a different value during SSR vs. client hydration and cause a
// mismatch/flash. Hashing a stable seed (e.g. an item's id) keeps the pick
// consistent while still varying across items.
export const pickFromSeed = <T extends string>(
  seed: string,
  options: readonly T[]
): T => {
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)

  return options[hash % options.length]
}
