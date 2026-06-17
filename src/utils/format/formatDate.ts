export function formatGTMDateToString(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pl-PL')
}
