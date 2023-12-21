<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import SvelteMarkdown from 'svelte-markdown'

  import { user } from '@/state/user'
  import { books, versions } from '@/constants'
  import { createAlert } from '@/services/alert'
  import Button from '@/components/Button.svelte'
  import { draft, studyMode } from '@/state/study'
  import Passage from '@/components/Passage.svelte'
  import { Stretch } from 'svelte-loading-spinners'
  import { clickOutside } from '@/utils/clickOutside.js'
  import { formatName } from '@/utils/chapter'
  import { DEFAULT_NOTE, searchName } from '@/constants'
  import { sendCreateNote, sendNoteToUpdate } from '@/state/notes'
  import { version } from '@/state/bible'
  

  /** @type {string} */
  export let versionRead = 'rv1960'

  /** @type {string} */
  export let book = 'genesis'

  /** @type {number} */
  export let chapter = 1

  let md =
    $draft.body.length === 0
      ? DEFAULT_NOTE
      : $draft.body

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
  })

 

  async function getData() {
    if (book === '') return
    hasError = false
    error = ''

    const r = await fetch(`https://bible-api.deno.dev/api/book/${searchName(book)}`)
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
      `https://bible-api.deno.dev/api/read/${versionRead === '' ? 'rv1960' : versionRead}/book/${searchName(
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

	localStorage.setItem('bookmark', JSON.stringify({
		version: versionRead,
		chapter,
		book
	}))

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
   * 
   * @param {boolean} loggedIn
   * @param {string} body
   * @param {string} title
   * @param {string} description
   */
  function isValidNote(loggedIn, body, title, description) {
    if (!loggedIn) {
      createAlert('Necesitas estar autenticado para crear notas', 'error')
      return false
    }

    if (body.length < 20) {
      createAlert('El texto debe ser mayor o igual a 20 caracteres', 'error')
      return false
    }

    if (title.length < 8) {
      createAlert('El titulo debe ser mayor o igual a 8 caracteres', 'error')
      return false
    }

    if (title.length > 40) {
      createAlert('El titulo debe ser menor a 40 caracteres', 'error')
      return false
    }

    if (description.length < 10) {
      createAlert('La descripcion debe ser mayor a 10 caracteres', 'error')
      return false
    }

    return true
  }

  function getCurrentPage() {
    return `${$page.url.origin}/read/${versionRead}/${searchName(book)}/${chapter}`
  }

	/**
   * @param {{ [k: string]: FormDataEntryValue }} formData
   */
  async function createNote(formData) {
    formData.page = getCurrentPage()
    
	const response = await sendCreateNote(formData)

	if (!response.ok) {
		return
	}

    const data = await response.json()

    draft.set({
      id: data.id,
      title: $draft.title,
      body: $draft.body,
      description: $draft.description
    })
  }
//  * @param {Event & { readonly submitter: HTMLElement | undefined }} event
  /**
	   * @param {Event & { readonly submitter: HTMLElement | null }} event
   //  * @returns {Promise<void>} 
   */
  async function submitNote(event) {
	if (!(event.target instanceof HTMLFormElement)) return

    if (!isValidNote($user.loggedIn, $draft.body, $draft.title, $draft.description)) {
      return
    }
	
    const formData = Object.fromEntries(new FormData(event.target))

    if ($draft.id !== '') {
      updateNote(formData)
      return
    }

    createNote(formData)
  }

  async function handleNewNote() {
    if (!isValidNote($user.loggedIn, $draft.body, $draft.title, $draft.description)) {
      return
    }

    const formData = {
      title: $draft.title,
      body: $draft.body,
      description: $draft.description
    }
    createNote(formData)
  }

  /**
   * @param {{ [k: string]: FormDataEntryValue }} formData
   */
  async function updateNote(formData) {
    if ($draft.id !== '') {
	  sendNoteToUpdate($draft.id, formData)
	}
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

  $: {
    draft.update((u) => {
      u.body = md
      return u
    })
  }
</script>

<svelte:head>
  <title>{formatName(book)}: {chapter} - Lectura</title>
</svelte:head>

<div class="w-full">
  <wc-toast />
  <section class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-12">
    <div class="flex items-center gap-3">
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
          <ul
            class="list absolute flex h-fit flex-col  rounded bg-gray-50 ring-1 ring-gray-300"
          >
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
		<dialog class="max-lg:max-w-[50rem] max-lg:top-[80%] max-h-[30rem]  flex flex-wrap books-dialog p-4 overflow-auto rounded-lg bg-gray-100 dark:text-white gap-3 dark:bg-[#283248]" >
			{#each books as b}
			    <button
                class="select-none p-2 transition-shadow bg-[#a8cae8] hover:bg-[#7faddb]  hover:shadow- rounded-sm dark:bg-[#4366b2] dark:hover:bg-blue-600"
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
		<dialog class={`max-lg:max-w-[50rem] max-lg:left-0 max-h-[30rem]  flex flex-wrap chapters-dialog p-4 overflow-auto rounded-lg bg-gray-100 dark:text-white gap-3 dark:bg-[#283248]
		max-lg:w-[20rem] left-min
		${chapters <= 7 ? 'top-[29%] left-minus' : ''}
		${chapters <= 12 ? 'top-[29%] left-min' : ''}
		${chapters <= 20 && chapters > 10 ? 'top-[34%] left-med' : ''}
		${chapters < 50 && chapters > 20 ? 'top-[35%] left-med' : 'top-[40%]'}
		${chapters > 50 ? 'top-[51%] left-med' : 'top-[40%] left-med'}
		${chapters >= 20 ? 'max-lg:top-[51%]' : 'max-lg:top-[40%]'}
		`
		} >
			{#each { length: chapters } as _, c}
              <button
                class="select-none w-[3rem] p-4 transition-shadow bg-[#a8cae8] hover:bg-[#7faddb]  hover:shadow-sm rounded-sm dark:bg-[#4366b2] dark:hover:bg-blue-600"
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

    <div class="flex items-center gap-4 sm:self-end">
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
</div>

  </section>

  {#if loading }
    <div class="max-md flex justify-center self-center text-center align-middle">
      <section class="mt-4 flex flex-col items-center justify-center align-middle">
        <Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
        <h4>Cargando Capítulo</h4>
      </section>
    </div>
  {/if}

  {#if !hasError && info}
    <div class="flex max-w-full flex-row">
	{#if !loading} 
      <section class={$studyMode ? 'max-w-full xl:w-1/2 2xl:w-2/4' : 'w-full max-w-full'}>
        <Passage studyMode={$studyMode} {info} />
      </section>
	{/if}

      {#if $studyMode && !loading}
        <section class="max-lg:hidden xl:w-1/2 xl:max-w-full 2xl:w-1/2 2xl:max-w-full">
          <div class="m-10 h-[13rem] justify-center overflow-auto p-4">
            <SvelteMarkdown source={md} />
          </div>
          <div class="h-[26rem]">
            <form on:submit|preventDefault={submitNote}>
              <div class="">
                <label
                  for="title"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Titulo</label
                >
                <input
                  type="text"
                  id="title"
                  name="title"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="titulo de mi nota"
                  bind:value={$draft.title}
                  required
                />
              </div>
              <div>
                <label
                  for="description"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >Descripción</label
                >
                <input
                  type="text"
                  name="description"
                  id="description"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="descripción de mi nota"
                  required
                  bind:value={$draft.description}
                />
              </div>
              <textarea
                name="body"
                class="mt-2 block h-[15rem] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                bind:value={md}
              />

              <div class="flex flex-row justify-end gap-4">
                <Button type="submit">Guardar nota</Button>
                <Button on:click={handleNewNote}>Crear Nueva Nota</Button>
              </div>
            </form>
          </div>
        </section>
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
