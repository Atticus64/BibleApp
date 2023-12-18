import { createAlert } from '@/services/alert'
import { writable } from 'svelte/store'

/**
 * @typedef Note
 * @property {string} title
 * @property {string} description
 * @property {string} id
 * @property {string} body
 */

/**
 * @typedef {import("svelte/store").Writable<Note[]>} Notes
 */

/**
 * @type {Notes}
 */
export const notes = writable([])

/**
 * @param {string} id
 * @param {{ [k: string]: FormDataEntryValue }} formData
 */
export async function sendNoteToUpdate(id, formData) {
  const res = await fetch(`https://bible-api.deno.dev/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(formData)
  })

  if (!res.ok) {
    createAlert('No se pudo guardar la nota', 'error')
    return
  }

  createAlert('Nota actualizada', 'success')
}

/**
 * @param {{ [k: string]: FormDataEntryValue }} formData
 * @returns {Promise<Response>}
 */
export async function sendCreateNote(formData) {
  const response = await fetch('https://bible-api.deno.dev/notes/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(formData)
  })

  if (!response.ok) {
    createAlert('No se pudo crear la nota', 'error')
    return response
  }

  createAlert('Nota creada', 'success')

  return response
}
