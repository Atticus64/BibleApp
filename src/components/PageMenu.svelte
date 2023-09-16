<script>
  import { createAlert } from '@/services/alert'
  import {
    loadingResults,
    page,
    pattern,
    searchBible,
    searchResults,
    testament,
    versionSearch
  } from '@/state/search'

  /** @type {number} */
  export let pageCount

  let isMiddle = $page > 2 && $page < pageCount - 1

  function reSearch() {
    const { queryWithPage } = searchBible({
      version: $versionSearch.url,
      testament: $testament.url
    })
    loadingResults.set(true)

    queryWithPage($pattern, $page, $versionSearch.url)
      .then((d) => {
        searchResults.set(d)
        loadingResults.set(false)
      })
      .catch((e) => {
        console.error(e)
        loadingResults.set(false)
      })
  }

  /**
   * @param {number} pageValue
   */
  function changePage(pageValue) {
    page.set(pageValue)

    reSearch()
  }

  function getMiddleValue() {
    return isMiddle ? $page : Math.ceil(pageCount / 2)
  }

  $: {
    if ($page > 2 && $page < pageCount - 1) {
      isMiddle = true
    } else {
      isMiddle = false
    }
  }
</script>

<wc-toast />

<nav>
  <ul class="navigation inline-flex h-10 -space-x-px text-base">
    <li>
      <button
        on:click={() => {
          if ($page === 1) {
            createAlert('No hay paginas anteriores', 'error')
            return
          }
          changePage($page - 1)
        }}
        aria-label="Anterior pagina"
        class="ml-0 flex h-10 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >Prev</button
      >
    </li>
    {#if pageCount <= 5}
      {#each { length: pageCount } as _, pg}
        <li>
          <button
            on:click={() => {
              changePage(pg + 1)
            }}
            class={`${
              pg === $page - 1
                ? 'border-gray-300:bg-gray-100:text-gray-700 border bg-blue-200 font-bold dark:border-gray-700 dark:bg-blue-800 dark:font-normal dark:text-white'
                : ''
            } flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >{pg + 1}</button
          >
        </li>
      {/each}
    {:else}
      {#each { length: 2 } as _, pg}
        <li>
          <button
            on:click={() => {
              changePage(pg + 1)
            }}
            class={`${
              pg === $page - 1
                ? 'border-gray-300:bg-gray-100:text-gray-700 border bg-blue-200 font-bold dark:border-gray-700 dark:bg-blue-800 dark:font-normal dark:text-white'
                : ''
            } flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >{pg + 1}</button
          >
        </li>
      {/each}
      <li class="max-sm:hidden">
        <button
          class={`flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >....</button
        >
      </li>
      <li class="">
        <button
          on:click={() => {
            changePage(getMiddleValue())
          }}
          class={`${
            isMiddle
              ? 'border-gray-300:bg-gray-100:text-gray-700 border bg-blue-200 font-bold dark:border-gray-700 dark:bg-blue-800 dark:font-normal dark:text-white'
              : ''
          } flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >{isMiddle ? $page : Math.ceil(pageCount / 2)}</button
        >
      </li>
      <li class="max-sm:hidden">
        <button
          class={`flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >....</button
        >
      </li>
      <li>
        <button
          on:click={() => {
            changePage(pageCount - 1)
          }}
          class={`${
            pageCount - 1 === $page
              ? 'border-gray-300:bg-gray-100:text-gray-700 border bg-blue-200 font-bold dark:border-gray-700 dark:bg-blue-800 dark:font-normal dark:text-white'
              : ''
          } flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >{pageCount - 1}</button
        >
      </li>
      <li>
        <button
          on:click={() => {
            changePage(pageCount)
          }}
          class={`${
            pageCount === $page
              ? 'border-gray-300:bg-gray-100:text-gray-700 border bg-blue-200 font-bold dark:border-gray-700 dark:bg-blue-800 dark:font-normal dark:text-white'
              : ''
          } flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >{pageCount}</button
        >
      </li>
    {/if}

    <li>
      <button
        on:click={() => {
          if ($page === pageCount) {
            createAlert('No hay paginas siguientes', 'error')
            return
          }
          changePage($page + 1)
        }}
        aria-label="Siguiente pagina"
        class="flex h-10 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >Sig</button
      >
    </li>
  </ul>
</nav>

<style>
  .navigation > li {
    list-style: none;
  }
</style>
