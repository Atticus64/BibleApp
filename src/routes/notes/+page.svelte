<script>
  import { user } from '@/state/user'
  import { onMount } from 'svelte'
  import { toastAlert } from '../alert'
  import { notes } from '@/state/notes'
  import Button from '@/components/Button.svelte'
  import Swal from 'sweetalert2'
  import { darkTheme } from '@/state/dark'
  import { getLocalThemeIsDark } from '@/utils/localTheme'

  let loadingNotes = true
  let hasError = false
  if ($darkTheme) {
    import('@sweetalert2/theme-dark/dark.css')
  }

  /**
   *
   * @param {string} id
   */
  async function deleteNote(id) {
    const result = await Swal.fire({
      title: 'Quieres eliminar esta nota?',
      text: 'Si la eliminas no la podras recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si borrar nota'
    })

    if (result.isConfirmed) {
      notes.set($notes.filter((note) => note.id !== id))

      const res = await fetch(`https://bible-api.deno.dev/notes/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!res.ok) {
        toastAlert('No se pudo borrar la nota', 'error', getLocalThemeIsDark())
        return
      }

      toastAlert('Nota eliminada', 'success', getLocalThemeIsDark())
    } else {
      return
    }
  }

  onMount(async () => {

		if (!$user.loggedIn) {
	  	hasError = true
			loadingNotes = false
			return
		}

    await fetch('https://bible-api.deno.dev/notes', {
      headers: {
        'Content-Type': 'application/json',
        WithCredentials: 'include'
      },
      credentials: 'include'
    })
      .then(async (res) => {
        if (res.ok) {
          const info = await res.json()
          notes.set(info)
        } else {
          hasError = true
        }
      })
      .catch((err) => {
        hasError = true
        toastAlert(err, 'error', getLocalThemeIsDark())
        return
      })

    loadingNotes = false
  })
</script>

<wc-toast />
{#if loadingNotes}
  <p>loading...</p>
{:else if !loadingNotes && !hasError}
  {#if $notes.length === 0}
    <p>No hay notas</p>
  {:else}
    <ul
      class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 focus:ring-primary-300 flex flex-row gap-3 rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 max-sm:flex-col 2xl:flex"
    >
      {#each $notes as note}
        <li
          class="base-card block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {note.title}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            {note.description}
          </p>
          <div class="m-4 flex justify-end gap-4 align-middle">
            <Button>Ver nota</Button>
            <Button on:click={() => deleteNote(note.id)}>Eliminar nota</Button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
{/if}

{#if hasError}
  <section class="flex justify-center align-middle">
    <div class="flex flex-col">
      <h1 class="text-xl font-semibold">No puedes acceder a tus notas</h1>
      <p>Debes estar autenticado</p>

      <a
        href="/login"
        class="transition-colors', my-4 self-center bg-green-300 p-5 font-semibold text-black hover:bg-green-200 dark:bg-teal-200 dark:hover:bg-teal-400"
        >Go to Login</a
      >
    </div>
  </section>
{/if}

<style>
  .base-card {
    list-style: none;
  }
</style>
