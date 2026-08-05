<script>
  const COLOR = {
    blue: 'dark:bg-[#4267b3] dark:hover:bg-[#6092d1] bg-[#a8cae8] hover:bg-[#7faddb] dark:text-white text-black transition-colors',
    teal: 'bg-teal-200 hover:bg-teal-400 text-black transition-colors',
    green:
      'bg-[#c5ecdd] transition-shadow border border-gray-300 hover:shadow-md hover:border-transparent'
  }

  let {
    href = undefined,
    type = 'button',
    disabled = false,
    color = 'teal',
    className = undefined,
    children,
    ...restProps
  } = $props()

  /**
   * @param {string} c
   */
  function colorClass(c) {
    return COLOR[/** @type {keyof typeof COLOR} */ (c)]
  }
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  class="flex h-12 w-fit items-center justify-center rounded-lg p-3 {colorClass(color)} {className}"
  type={href ? undefined : type}
  {disabled}
  {href}
  {...restProps}
>
  {@render children()}
</svelte:element>

<style>
  :disabled {
    border: 1px solid #cccccc;
    color: white;
    background-color: #02678c;
  }

  :disabled:hover {
    color: white;
    border: 1px solid #cccccc;
    background-color: #02678c;
  }
</style>
