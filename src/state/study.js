import { writable } from 'svelte/store'

/**
 * @typedef NoteDraft
 * @property {string} title
 * @property {string} description
 * @property {string} body
 */

/**
 * @type {import("svelte/store").Writable<NoteDraft>}
 */
export const Draft = writable({
  title: '',
  description: '',
  body: ''
})

export const studyMode = writable(false)
