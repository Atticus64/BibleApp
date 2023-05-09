
export const ALERT_TYPES = {
  ERROR: 'error',
  LOADING: 'loading',
  SUCCESS: 'success',
  NORMAL: 'normal'
}

/**
 *
 * @param {string} message
 * @param {string} type
 */
export const toastAlert = async (message, type) => {
  const { toast } = await import('wc-toast')

  if (type === ALERT_TYPES.ERROR) {
    toast.error(message)
    return
  }

  if (type === ALERT_TYPES.LOADING) {
    toast.loading(message)
    return
  }

  if (type === ALERT_TYPES.SUCCESS) {
    toast.success(message)
    return
  }

  if (type === ALERT_TYPES.NORMAL) {
    toast(message)
  }
}
