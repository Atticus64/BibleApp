import { API_BASE_URL } from '@/constants'
import { createAlert } from '@/services/alert'

/**
 * @typedef Note
 * @property {string} title
 * @property {string} description
 * @property {string} id
 * @property {string} body
 * @property {string | undefined} page
 */

/**
 * @type {{ value: Note[] }}
 */
export const notes = $state({ value: [] })

/**
 * @type {{ value: Note }}
 */
export const editableNote = $state({
  value: {
    body: '',
    description: '',
    title: '',
    id: '',
    page: ''
  }
})

export const editable = $state({ value: true })

/**
 * @param {string} id
 * @param {{ [k: string]: FormDataEntryValue }} formData
 */
export async function sendNoteToUpdate(id, formData) {
  const res = await fetch(`${API_BASE_URL}/notes/${id}`, {
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
  const response = await fetch(`${API_BASE_URL}/notes/create`, {
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

/**
 *
 * @param {string} id
 * @returns
 */
export async function getNote(id) {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  if (!response.ok) {
    createAlert('No se pudo encontrar la nota', 'error')
    return response
  }

  return response
}
