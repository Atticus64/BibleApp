<script>
  import { darkTheme } from '@/state/config.svelte.js'

  let { className = '' } = $props()
  let darkMode = $state(false)

  function handleSwitchDarkMode() {
    darkMode = !darkTheme.value
    darkTheme.value = darkMode

    localStorage.setItem('theme', darkMode ? 'dark' : 'light')

    darkMode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
  }
</script>

<div class={className}>
  <input
    checked={darkTheme.value}
    onclick={handleSwitchDarkMode}
    type="checkbox"
    id="theme-toggle"
  />
  <label for="theme-toggle" class={className}></label>
</div>

<style lang="postcss">
  #theme-toggle {
    @apply invisible;
  }

  #theme-toggle + label {
    @apply absolute h-9 w-9 cursor-pointer rounded-full duration-300 content-[''];
  }

  #theme-toggle:not(:checked) + label {
    @apply bg-amber-400;
  }

  #theme-toggle:checked + label {
    @apply bg-transparent;
    box-shadow: inset -18px -16px 1px 1px #ddd;
  }
</style>
