import { writable } from 'svelte/store'

/** @type {import("svelte/store").Writable<NoteDraft>} */
export const draft = writable({
  title: '',
  description: '',
  body: '',
  id: ''
})

export const studyMode = writable(false)

/**
 * @typedef NoteDraft
 * @property {string} title
 * @property {string} description
 * @property {string} body
 * @property {string} id
 */
