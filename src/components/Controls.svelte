<script>
  import Button from './Button.svelte'
  import { page } from '$app/stores'
  import { clickOutside } from '@/utils/clickOutside'
  import { books, versions } from '@/constants'
  import { goto } from '$app/navigation'

  const { version, book, chapter } = $page.data.params

  let selectBook = false
  let selectChapter = false
  let selectVersion = false

  /** @type {number} */
  export let chapters

  /**
   * @param {string} book
   * @param {number} chapter
   * @param {string} version
   */
  function handleOnChange(book, chapter, version) {
    localStorage.setItem(
      'bookmark',
      JSON.stringify({
        version,
        chapter,
        book
      })
    )

    goto(`/chapter/${version}/${book}/${chapter}`)
  }
</script>

<div class="flex items-center gap-3">
  <div use:clickOutside on:click_outside={() => (selectVersion = false)}>
    <h4>Versión</h4>
    <Button
      className="w-12 dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
      on:click={() => (selectVersion = !selectVersion)}>{$page.data.params.version}</Button
    >

    {#if selectVersion}
      <ul
        class="absolute grid max-h-[20rem] overflow-auto rounded border border-gray-300 bg-gray-50"
      >
        {#each versions as version}
          <button
            class="select-none p-2 hover:bg-gray-200 dark:bg-[#1e293b] dark:hover:bg-[#445268]"
            on:click={() => handleOnChange(book, chapter, version.url)}
          >
            {version.name}
          </button>
        {/each}
      </ul>
    {/if}
  </div>

  <div use:clickOutside on:click_outside={() => (selectBook = false)}>
    <h4>Libro</h4>
    <Button
      className="w-12 dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
      on:click={() => (selectBook = !selectBook)}
    >
      {$page.data.params.book}
    </Button>

    {#if selectBook}
      <ul class="absolute grid h-[20rem] overflow-auto rounded border border-gray-300 bg-gray-50">
        {#each books as book}
          <button
            class="select-none p-2 hover:bg-gray-200 dark:bg-[#1e293b] dark:hover:bg-[#445268]"
            on:click={() => handleOnChange(book, chapter, version)}
          >
            {book}
          </button>
        {/each}
      </ul>
    {/if}
  </div>

  <div use:clickOutside on:click_outside={() => (selectChapter = false)}>
    <h4>Capítulo</h4>
    <Button
      className="w-12 dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
      on:click={() => (selectChapter = !selectChapter)}
    >
      {$page.data.params.chapter}
    </Button>

    {#if selectChapter}
      <ul class="absolute grid h-[20rem] overflow-auto rounded border border-gray-300 bg-gray-50">
        {#each { length: chapters } as _, idx}
          <button
            class="w-[5rem] cursor-pointer select-none p-2 hover:bg-gray-200 dark:bg-[#1e293b] dark:text-white dark:hover:bg-[#445268]"
            on:click={() => handleOnChange(book, idx + 1, version)}
          >
            {idx + 1}
          </button>
        {/each}
      </ul>
    {/if}
  </div>
</div>
