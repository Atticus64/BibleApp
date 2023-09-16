import { isDarkTheme } from '@/utils/darkTheme'

/**
 * @param {string} message
 * @param {'error'|'loading'|'success'|'normal'=} type
 * @param {number=} duration
 */
export async function createAlert (message, type = 'normal', duration = 2000) {
  const { toast } = await import('wc-toast')
  const types = ['error', 'loading', 'success']
  /** @type {{ type: 'dark'|'light'|'custom'|undefined }} */
  const theme = { type: isDarkTheme() ? 'dark' : 'light' }

  if (types.includes(type)) {
    // @ts-ignore
    toast[type](message, { theme, duration })
    return
  }

  toast(message, { theme, duration })
}
