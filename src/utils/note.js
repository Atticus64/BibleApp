import { createAlert } from "@/services/alert"
import { user } from "@/state/user"

/**
 *
 * @param {boolean} loggedIn
 * @param {string} body
 * @param {string} title
 * @param {string} description
 */
export function isValidNote(loggedIn, body, title, description) {
  if (!loggedIn) {
    createAlert('Necesitas estar autenticado para crear notas', 'error')
    return false
  }

  if (body.length < 20) {
    createAlert('El texto debe ser mayor o igual a 20 caracteres', 'error')
    return false
  }

  if (title.length < 8) {
    createAlert('El titulo debe ser mayor o igual a 8 caracteres', 'error')
    return false
  }

  if (title.length > 40) {
    createAlert('El titulo debe ser menor a 40 caracteres', 'error')
    return false
  }

  if (description.length < 10) {
    createAlert('La descripcion debe ser mayor a 10 caracteres', 'error')
    return false
  }

  return true
}

/**
 * @typedef Data
 * @property {string} title
 * @property {string} body
 * @property {string} description
 */

/**
   * @param {{
   *     title: string
   *     body: string
   *     description: string
   *     id: string
   * }} draft
   * @param {import('@/state/user').User} user
   * @returns {Promise<Data | null>}
   */
async function createFormNote(user, draft) {

  if (!isValidNote(user.loggedIn, draft.body, draft.title, draft.description)) {
    return null
  }

  const formData = {
    title: draft.title,
    body: draft.body,
    description: draft.description
  }

  return formData
}