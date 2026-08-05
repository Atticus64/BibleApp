<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'
  import { page } from '$app/state'

  import { user } from '@/state/user.svelte.js'
  import { goToChapter } from '@/utils/chapter'
  import { signOut, updateUserInfo } from '@/services/api/auth'

  import Link from './Link.svelte'
  import { darkTheme } from '@/state/config.svelte.js'
  import Logo from './Logo.svelte'
  import Switch from './Switch.svelte'
  import {
    MenuIcon,
    LoginIcon,
    SearchIcon,
    BookOpenIcon,
    NoteIcon,
    QuestionMarkIcon
  } from './icons'
  import Swal from 'sweetalert2'
  import { studyMode } from '@/state/study.svelte.js'

  let showMenu = $state(false)
  let mobileMenu = $state(false)

  if (darkTheme.value) {
    import('@sweetalert2/theme-dark/dark.css')
  }

  onMount(async () => {
    const data = await updateUserInfo()

    if (!data) {
      return
    }

    user.email = data.email
    user.loggedIn = true
    user.tag = data.tag
  })

  async function logOut() {
    await signOut()
    showMenu = false

    const result = await Swal.fire({
      title: 'Quieres ir a la pagina de Login?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si ir a Login'
    })

    if (result.isConfirmed) {
      goto(resolve('/login'))
    }
  }

  /**
   * @param {string} path
   */
  function goToPage(path) {
    mobileMenu = false
    goto(resolve(/** @type {any} */ (path)))
  }
</script>

<header class="sticky top-0 z-30 h-20 bg-gray-100 dark:bg-[#293548] sm:h-28 xl:h-24">
  <div class="mx-auto flex h-full max-w-screen-xl items-center justify-between px-3">
    <ul class="flex items-center gap-4 sm:hidden">
      <button
        onclick={() => {
          mobileMenu = !mobileMenu
          studyMode.value = false
          showMenu = false
        }}
      >
        <MenuIcon />
      </button>

      {#if mobileMenu}
        <ul
          onmouseleave={() => (mobileMenu = false)}
          class="fixed top-16 flex h-60 w-5/12 flex-col content-center justify-center divide-y divide-gray-100 rounded-lg bg-white p-4 align-middle shadow dark:divide-gray-600 dark:bg-gray-700 sm:hidden"
        >
          <button
            onclick={() => goToPage('/search')}
            class="flex h-1/3 w-full items-center px-4 py-1 text-xl hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <span class="bordertext-xl flex flex-row items-center gap-2 align-middle">
              Buscar <SearchIcon />
            </span>
          </button>
          <button
            onclick={() => {
              mobileMenu = false
              goToChapter()
            }}
            class="block h-1/3 w-full px-4 py-1 text-xl hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <span class="flex flex-row items-center gap-2 align-middle">
              Leer <BookOpenIcon />
            </span>
          </button>
          <button
            onclick={() => goToPage('/notes')}
            class="block h-1/3 w-full px-4 py-1 text-xl hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <span class="flex flex-row items-center gap-2 align-middle">
              Notas <NoteIcon />
            </span>
          </button>
        </ul>
      {/if}

      {#if user.loggedIn}
        <button
          onclick={() => {
            showMenu = !showMenu
            mobileMenu = false
          }}
        >
          <img
            id="avatarButton"
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.tag}`}
            alt={user.tag}
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom-start"
            class="h-10 w-10 cursor-pointer rounded-full"
          />
        </button>
        <!-- Dropdown menu -->

        {#if showMenu}
          <div
            role="group"
            onmouseleave={() => (showMenu = false)}
            class="items-centerrounded-lg fixed top-16 h-fit w-52 divide-y divide-gray-100 bg-white shadow dark:divide-gray-600 dark:bg-gray-700 sm:hidden"
          >
            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <p><b>tag: </b>{user.tag}</p>
              <p><b>Email: </b>{user.email}</p>
            </div>

            <div class="">
              <button
                onclick={logOut}
                class="block w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >Cerrar Sesión</button
              >
            </div>
          </div>
        {/if}
      {:else}
        <Link href="/login" text="Login">
          <LoginIcon />
        </Link>
      {/if}
    </ul>

    <div class="flex justify-center gap-0 align-middle">
      <Switch className="xl:relative xl:left-10 lg:left-20 md:left-16 sm:left-14 max-sm:right-14" />
      <Logo />
    </div>
    <nav class="hidden sm:flex sm:items-center">
      <ul class="flex items-center gap-4">
        <Link href="/search" text="Buscar">
          <SearchIcon />
        </Link>
        <button
          onclick={() => goToChapter()}
          class={`link block h-1/4 px-4 py-1 text-lg font-semibold tracking-widest transition-colors hover:text-[#7faddb] ${
            page.url.pathname.startsWith('/chapter') ? 'text-black dark:text-white' : ''
          }`}
          aria-current={page.url.pathname.startsWith('/chapter') ? 'page' : null}
        >
          <span class="flex flex-row items-center gap-2 align-middle">
            Leer <span>
              <BookOpenIcon />
            </span>
          </span>
        </button>
        <Link href="/notes" text="Notas">
          <NoteIcon />
        </Link>
        {#if user.loggedIn}
          <button
            onclick={() => {
              showMenu = !showMenu
              mobileMenu = false
            }}
          >
            <img
              id="avatarButton"
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.tag}`}
              alt={user.tag}
              data-dropdown-toggle="userDropdown"
              data-dropdown-placement="bottom-start"
              class="h-10 w-10 cursor-pointer rounded-full"
            />
          </button>

          {#if showMenu}
            <div
              role="group"
              onmouseleave={() => (showMenu = false)}
              class="min-xl:[5%] items-centerrounded-lg fixed top-[5rem] h-fit w-fit divide-y divide-gray-100 bg-white shadow dark:divide-gray-600 dark:bg-gray-700 sm:right-1 lg:right-8 2xl:right-[10%]"
            >
              <div class="px-4 py-3 text-lg text-gray-900 dark:text-white">
                <p><b>tag: </b>{user.tag}</p>
                <p><b>Email: </b>{user.email}</p>
              </div>

              <div class="">
                <button
                  onclick={logOut}
                  class="block w-full px-4 py-2 text-start text-lg text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Cerrar Sesión</button
                >
              </div>
            </div>
          {/if}
        {:else}
          <Link href="/login" text="Login">
            <LoginIcon />
          </Link>
        {/if}
      </ul>
    </nav>
  </div>
</header>

<style lang="postcss">
  .link[aria-current='page'] > span > span {
    color: #6f8fc1;
  }

  .link {
    list-style-type: none;
  }
</style>
