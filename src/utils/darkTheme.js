export function isDarkTheme() {
  const theme = localStorage.getItem('dark')

  return theme === 'dark' ||
  (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
}
