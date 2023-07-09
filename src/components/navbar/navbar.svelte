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

<header class="sticky top-0 h-20 bg-white">
	<div class="mx-auto flex h-full max-w-screen-xl items-center justify-between px-3">
		<Logo />

		<ul class="flex items-center gap-4 sm:hidden">
			<Link href="/login" text="Login">
				<LoginIcon />
			</Link>

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
				<Link href="/login" text="Login">
					<LoginIcon />
				</Link>
			</ul>
		</nav>
	</div>
</header>

{#if mobileMenu}
	<nav
		transition:fade={{ duration: 400 }}
		class="sticky top-14 flex flex-col items-center gap-2 bg-[#c5dbce] py-2 sm:hidden"
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
