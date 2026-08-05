<script>
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'
  import Button from '@/components/Button.svelte'
  import { createAlert } from '@/services/alert.js'
  import { getInfoBook } from '@/services/api/auth.js'
  import { book, chapter, version } from '@/state/bible.svelte.js'
  import { formatName, goToChapter } from '@/utils/chapter'
  import { onMount } from 'svelte'

  let { data } = $props()
  let chapters = $state(0)

  /**
   *
   * @param {string } book
   */
  async function getNumChapter(book) {
    const bk = await getInfoBook(book)

    if (!bk) {
      createAlert('No se pudo encontrar el libro', 'error')
      return
    }

    chapters = bk.chapters
  }

  onMount(async () => {
    await getNumChapter(data.params.book.toLowerCase())
  })

  /**
   *
   * @param {number} chapt
   */
  function setChapter(chapt) {
    chapter.value = chapt
    goToPassage()
  }

  function goToPassage() {
    if (book.value === ' ' || book.value === '' || book.value === undefined) {
      goto(resolve('/books'))
    } else if (version.value === ' ' || version.value === '' || version.value === undefined) {
      goto(resolve('/versions'))
    }
    goto(resolve(`/read/${version.value}/${book.value}/${chapter.value}`))
  }
</script>

<wc-toast></wc-toast>
<section class="flex flex-col gap-6">
  <div class="flex flex-row justify-center align-middle">
    <h2>
      Capitulos del libro {formatName(data.params.book)}
    </h2>
  </div>

  <div class="flex flex-row justify-center gap-4 p-4 align-middle">
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {#if chapters > 0}
        {#each { length: chapters } as _, i (i)}
          <button
            onclick={() => setChapter(i + 1)}
            class="w-[10rem] select-none rounded-sm bg-[#a8cae8] p-4 text-2xl transition-shadow hover:bg-[#7faddb] hover:shadow dark:bg-[#4366b2] dark:hover:bg-blue-600"
          >
            {i + 1}
          </button>
        {/each}
      {/if}
    </div>
  </div>
</section>

<Button color="blue" className="self-center w-fit p-4" onclick={() => window.history.back()}>
  <span> Back </span>
  <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3em" viewBox="0 0 1024 1024"
    ><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64" /><path
      fill="currentColor"
      d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
    /></svg
  >
</Button>
