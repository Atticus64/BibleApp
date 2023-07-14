<script>
	import {
		MenuIcon,
		LoginIcon,
		SearchIcon,
		BookOpenIcon,
		NoteIcon,
		QuestionMarkIcon
	} from '../icons';
	import Link from '../Link.svelte';
	import Logo from '../Logo.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '@/state/user';

	let mobileMenu = false;
	let showMenu = false;
	function handleClick() {
		mobileMenu = !mobileMenu;
	}

	async function Logout() {
		await fetch('https://bible-api.deno.dev/auth/logout', {
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});

		user.set({
			email: '',
			tag: '',
			loggedIn: false
		});

		showMenu = false;

		goto('/login');
	}

	async function checkUser() {
		await fetch('https://bible-api.deno.dev/user', {
			method: 'GET',
			credentials: 'include'
		})
			.then(async (res) => {
				if (res.ok) {
					const info = await res.json();
					user.set({
						email: info.email,
						tag: info.tag,
						loggedIn: true
					});
				}
			})
			.catch((err) => {
				return null;
			});

		return {
			user
		};
	}

	/**
	 *
	 * @param {string} path
	 */
	function goToPage(path) {
		mobileMenu = false;
		goto(path);
	}

	onMount(async () => {
		checkUser();
	});
</script>

<header class="sticky top-0 h-20 bg-white">
	<div class="mx-auto flex h-full max-w-screen-xl items-center justify-between px-3">
		<ul class="flex items-center gap-4 sm:hidden">
			<button
				on:click={() => {
					mobileMenu = !mobileMenu;
					showMenu = false;
				}}
			>
				<MenuIcon />
			</button>

			{#if $user.loggedIn}
				<button
					on:click={() => {
						showMenu = !showMenu;
						mobileMenu = false;
					}}
				>
					<img
						id="avatarButton"
						src={`https://api.dicebear.com/6.x/initials/svg?seed=${$user.tag}`}
						alt={$user.tag}
						data-dropdown-toggle="userDropdown"
						data-dropdown-placement="bottom-start"
						class="w-10 h-10 rounded-full cursor-pointer"
					/>
				</button>
				<!-- Dropdown menu -->

				{#if mobileMenu}
					<ul
						on:mouseleave={() => (mobileMenu = false)}
						class="fixed top-16 h-fit sm:hidden bg-white divide-y divide-gray-100 items-centerrounded-lg shadow w-52 dark:bg-gray-700 dark:divide-gray-600"
					>
						<button
							on:click={() => goToPage('/search')}
							class="block px-4 py-1 text-start w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							<span class="flex flex-row items-center align-middle gap-2">
								Buscar <SearchIcon width="13" height="13" />
							</span>
						</button>
						<button
							on:click={() => goToPage('/read')}
							class="block px-4 py-1 text-start w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							<span class="flex flex-row items-center align-middle gap-2">
								Leer <BookOpenIcon width="13" height="13" />
							</span>
						</button>
						<button
							on:click={() => goToPage('/notes')}
							class="block px-4 py-1 text-start w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							<span class="flex flex-row items-center align-middle gap-2">
								Notas <NoteIcon width="13" height="13" />
							</span>
						</button>
						<button
							on:click={() => goToPage('/about')}
							class="block px-4 py-1 text-start w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							<span class="flex flex-row items-center align-middle gap-2">
								FAQ <QuestionMarkIcon width="13" height="13" />
							</span>
						</button>
					</ul>
				{/if}

				{#if showMenu}
					<div
						on:mouseleave={() => (showMenu = false)}
						class="fixed top-16 h-fit sm:hidden bg-white divide-y divide-gray-100 items-centerrounded-lg shadow w-52 dark:bg-gray-700 dark:divide-gray-600"
					>
						<div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
							<p><b>tag: </b>{$user.tag}</p>
							<p><b>Email: </b>{$user.email}</p>
						</div>

						<div class="">
							<button
								on:click={Logout}
								class="block px-4 py-2 text-sm text-start text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full"
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
		<Logo />

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
							showMenu = !showMenu;
							mobileMenu = false;
						}}
					>
						<img
							id="avatarButton"
							src={`https://api.dicebear.com/6.x/initials/svg?seed=${$user.tag}`}
							alt={$user.tag}
							data-dropdown-toggle="userDropdown"
							data-dropdown-placement="bottom-start"
							class="w-10 h-10 rounded-full cursor-pointer"
						/>
					</button>

					{#if showMenu}
						<div
							on:mouseleave={() => (showMenu = false)}
							class="fixed top-16 right-6 h-fit bg-white divide-y divide-gray-100 items-centerrounded-lg shadow w-52 dark:bg-gray-700 dark:divide-gray-600"
						>
							<div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
								<p><b>tag: </b>{$user.tag}</p>
								<p><b>Email: </b>{$user.email}</p>
							</div>

							<div class="">
								<button
									on:click={Logout}
									class="block px-4 py-2 text-sm text-start text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full"
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
