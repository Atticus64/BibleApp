<script>
  import { page } from '$app/state'
  import { resolve } from '$app/paths'

  let { href, text, children } = $props()
</script>

<li class="link" aria-current={page.url.pathname === resolve(href) ? 'page' : null}>
  <a
    href={resolve(href)}
    class="flex items-center text-lg font-semibold tracking-widest transition-colors hover:text-[#7faddb] dark:font-normal dark:hover:text-[#7faddb]"
  >
    <span class={page.url.pathname === resolve(href) ? 'text-black dark:text-white' : ''}
      >{text}</span
    >
    {@render children()}
  </a>
</li>

<style lang="postcss">
  .link[aria-current='page'] > a {
    color: #6f8fc1;
  }

  .link {
    list-style-type: none;
  }
</style>
