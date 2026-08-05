<script>
  import Button from '@/components/Button.svelte'
  import PageMenu from '@/components/PageMenu.svelte'
  import { API_BASE_URL, TESTAMENTS, versions } from '@/constants'
  import {
    searchResults,
    pattern,
    page,
    searchBible,
    loadingResults,
    versionSearch,
    testament
  } from '@/state/search.svelte.js'
  import { clickOutside } from '@/utils/clickOutside'
  import { Stretch } from 'svelte-loading-spinners'

  let selectVersion = $state(false)
  let selectTestament = $state(false)

  /** @type {number} */
  let timeout

  /** @type {AbortController} */
  let ctr

  /**
   * @param {string|{url: string, name: string}} value
   * @param {string} prop
   */
  function updateData(value, prop) {
    switch (prop) {
      case 'testament':
        if (typeof value === 'object') {
          testament.value = value
          selectTestament = false
        }
        break
    }
  }

  function handleSearch() {
    search(versionSearch.value.url, testament.value.url, true)
  }

  /**
   * @param {string} book
   * @param {number} chapter
   */
  function urlVerse(book, chapter) {
    const endpoint = `https://bible-study.vercel.app/read/${
      versionSearch.value.url
    }/${book.toLowerCase()}/${chapter}`
    return endpoint
  }

  /**
   * @param {string} version
   * @param {string} testament
   * @param {boolean|undefined} timer
   */
  function search(version, testament, timer) {
    const getResults = () => {
      if (ctr) {
        ctr.abort()
      }

      const { query, controller } = searchBible({ version, testament })
      ctr = controller

      query(pattern.value)
        .then((d) => {
          searchResults.value = d
          loadingResults.value = false
        })
        .catch((e) => {
          console.error(e)
          loadingResults.value = false
        })
    }

    page.value = 1

    if (!pattern.value) {
      return
    }

    loadingResults.value = true
    if (!timer) {
      getResults()
      return
    }

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      getResults()
    }, 500)
  }

  $effect(() => {
    search(versionSearch.value.url, testament.value.url, false)
  })
</script>

<form class="m-2 pb-2">
  <label for="default-search" class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >Search</label
  >
  <div class="relative">
    <input
      type="search"
      id="default-search"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      placeholder="Jesús, la verdad, pedro, etc..."
      required
      bind:value={pattern.value}
      oninput={handleSearch}
    />
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <svg
        class="h-4 w-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
  </div>
</form>

<div class="flex items-center gap-3">
  <div
    role="group"
    use:clickOutside
    onclick_outside={() => (selectTestament = false)}
    onmouseleave={() => (selectTestament = false)}
  >
    <h4>Testamento</h4>
    <Button
      color="green"
      type="button"
      id="selectBook"
      className="w-12 dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
      onclick={() => (selectTestament = !selectTestament)}
    >
      {testament.value.name === '' ? 'Antiguo y Nuevo Testamento' : testament.value.name}
    </Button>

    {#if selectTestament}
      <ul
        class="list absolute flex h-fit flex-col overflow-auto rounded bg-gray-50 ring-1 ring-gray-300"
      >
        {#each TESTAMENTS as t (t.url)}
          <button
            class="cursor-pointer select-none p-2 hover:bg-gray-200 dark:bg-[#1e293b] dark:hover:bg-[#445268]"
            onclick={() => {
              updateData(t, 'testament')
            }}
          >
            {t.name}
          </button>
        {/each}
      </ul>
    {/if}
  </div>
  <div
    role="group"
    use:clickOutside
    onclick_outside={() => (selectVersion = false)}
    onmouseleave={() => (selectVersion = false)}
  >
    <h4>Version</h4>
    <Button
      color="green"
      id="selectBook"
      className="w-12 dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
      onclick={() => (selectVersion = !selectVersion)}
    >
      {versionSearch.value.name === '' ? 'Ingresa tu version' : versionSearch.value.name}
    </Button>

    {#if selectVersion}
      <ul
        class="list absolute flex h-fit flex-col overflow-auto rounded bg-gray-50 ring-1 ring-gray-300"
      >
        {#each versions as v (v.url)}
          <button
            onclick={() => {
              versionSearch.value = v
              selectVersion = false
            }}
            class="cursor-pointer select-none p-2 hover:bg-gray-200 dark:bg-[#1e293b] dark:hover:bg-[#445268]"
          >
            {v.name}
          </button>
        {/each}
      </ul>
    {/if}
  </div>
</div>

{#if loadingResults.value}
  <div class="max-md flex justify-center self-center text-center align-middle">
    <section class="mt-4 flex flex-col items-center justify-center align-middle">
      <Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
      <h4>Cargando Resultados</h4>
    </section>
  </div>
{:else if searchResults.value.data.length === 0}
  <p>No hay resultados</p>
{:else if searchResults.value.data.length > 0}
  {#each searchResults.value.data as vers (vers.id)}
    <div
      class="m-2 flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      {#if vers.study}
        <h4 class="text-2xl">{vers.study}</h4>
      {/if}
      <p>Pasaje: {vers.book} {vers.chapter}:{vers.number}</p>
      <p>{vers.verse}</p>

      <a
        href={urlVerse(vers.book, vers.chapter)}
        target="_blank"
        rel="external"
        class="w-fit p-2 text-blue-500 underline">Leer este pasaje</a
      >
    </div>
  {/each}

  <div class="flex justify-center align-middle">
    <PageMenu pageCount={searchResults.value.meta.pageCount} />
  </div>
{:else}
  <p>No se han podido obtener resultados</p>
{/if}
