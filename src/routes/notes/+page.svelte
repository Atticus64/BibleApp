<script>
  import { onMount } from 'svelte'
  import Swal from 'sweetalert2'

  import { user } from '@/state/user'
  import { notes } from '@/state/notes'
  import { darkTheme } from '@/state/dark'
  import { createAlert } from '@/services/alert'
  import Button from '@/components/Button.svelte'
  import { Stretch } from 'svelte-loading-spinners'
  import { API_BASE_URL } from '@/constants'
  import { draft, studyMode } from '@/state/study'
  import { goto } from '$app/navigation'

  let loadingNotes = true
  let hasError = false

  if ($darkTheme) {
    import('@sweetalert2/theme-dark/dark.css')
  }

  onMount(async () => {
    await fetch(`${API_BASE_URL}/notes`, {
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
          localStorage.removeItem('user')
          createAlert('No se pudo cargar las notas', 'error')
        }
      })
      .catch((err) => {
        console.log(err)
        localStorage.removeItem('user')
        createAlert(err, 'error')
        return
      })

    loadingNotes = false
  })

  /**
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

      const res = await fetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (!res.ok) {
        createAlert('No se pudo borrar la nota', 'error')
        return
      }

      createAlert('Nota eliminada', 'success')
    } else {
      return
    }
  }
</script>

<wc-toast />
{#if loadingNotes}
  <div class="max-md flex flex-col justify-center self-center text-start align-middle">
    <span class="self-center">
      <Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
    </span>
    <h4>Cargando Notas</h4>
  </div>
{:else if !loadingNotes && !hasError}
  {#if $notes.length === 0}
    <p>No hay notas</p>
  {:else}
    <ul
      class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 focus:ring-primary-300 flex flex-row flex-wrap gap-3 rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 max-sm:flex-col 2xl:flex"
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
            <Button
              on:click={() => {
                goto(`/notes/${note.id}`)
              }}>Ver nota</Button
            >
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
