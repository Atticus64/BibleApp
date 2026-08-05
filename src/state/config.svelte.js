export const darkTheme = $state({ value: false })

export const fontSize = $state({ value: 16 })

/**
 *
 * @param {number} size
 */
export function setFontSize(size) {
  fontSize.value = size
  localStorage.setItem('fontSize', JSON.stringify(size))
}
