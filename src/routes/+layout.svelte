<script>
  import Navbar from '@/components/Navbar.svelte'
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import '@/app.css'
  import { darkTheme } from '@/state/config'

  export const checkMode = () => {
    if (browser) {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
        darkTheme.set(true)
      } else {
        document.documentElement.classList.remove('dark')
        darkTheme.set(false)
      }
    }
  }

  onMount(() => checkMode())
</script>

<div class="theme-transition flex max-w-[100vw] flex-col justify-between transition-colors">
  <Navbar />

  <main class="mx-auto flex w-full max-w-screen-xl flex-col p-4">
    <slot />
  </main>
</div>

<style>
  .theme-transition {
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
</style>
