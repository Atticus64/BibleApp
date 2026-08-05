<script>
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'
  import { page } from '$app/state'
  import Button from '@/components/Button.svelte'
  import { newTestament, oldTestament, versions } from '@/constants'
  import { book } from '@/state/bible.svelte.js'
  import { formatName } from '@/utils/chapter'
  import { scale } from 'svelte/transition'

  /**
   * @type {'old' | 'new'} testament
   */
  let testament = $state('old')
  const urlParam = page.url.searchParams.get('testament')
  if (urlParam !== 'old' && urlParam !== 'new') {
    testament = 'old'
  } else {
    testament = urlParam
  }

  /**
   *
   * @param {string} b
   */
  function setBook(b) {
    book.value = b
    goto(resolve(`/chapters/${b.toLowerCase()}`))
  }
</script>

<section class="flex flex-col gap-6">
  <div class="flex flex-row justify-center gap-4 p-4 align-middle">
    <button
      class={`w- select-none p-2 text-2xl transition-shadow ${testament === 'old' ? 'bg-[#a8cae8]' : ''}hover:bg-[#7faddb]  hover:shadow- rounded-sm dark:bg-[#4366b2] dark:hover:bg-blue-600 ${testament === 'old' ? 'bg-[#d3eac8] hover:bg-[#afd89d] hover:text-black dark:bg-[#4c8435] dark:hover:bg-[#afd89d]' : ''}`}
      onclick={() => (testament = 'old')}
    >
      <span> Antiguo testamento </span>
    </button>

    <button
      class={`w- hover:shadow- select-none rounded-sm p-2 text-2xl  transition-shadow hover:bg-[#7faddb] dark:bg-[#4366b2] dark:hover:bg-blue-600 ${testament === 'new' ? 'bg-[#d3eac8] hover:bg-[#afd89d] hover:text-black dark:bg-[#4c8435] dark:hover:bg-[#afd89d]' : ''}`}
      onclick={() => (testament = 'new')}
    >
      <span> Nuevo testamento </span>
    </button>
  </div>

  <div transition:scale={{ duration: 300 }}>
    {#if testament === 'old'}
      <ul class="grid grid-cols-2 gap-10 p-6 sm:grid-cols-3 md:grid-cols-4">
        {#each oldTestament as book (book)}
          <button
            class="select-none rounded-sm bg-[#a8cae8] p-4 text-xl transition-shadow hover:bg-[#7faddb] hover:shadow dark:bg-[#4366b2] dark:hover:bg-blue-600"
            onclick={() => setBook(book)}
          >
            <span>
              {formatName(book)}
            </span>
          </button>
        {/each}
      </ul>
    {:else}
      <ul class="grid grid-cols-2 gap-10 p-6 sm:grid-cols-3 md:grid-cols-4">
        {#each newTestament as book (book)}
          <button
            class=" max-w hover:shadow- rounded-sm bg-[#a8cae8] p-4 text-xl hover:bg-[#7faddb] dark:bg-[#4366b2] dark:hover:bg-blue-600"
            onclick={() => setBook(book)}
          >
            <span class="select-none transition-shadow">
              {formatName(book)}
            </span>
          </button>
        {/each}
      </ul>
    {/if}
  </div>

  <Button color="blue" className="self-center w-fit p-4" onclick={() => window.history.back()}>
    <span> Back </span>
    <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3em" viewBox="0 0 1024 1024"
      ><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64" /><path
        fill="currentColor"
        d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
      /></svg
    >
  </Button>
</section>
