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
  } from '@/state/search.svelte.js'

  let { pageCount } = $props()

  let isMiddle = $derived(page.value > 2 && page.value < pageCount - 1)

  function reSearch() {
    const { queryWithPage } = searchBible({
      version: versionSearch.value.url,
      testament: testament.value.url
    })
    loadingResults.value = true

    queryWithPage(pattern.value, page.value, versionSearch.value.url)
      .then((d) => {
        searchResults.value = d
        loadingResults.value = false
      })
      .catch((e) => {
        console.error(e)
        loadingResults.value = false
      })
  }

  /**
   * @param {number} pageValue
   */
  function changePage(pageValue) {
    page.value = pageValue

    reSearch()
  }

  function getMiddleValue() {
    return isMiddle ? page.value : Math.ceil(pageCount / 2)
  }
</script>

<wc-toast></wc-toast>

<nav>
  <ul class="navigation inline-flex h-10 -space-x-px text-base">
    <li>
      <button
        onclick={() => {
          if (page.value === 1) {
            createAlert('No hay paginas anteriores', 'error')
            return
          }
          changePage(page.value - 1)
        }}
        aria-label="Anterior pagina"
        class="ml-0 flex h-10 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >Prev</button
      >
    </li>
    {#if pageCount <= 5}
      {#each { length: pageCount } as _, pg (pg)}
        <li>
          <button
            onclick={() => {
              changePage(pg + 1)
            }}
            class={`${
              pg === page.value - 1
                ? 'border-gray-300:bg-gray-100:text-gray-700 border bg-blue-200 font-bold dark:border-gray-700 dark:bg-blue-800 dark:font-normal dark:text-white'
                : ''
            } flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >{pg + 1}</button
          >
        </li>
      {/each}
    {:else}
      {#each { length: 2 } as _, pg (pg)}
        <li>
          <button
            onclick={() => {
              changePage(pg + 1)
            }}
            class={`${
              pg === page.value - 1
                ? 'border-gray-300:bg-gray-100:text-gray-700 border bg-blue-200 font-bold dark:border-gray-700 dark:bg-blue-800 dark:font-normal dark:text-white'
                : ''
            } flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >{pg + 1}</button
          >
        </li>
      {/each}
      <li class="max-sm:hidden">
        <button
          class="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >....</button
        >
      </li>
      <li class="">
        <button
          onclick={() => {
            changePage(getMiddleValue())
          }}
          class={`${
            isMiddle
              ? 'border-gray-300:bg-gray-100:text-gray-700 border bg-blue-200 font-bold dark:border-gray-700 dark:bg-blue-800 dark:font-normal dark:text-white'
              : ''
          } flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >{isMiddle ? page.value : Math.ceil(pageCount / 2)}</button
        >
      </li>
      <li class="max-sm:hidden">
        <button
          class="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >....</button
        >
      </li>
      <li>
        <button
          onclick={() => {
            changePage(pageCount - 1)
          }}
          class={`${
            pageCount - 1 === page.value
              ? 'border-gray-300:bg-gray-100:text-gray-700 border bg-blue-200 font-bold dark:border-gray-700 dark:bg-blue-800 dark:font-normal dark:text-white'
              : ''
          } flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >{pageCount - 1}</button
        >
      </li>
      <li>
        <button
          onclick={() => {
            changePage(pageCount)
          }}
          class={`${
            pageCount === page.value
              ? 'border-gray-300:bg-gray-100:text-gray-700 border bg-blue-200 font-bold dark:border-gray-700 dark:bg-blue-800 dark:font-normal dark:text-white'
              : ''
          } flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >{pageCount}</button
        >
      </li>
    {/if}

    <li>
      <button
        onclick={() => {
          if (page.value === pageCount) {
            createAlert('No hay paginas siguientes', 'error')
            return
          }
          changePage(page.value + 1)
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
