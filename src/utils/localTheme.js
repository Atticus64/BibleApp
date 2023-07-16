
export function getLocalThemeIsDark() {
	if (
		localStorage.theme === 'dark' ||
		(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		return true;
	} else {
		return false;
	}
}