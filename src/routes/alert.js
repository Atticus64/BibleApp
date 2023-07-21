/**
 *
 * @param {string} message
 * @param {'error'|'loading'|'success'|'normal'} type
 * @param {boolean} isDarkMode
 */
export const toastAlert = async (message, type, isDarkMode) => {
  const { toast } = await import('wc-toast')

  const theme = isDarkMode ? 'dark' : 'light'
  if (type === 'error') {
    toast.error(message, {
      theme: {
        type: theme
      },
      duration: 2000
    })
    return
  }

  if (type === 'loading') {
    toast.loading(message, {
      theme: {
        type: theme
      },
      duration: 2000
    })
    return
  }

  if (type === 'success') {
    toast.success(message, {
      theme: {
        type: theme
      },
      duration: 2000
    })
    return
  }

  if (type === 'normal') {
    toast(message, {
      theme: {
        type: theme
      },
      duration: 2000
    })
  }
}
