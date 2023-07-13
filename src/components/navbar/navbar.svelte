<script>
	import { fade } from 'svelte/transition';
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

		goto('/login');
	}

	async function checkUser() {
		const data = await fetch('https://bible-api.deno.dev/user', {
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

	onMount(async () => {
		console.log($user.loggedIn);
		if (!$user.loggedIn) {
			checkUser();
			return;
		}
	});
</script>

<header class="sticky top-0 h-20 bg-white">
	<div class="mx-auto flex h-full max-w-screen-xl items-center justify-between px-3">
		<Logo />

		<ul class="flex items-center gap-4 sm:hidden">
			{#if $user.loggedIn}
				<b>{$user.tag}</b>
				<button on:click={Logout}> Cerrar sesión </button>
			{:else}
				<Link href="/login" text="Login">
					<LoginIcon />
				</Link>
			{/if}

			<li class="h-6">
				<button aria-label="Menu desplegable" on:click={handleClick}>
					<MenuIcon />
				</button>
			</li>
		</ul>

		<nav class="hidden sm:flex sm:items-center">
			<ul class="flex items-center gap-4">
				<Link href="/search" text="Search">
					<SearchIcon />
				</Link>
				<Link href="/chapter/rv1960/genesis/1" text="Read">
					<BookOpenIcon />
				</Link>
				<Link href="/notes" text="Notes">
					<NoteIcon />
				</Link>
				<Link href="/about" text="FAQ">
					<QuestionMarkIcon />
				</Link>
				{#if $user.loggedIn}
					<b>{$user.tag}</b>
					<button on:click={Logout}> Cerrar sesión </button>
				{:else}
					<Link href="/login" text="Login">
						<LoginIcon />
					</Link>
				{/if}
			</ul>
		</nav>
	</div>
</header>

{#if mobileMenu}
	<nav
		transition:fade={{ duration: 400 }}
		class="sticky top-14 flex flex-col items-center gap-2 bg-[#ddeae3] py-2 sm:hidden"
	>
		<Link href="/search" text="Search">
			<SearchIcon />
		</Link>
		<Link href="/chapter/rv1960/genesis/1" text="Read">
			<BookOpenIcon />
		</Link>
		<Link href="/notes" text="Notes">
			<NoteIcon />
		</Link>
		<Link href="/about" text="FAQ">
			<QuestionMarkIcon />
		</Link>
	</nav>
{/if}
