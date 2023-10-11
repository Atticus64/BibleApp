import { user } from '@/state/user'
import { API_BASE_URL } from '@/utils/consts'
import { createAlert } from '@/services/alert'

/**
 * @param {any} data
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
        return
      }

      createAlert(error.message, 'error')
    }

    const message = error.issues
      ? `Error en el campo ${error.issues[0].path[0]}`
      : 'Error al autenticarse'
    createAlert(message, 'error')
  }
}

export async function signOut () {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })

  user.set({
    tag: '',
    email: '',
    loggedIn: false
  })
}

export async function updateUserInfo () {
  try {
    const res = await fetch(`${API_BASE_URL}/user`, {
      credentials: 'include'
    })

    if (res.ok) {
      const info = await res.json()
      user.set({
        tag: info.tag,
        loggedIn: true,
        email: info.email
      })
    }
  } catch (error) {
    console.error(error)
  }
}
