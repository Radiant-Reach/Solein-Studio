export const formatPrice = (price: number) =>
  `${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const formatDecimal = (number: number, decimals = 2) =>
  number.toFixed(decimals)
