<script>
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'
  import Editor from '@/components/Editor.svelte'
  import { API_BASE_URL } from '@/constants'
  import { createAlert } from '@/services/alert.js'
  import { updateUserInfo } from '@/services/api/auth.js'
  import { editable, getNote, editableNote, sendCreateNote } from '@/state/notes.svelte.js'
  import { user } from '@/state/user.svelte.js'
  import { isValidNote } from '@/utils/note.js'
  import { onMount } from 'svelte'

  let { data } = $props()

  let loadedNote = $state(false)

  /**
   * @param {string} id
   * @param {{ [k: string]: FormDataEntryValue }} formData
   */
  export async function sendNoteToUpdate(id, formData) {
    const res = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    })

    if (!res.ok) {
      createAlert('No se pudo guardar la nota', 'error')
      return
    }

    createAlert('Nota actualizada', 'success')
  }

  /**
   * @param {{ [k: string]: FormDataEntryValue }} formData
   */
  async function createNote(formData) {
    const response = await sendCreateNote(formData)

    if (!response.ok) {
      return
    }

    const data = await response.json()

    editableNote.value = {
      id: data.id,
      title: editableNote.value.title,
      body: editableNote.value.body,
      description: editableNote.value.description,
      page: editableNote.value.page
    }
  }

  /**
   * @param {MouseEvent} e
   * @returns {Promise<void>}
   */
  async function handleNewNote(e) {
    e.preventDefault()
    if (
      !isValidNote(
        user.loggedIn,
        editableNote.value.body,
        editableNote.value.title,
        editableNote.value.description
      )
    ) {
      return
    }

    const formData = {
      title: editableNote.value.title,
      body: editableNote.value.body,
      description: editableNote.value.description
    }
    createNote(formData)
  }

  /**
   * @param {SubmitEvent} event
   */
  async function submitNote(event) {
    event.preventDefault()
    if (!(event.target instanceof HTMLFormElement)) return

    if (
      !isValidNote(
        user.loggedIn,
        editableNote.value.body,
        editableNote.value.title,
        editableNote.value.description
      )
    ) {
      return
    }

    const formData = Object.fromEntries(new FormData(event.target))
    formData.body = editableNote.value.body

    if (editableNote.value.id !== '') {
      sendNoteToUpdate(editableNote.value.id, formData)
      return
    }

    createNote(formData)
  }

  onMount(async () => {
    if (!user.loggedIn) {
      await updateUserInfo()
    }

    if (!user.loggedIn) {
      goto(resolve('/login'))
    }

    const resp = await getNote(data.params.id)

    const note = await resp.json()
    editableNote.value = note
    loadedNote = true
  })
</script>

<wc-toast></wc-toast>
{#if user.loggedIn && loadedNote}
  {#if !editable.value}
    <h1>{editableNote.value.title}</h1>
    <h2>{editableNote.value.description}</h2>

    <Editor createNote={handleNewNote} content={editableNote.value.body} />
  {:else}
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
          bind:value={editableNote.value.title}
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
          bind:value={editableNote.value.description}
        />
      </div>
      <Editor createNote={handleNewNote} content={editableNote.value.body} manageNote={true} />
    </form>
  {/if}
{/if}
