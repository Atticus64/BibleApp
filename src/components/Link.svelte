<script>
  import { page } from '$app/stores'

  /**
   * @type {string}
   */
  export let href

  /**
   * @type {string}
   */
  export let text
</script>

<li class="link" aria-current={$page.url.pathname === href ? 'page' : null}>
  <a
    {href}
    class="flex items-center text-lg font-semibold tracking-widest transition-colors hover:text-[#175d93] dark:font-normal dark:hover:text-[#2b8ad3]"
  >
    <span class={$page.url.pathname === href ? 'text-black dark:text-white' : ''}>{text}</span>
    <slot />
  </a>
</li>

<style lang="postcss">
  .link[aria-current='page'] > a {
    color: #36aff0;
  }

  .link {
    list-style-type: none;
  }
</style>
