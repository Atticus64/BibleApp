import { writable } from 'svelte/store'

export const darkTheme = writable(false)

export const fontSize = writable(16)

/**
 * 
 * @param {number} size 
 */
export function setFontSize(size) {
  fontSize.set(size)
  localStorage.setItem('fontSize', JSON.stringify(size))
}