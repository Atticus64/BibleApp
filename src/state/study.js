import { writable } from 'svelte/store'

/**
 * @typedef NoteDraft
 * @property {string} title
 * @property {string} description
 * @property {string} body
 * @property {string} id
 */

/**
 * @type {import("svelte/store").Writable<NoteDraft>}
 */
export const Draft = writable({
  title: '',
  description: '',
  body: '',
  id: ''
})

export const studyMode = writable(false)
