
/**
 *
 * @param {string} message
 * @param {'error'|'loading'|'success'|'normal'} type
 */
export const toastAlert = async (message, type) => {
	const { toast } = await import('wc-toast')

	if (type === 'error') {
		toast.error(message)
		return
	}

	if (type === 'loading') {
		toast.loading(message)
		return
	}

	if (type === 'success') {
		toast.success(message)
		return
	}

	if (type === 'normal') {
		toast(message)
	}
}
