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

	let mobileMenu = false;
	function handleClick() {
		mobileMenu = !mobileMenu;
	}
</script>

<header class="h-20">
	<div class="h-full flex items-center justify-between px-3 max-w-screen-lg mx-auto">
		<Logo />

		<div class="flex items-center gap-4 sm:hidden">
			<Link href="/login" text="Login">
				<LoginIcon />
			</Link>

			<button on:click={handleClick}>
				<MenuIcon />
			</button>
		</div>

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
				<Link href="/login" text="Login">
					<LoginIcon />
				</Link>
			</ul>
		</nav>
	</div>
</header>

{#if mobileMenu}
	<nav transition:fade={{ duration: 400 }} class="flex flex-col gap-4 items-center sm:hidden">
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
