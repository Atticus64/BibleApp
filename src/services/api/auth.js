import { user } from '@/state/user'
import { API_BASE_URL } from '@/constants'
import { createAlert } from '@/services/alert'

/**
 * @param {any} data
 * @returns {Promise<Response>}
*/
export async function singIn(data) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()

    if (error.message) {
      if (error.message.includes('User not found')) {
        createAlert('El usuario no existe, registrese primero', 'error')
        return response
      }

      createAlert(error.message, 'error')
    }

    const message = error.issues
      ? `Error en el campo ${error.issues[0].path[0]}`
      : 'Error al autenticarse'
    createAlert(message, 'error')
  }

  /**
   * @type {usrDat}
   */
  const usr = await response.json()

  if (usr) {
    const userInfo = {
      tag: usr.user,
      email: usr.email,
      loggedIn: true
    }

    user.set({
      email: usr.email,
      tag: usr.user,
      loggedIn: true
    })

    localStorage.setItem('user', JSON.stringify(userInfo))
  }

  return response
}

/**
 * @typedef usrDat {
 * @property {string} user
 * @property {string} email
 * @property {boolean} loggedIn
 * } 
 */
/**
 * 
 *
 * @param {string} book
 * @returns {Promise<{
 *     name: string
 *     abrev: string
 *     chapters: number
 *     testament: string
 * }| undefined>}
 */
export async function getInfoBook(book) {
  const resp = await fetch(`${API_BASE_URL}/api/book/${book}`)

  if (!resp.ok) {
    return
  }

  const info = await resp.json()

  return info
}

/**
 * @param {any} data
 * @returns {Promise<Response>}
*/
export async function singUp(data) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()

    if (error.message) {
      if (error.message.includes('User')) {
        createAlert('El usuario ya existe, cambie el email or username', 'error')
        return response
      }

      createAlert(error.message, 'error')
    }

    const message = error.issues
      ? `Error en el campo ${error.issues[0].path[0]}`
      : 'Error al autenticarse'
    createAlert(message, 'error')
  }


  /** @type {usrDat} */
  const usrData = await response.json()

  user.set({
    tag: usrData.user,
    email: usrData.email,
    loggedIn: true
  })

  const info = {
    tag: usrData.user,
    email: usrData.email,
    loggedIn: true
  }

  localStorage.setItem('user', JSON.stringify(info))

  return response
}

export async function signOut() {

  try {
    const resp = await fetch(`${API_BASE_URL}/auth/logout`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })

    user.set({
      tag: '',
      email: '',
      loggedIn: false
    })

    localStorage.removeItem('user')
    if (!resp.ok) {
      return null
    }

  } catch (error) {
    console.error(error)
  }
}

export async function updateUserInfo() {
  try {

    const local = localStorage.getItem('user')
    const existLocal = local !== null
    if (existLocal) {

      /**
       * @type {import('@/state/user').User}
       */
      const usr = JSON.parse(local)


      return usr
    }

  } catch (error) {
    console.error(error)
    return null
  }
}
