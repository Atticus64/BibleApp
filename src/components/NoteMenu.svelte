<script>
  import { sendCreateNote, sendNoteToUpdate } from '@/state/notes.svelte.js'
  import { draft } from '@/state/study.svelte.js'
  import Editor from './Editor.svelte'
  import { createAlert } from '@/services/alert'
  import { user } from '@/state/user.svelte.js'
  import { page } from '$app/state'
  import { searchName } from '@/constants'
  import { fade, scale } from 'svelte/transition'

  let { className = '', version = 'rv1960', book = 'genesis', chapter = 1 } = $props()

  function getCurrentPage() {
    return `${page.url.origin}/read/${version}/${searchName(book)}/${chapter}`
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

    draft.value = {
      id: data.id,
      title: draft.value.title,
      body: draft.value.body,
      description: draft.value.description
    }
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

  /**
   * @param {SubmitEvent} event
   */
  async function submitNote(event) {
    event.preventDefault()
    if (!(event.target instanceof HTMLFormElement)) return

    if (!isValidNote(user.loggedIn, draft.value.body, draft.value.title, draft.value.description)) {
      return
    }

    const formData = Object.fromEntries(new FormData(event.target))
    formData.body = draft.value.body

    if (draft.value.id !== '') {
      sendNoteToUpdate(draft.value.id, formData)
      return
    }

    createNote(formData)
  }

  /**
   * @param {MouseEvent} e
   * @returns {Promise<void>}
   */
  async function handleNewNote(e) {
    e.preventDefault()
    if (!isValidNote(user.loggedIn, draft.value.body, draft.value.title, draft.value.description)) {
      return
    }

    const formData = {
      title: draft.value.title,
      body: draft.value.body,
      description: draft.value.description
    }
    createNote(formData)
  }
</script>

<section
  transition:scale={{ duration: 200 }}
  class={`
   ${className}
  mt-3 flex flex-col gap-6 xl:w-1/2 xl:max-w-full 2xl:w-1/2 2xl:max-w-full`}
>
  <div class="h-[26rem]">
    <form onsubmit={submitNote} class="flex max-h-[40rem] flex-col gap-2 max-lg:top-5">
      <div>
        <label for="title" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >Titulo</label
        >
        <input
          type="text"
          id="title"
          name="title"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Título de mi nota"
          bind:value={draft.value.title}
          required
        />
      </div>
      <div>
        <label
          for="description"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Descripción</label
        >
        <input
          type="text"
          name="description"
          id="description"
          class="dark:focus:ring-blue-500i block w-full rounded-lg border p-2.5 text-sm text-gray-900 autofill:bg-transparent focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
          placeholder="descripción de mi nota"
          required
          bind:value={draft.value.description}
        />
      </div>
      <Editor content={draft.value.body} createNote={handleNewNote} manageNote={false} />
    </form>
  </div>
</section>
