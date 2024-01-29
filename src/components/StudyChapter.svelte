<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import { API_BASE_URL, books, versions } from '@/constants'
  import { createAlert } from '@/services/alert'
  import Button from '@/components/Button.svelte'
  import { studyMode } from '@/state/study'
  import { fontSize, setFontSize } from '@/state/config'
  import Passage from '@/components/Passage.svelte'
  import { Stretch } from 'svelte-loading-spinners'
  import { clickOutside } from '@/utils/clickOutside.js'
  import { formatName } from '@/utils/chapter'
  import { searchName } from '@/constants'
  import { version } from '@/state/bible'
  import NoteMenu from './NoteMenu.svelte'
  import Note from './icons/Note.svelte'
  import Exit from './icons/Exit.svelte'
  import { scale } from 'svelte/transition'
  import IncreaseFont from './icons/IncreaseFont.svelte'
  import DecreaseFont from './icons/DecreaseFont.svelte'

  /** @type {string} */
  export let versionRead = 'rv1960'

  /** @type {string} */
  export let book = 'genesis'

  /** @type {number} */
  export let chapter = 1

  let error = ''
  let chapters = 55
  let loading = true
  let hasError = false
  let selectBook = false
  let selectChapter = false
  let selectversionRead = false

  /** @type {import('./Passage.svelte').PassageInfo} */
  let info = {
    num_chapters: 50,
    testament: 'Antiguo Testamento',
    name: 'Genesis',
    chapter: '',
    vers: [
      {
        study: '',
        number: 0,
        verse: ''
      }
    ]
  }

  onMount(async () => {
    info = await getData()
    chapters = info.num_chapters

    let configFontSize = localStorage.getItem('fontSize')
    if (configFontSize) {
      fontSize.set(parseInt(configFontSize))
    }
  })

  async function getData() {
    if (book === '') return
    hasError = false
    error = ''

    const r = await fetch(`${API_BASE_URL}/api/book/${searchName(book)}`)
    const bookInfo = await r.json()

    if (chapters > bookInfo.chapters) {
      chapters = bookInfo.chapters
      if (chapter > chapters) {
        chapter = 1
        goto(`/read/${versionRead}/${searchName(book)}/${chapter}`)
      }
    }
    chapters = bookInfo.chapters
    const p = $page.url
    loading = true

    const resp = await fetch(
      `${API_BASE_URL}/api/read/${versionRead === '' ? 'rv1960' : versionRead}/${searchName(
        book
      )}/${chapter}`
    )

    if (!resp.ok) {
      loading = false
      hasError = true

      error =
        'No se encontro el capitulo, intentelo mas tarde o revise que sea correcta su busqueda'

      createAlert('No se pudo cargar el capitulo, coloque un capitulo correcto', 'error')
      return
    }

    localStorage.setItem(
      'bookmark',
      JSON.stringify({
        version: versionRead,
        chapter,
        book
      })
    )

    loading = false
    const chapInfo = await resp.json()
    return chapInfo
  }

  /**
   * @param {string} book
   * @param {number} chapter
   * @param {string} versionRead
   */
  async function handleChange(book, chapter, versionRead) {
    localStorage.setItem(
      'bookmark',
      JSON.stringify({
        version: versionRead,
        chapter,
        book
      })
    )
    goto(`/read/${versionRead}/${searchName(book)}/${chapter}`)
    info = await getData()
  }

  /**
   * @param {string|number} value
   * @param {'versionRead'|'book'|'chapter'} prop
   */
  function updateData(value, prop) {
    loading = true
    switch (prop) {
      case 'versionRead':
        if (typeof value === 'string') {
          versionRead = value
          selectversionRead = false
        }
        break
      case 'book':
        if (typeof value === 'string') {
          book = value
          selectBook = false
        }
        break
      case 'chapter':
        if (typeof value === 'number') {
          chapter = value
          selectChapter = false
        }
        break
    }
    handleChange(book, chapter, versionRead).then()
  }

  /**
   * @param {'book'|'chapter'|'versionRead'} selector
   */
  function unSelect(selector) {
    switch (selector) {
      case 'book':
        selectBook = !selectBook
        break
      case 'chapter':
        selectChapter = !selectChapter
        break
      case 'versionRead':
        selectversionRead = !selectversionRead
        break
    }
  }

  function increaseFont() {
    if ($fontSize === 25) return

    setFontSize($fontSize + 1)
  }

  function decreaseFont() {
    if ($fontSize === 16) return

    setFontSize($fontSize - 1)
  }
</script>

<svelte:head>
  <title>{formatName(book)}: {chapter} - Lectura</title>
</svelte:head>

<div class="flex w-full flex-col flex-wrap">
  <wc-toast />
  {#if $studyMode && !loading}
    <section
      transition:scale={{
        duration: 300
      }}
      class="h-50 fixed left-0 right-0 top-20 z-50 items-center justify-center p-2 lg:hidden"
    >
      <!-- Modal content -->
      <div class="relative h-[42em] rounded-lg bg-white p-4 shadow dark:bg-gray-700">
        <button
          on:click={(e) => {
            e.preventDefault()
            studyMode.set(!$studyMode)
          }}
          class="absolute right-3 cursor-pointer flex-row self-end rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white lg:hidden"
        >
          <Exit className="h-6 w-6" />
        </button>
        <NoteMenu className="lg:hidden" version={versionRead} {book} {chapter} />
      </div>
    </section>
  {/if}
  <section
    class="flex flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center sm:gap-12"
  >
    <button
      class="w-30 h-30 fixed bottom-6 right-5 opacity-80 lg:hidden"
      on:click={() => {
        studyMode.set(!$studyMode)
      }}
    >
      <Note
        className="select-none rounded-md p-2 dark:text-gray-300 bg-[#a8cae8] transition-shadow hover:bg-[#7faddb] dark:bg-[#4366b2] dark:hover:bg-blue-600"
        width="5rem"
        height="5rem"
      />
    </button>

    <div class="flex flex-wrap items-center gap-3">
      <div use:clickOutside on:click_outside={() => (selectversionRead = false)}>
        <h4>versión</h4>
        <Button
          disabled={loading}
          color="green"
          id="selectBook"
          className="w-12 dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
          on:click={() => unSelect('versionRead')}
        >
          {versionRead === '' ? 'Selecciona tu versionRead' : versionRead}
        </Button>

        {#if selectversionRead}
          <ul class="list absolute flex h-fit flex-col rounded bg-gray-50 ring-1 ring-gray-300">
            {#each versions as v}
              <button
                class="cursor-pointer select-none p-6 hover:bg-gray-200 dark:bg-[#1e293b] dark:hover:bg-[#445268]"
                disabled={loading}
                on:click={() => {
                  if (v.url === versionRead) {
                    selectversionRead = false
                    return
                  }
                  updateData(v.url, 'versionRead')
                }}
              >
                {v.name}
              </button>
            {/each}
          </ul>
        {/if}
      </div>

      <div use:clickOutside on:click_outside={() => (selectBook = false)} class="">
        <h4>Libro</h4>
        <Button
          disabled={loading}
          id="selectBook"
          on:click={() => unSelect('book')}
          color="green"
          className="w-10 m-0 dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
        >
          {book === '' ? 'Choose Book' : formatName(book)}
        </Button>

        {#if selectBook}
          <dialog
            class="books-dialog flex max-h-[30rem] flex-wrap gap-3 overflow-auto rounded-lg bg-gray-100 p-4 dark:bg-[#283248] dark:text-white max-lg:top-[80%] max-lg:max-w-[50rem]"
          >
            {#each books as b}
              <button
                class="hover:shadow- select-none rounded-sm bg-[#a8cae8] p-2 transition-shadow hover:bg-[#7faddb] dark:bg-[#4366b2] dark:hover:bg-blue-600"
                disabled={loading}
                on:click={() => {
                  if (b.toLowerCase() === book.toLowerCase()) {
                    selectBook = false
                    return
                  }
                  updateData(b.toLowerCase(), 'book')
                }}
              >
                {b}
              </button>
            {/each}
          </dialog>
        {/if}
      </div>

      <div use:clickOutside on:click_outside={() => (selectChapter = false)} class="">
        <h4>Capítulo</h4>
        <Button
          disabled={loading}
          id="selectBook"
          on:click={() => unSelect('chapter')}
          color="green"
          className="w-16 dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
        >
          {chapter === 0 ? 'Select your chapter' : chapter}
        </Button>

        {#if selectChapter}
          <dialog
            class={`chapters-dialog left-min flex  max-h-[30rem] flex-wrap gap-3 overflow-auto rounded-lg bg-gray-100 p-4 dark:bg-[#283248] dark:text-white max-lg:left-0
		max-lg:w-[20rem] max-lg:max-w-[50rem]
		${chapters <= 7 ? 'left-minus top-[29%]' : ''}
		${chapters <= 12 ? 'left-min top-[29%]' : ''}
		${chapters <= 20 && chapters > 10 ? 'left-med top-[34%]' : ''}
		${chapters < 50 && chapters > 20 ? 'left-med top-[35%]' : 'top-[40%]'}
		${chapters > 50 ? 'left-med top-[51%]' : 'left-med top-[40%]'}
		${chapters >= 20 ? 'max-lg:top-[51%]' : 'max-lg:top-[40%]'}
		`}
          >
            {#each { length: chapters } as _, c}
              <button
                class="w-[3rem] select-none rounded-sm bg-[#a8cae8] p-4 transition-shadow hover:bg-[#7faddb] hover:shadow-sm dark:bg-[#4366b2] dark:hover:bg-blue-600"
                on:click={() => {
                  let newChapter = c + 1 // index start at 0
                  if (newChapter === chapter) {
                    selectChapter = false
                    return
                  }
                  updateData(newChapter, 'chapter')
                }}
              >
                {c + 1}
              </button>
            {/each}
          </dialog>
        {/if}
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-4 sm:self-end">
      <Button
        id="selectBook"
        on:click={() => studyMode.set(!$studyMode)}
        className={$studyMode
          ? 'bg-yellow-500 hover:bg-yellow-400  max-lg:hidden text-black'
          : 'bg-green-600 hover:bg-classNamegreen-400 max-lg:hidden  text-black'}
      >
        {$studyMode ? 'Modo Estudio Activo' : 'Modo Lectura activo'}
      </Button>
      <Button
        className="dark:text-white dark:bg-blue-500 dark:border-none dark:hover:bg-blue-600"
        disabled={loading}
        on:click={async () => {
          if (chapter - 1 <= 0) {
            createAlert('Error ese capitulo no esta disponible', 'error')
            return
          }
          updateData((chapter -= 1), 'chapter')
        }}
        color="blue"
      >
        Capítulo anterior
      </Button>

      <Button
        disabled={loading}
        className="dark:text-white dark:bg-blue-500 dark:border-none dark:hover:bg-blue-600"
        on:click={() => {
          if (chapter + 1 > chapters) {
            createAlert('Error ese capitulo no esta disponible', 'error')
            return
          }

          updateData((chapter += 1), 'chapter')
        }}
        color="blue"
      >
        Siguiente capítulo
      </Button>
      <Button
        disabled={loading}
        className="dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
        on:click={() => {
          const url = `${$page.url.origin}/read/${versionRead}/${book}/${chapter}`
          navigator.clipboard
            .writeText(url)
            .then(() => {
              createAlert('Url copiada al portapapeles', 'success')
            })
            .catch((err) => {
              createAlert('Error al copiar url', 'error')
            })
        }}
        color="green"
      >
        Compartir capítulo
      </Button>
    </div>

    <div class="flex items-center gap-4">
      <Button
        className="dark:text-white dark:bg-blue-500 dark:border-none dark:hover:bg-blue-600"
        disabled={loading}
        on:click={() => {
          version.set(versionRead)
          goto('/books?testament=old')
        }}
        color="blue"
      >
        Antiguo Testamento
      </Button>

      <Button
        className="dark:text-white dark:bg-blue-500 dark:border-none dark:hover:bg-blue-600"
        disabled={loading}
        on:click={() => {
          version.set(versionRead)
          goto('/books?testament=new')
        }}
        color="blue"
      >
        Nuevo Testamento
      </Button>

      <Button color="blue" on:click={increaseFont} disabled={$fontSize === 25}>
        <IncreaseFont width="1.5rem" height="1.5rem" />
      </Button>
      <Button color="blue" on:click={decreaseFont} disabled={$fontSize === 16}>
        <DecreaseFont width="1.5rem" height="1.5rem" />
      </Button>
    </div>
  </section>

  {#if loading}
    <div class="max-md flex justify-center self-center text-center align-middle">
      <section class="mt-4 flex flex-col items-center justify-center align-middle">
        <Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
        <h4>Cargando Capítulo</h4>
      </section>
    </div>
  {/if}

  {#if !hasError && info}
    <div class="flex max-w-full flex-row max-lg:flex-col">
      {#if !loading}
        <section class={$studyMode ? 'max-w-full xl:w-1/2 2xl:w-2/4' : 'w-full max-w-full'}>
          <Passage fontSize={$fontSize} className="max-lg:mb-28" studyMode={$studyMode} {info} />
        </section>
      {/if}

      {#if $studyMode && !loading}
        <NoteMenu className="max-lg:hidden" version={versionRead} {book} {chapter} />
      {/if}
    </div>
  {/if}
</div>

{#if hasError}
  <div>
    <h4><b> Ha ocurrido un error </b></h4>
    <p>
      {error}
    </p>
    <img
      src="https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=170667a&w=0&k=20&c=gsR5TEhp1tfg-qj1DAYdghj9NfM0ldfNEMJUfAzHGtU="
      alt=""
    />
  </div>
{/if}

<style>
  .books-dialog {
    position: fixed;
    width: fit-content;
    overflow: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .chapters-dialog {
    position: fixed;
    overflow: auto;
    /*top: 50%;*/
    /*left: 50%;*/
    transform: translate(-50%, -50%);
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .left-mobile {
    left: 30%;
  }

  .left-min {
    left: 10%;
  }
  .left-minus {
    left: 0%;
  }

  .left-mid {
    left: 20%;
  }

  .left-zero {
    left: 0%;
  }

  .left-med {
    left: 50%;
  }

  @media (max-width: 600px) {
    .chapters-dialog {
      left: 50%;
    }
  }

  @media (min-width: 1024px) {
    .left-minus {
      left: -20%;
    }
  }

  .books-dialog::backdrop {
    background: #000;
    opacity: 0.5;
    backdrop-filter: blur(4px);
  }
</style>
