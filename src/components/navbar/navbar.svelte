<script>
  import {
    MenuIcon,
    LoginIcon,
    SearchIcon,
    BookOpenIcon,
    NoteIcon,
    QuestionMarkIcon
  } from '../icons'
  import Link from '../Link.svelte'
  import Logo from '../Logo.svelte'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { user } from '@/state/user'
  import Switch from '../Switch.svelte'
  import '@/app.css'

  let mobileMenu = false
  let showMenu = false

  async function Logout() {
    await fetch('https://bible-api.deno.dev/auth/logout', {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    user.set({
      email: '',
      tag: '',
      loggedIn: false
    })

    showMenu = false

    goto('/login')
  }

  async function checkUser() {
    await fetch('https://bible-api.deno.dev/user', {
      method: 'GET',
      credentials: 'include'
    })
      .then(async (res) => {
        if (res.ok) {
          const info = await res.json()
          user.set({
            email: info.email,
            tag: info.tag,
            loggedIn: true
          })
        }
      })
      .catch((err) => {
        return null
      })

    return {
      user
    }
  }

  /**
   *
   * @param {string} path
   */
  function goToPage(path) {
    mobileMenu = false
    goto(path)
  }

  onMount(async () => {
    checkUser()
  })
</script>

<header class="sticky top-0 z-30 h-20 bg-white dark:bg-[#293548] sm:h-28 xl:h-24">
  <div class="mx-auto flex h-full max-w-screen-xl items-center justify-between px-3">
    <ul class="flex items-center gap-4 sm:hidden">
      <button
        on:click={() => {
          mobileMenu = !mobileMenu
          showMenu = false
        }}
      >
        <MenuIcon />
      </button>

      {#if mobileMenu}
        <ul
          on:mouseleave={() => (mobileMenu = false)}
          class="flex flex-col justify-center align-middle content-center rounded-lg fixed top-16 h-80 w-8/12 divide-y divide-gray-100 bg-white shadow dark:divide-gray-600 dark:bg-gray-700 sm:hidden"
        >
          <button
            on:click={() => goToPage('/search')}
            class="flex w-full h-1/4 text-xl px-4 py-1 items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <span class="flex flex-row items-center bordertext-xl gap-2 align-middle">
              Buscar <SearchIcon width="23" height="23" />
            </span>
          </button>
          <button
            on:click={() => goToPage('/read')}
            class="block w-full h-1/4  text-xl px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <span class="flex flex-row items-center gap-2 align-middle">
              Leer <BookOpenIcon width="23" height="23" />
            </span>
          </button>
          <button
            on:click={() => goToPage('/notes')}
            class="block w-full h-1/4 px-4 py-1  text-xl hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <span class="flex flex-row items-center gap-2 align-middle">
              Notas <NoteIcon width="23" height="23" />
            </span>
          </button>
          <button
            on:click={() => goToPage('/about')}
            class="block w-full px-4 h-1/4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <span class="flex flex-row items-center text-xl gap-2 align-middle">
              FAQ <QuestionMarkIcon width="23" height="23" />
            </span>
          </button>
        </ul>
      {/if}

      {#if $user.loggedIn}
        <button
          on:click={() => {
            showMenu = !showMenu
            mobileMenu = false
          }}
        >
          <img
            id="avatarButton"
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${$user.tag}`}
            alt={$user.tag}
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom-start"
            class="h-10 w-10 cursor-pointer rounded-full"
          />
        </button>
        <!-- Dropdown menu -->

        {#if showMenu}
          <div
            on:mouseleave={() => (showMenu = false)}
            class="items-centerrounded-lg fixed top-16 h-fit w-52 divide-y divide-gray-100 bg-white shadow dark:divide-gray-600 dark:bg-gray-700 sm:hidden"
          >
            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <p><b>tag: </b>{$user.tag}</p>
              <p><b>Email: </b>{$user.email}</p>
            </div>

            <div class="">
              <button
                on:click={Logout}
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
    <div class="flex justify-center align-middle">
      <Switch className="xl:relative xl:left-7 lg:left-20 md:left-16 sm:left-14 max-sm:right-14" />
      <Logo />
    </div>

    <nav class="hidden sm:flex sm:items-center">
      <ul class="flex items-center gap-4">
        <Link href="/search" text="Buscar">
          <SearchIcon />
        </Link>
        <Link href="/read" text="Leer">
          <BookOpenIcon />
        </Link>
        <Link href="/notes" text="Notas">
          <NoteIcon />
        </Link>
        <Link href="/about" text="FAQ">
          <QuestionMarkIcon />
        </Link>
        {#if $user.loggedIn}
          <button
            on:click={() => {
              showMenu = !showMenu
              mobileMenu = false
            }}
          >
            <img
              id="avatarButton"
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${$user.tag}`}
              alt={$user.tag}
              data-dropdown-toggle="userDropdown"
              data-dropdown-placement="bottom-start"
              class="h-10 w-10 cursor-pointer rounded-full"
            />
          </button>

          {#if showMenu}
            <div
              on:mouseleave={() => (showMenu = false)}
              class="min-xl:[5%] items-centerrounded-lg fixed top-[5rem] h-fit w-fit divide-y divide-gray-100 bg-white shadow dark:divide-gray-600 dark:bg-gray-700 sm:right-1 lg:right-8 2xl:right-[10%]"
            >
              <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <p><b>tag: </b>{$user.tag}</p>
                <p><b>Email: </b>{$user.email}</p>
              </div>

              <div class="">
                <button
                  on:click={Logout}
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
    </nav>
  </div>
</header>
