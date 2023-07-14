<script>
	let darkMode = true;
	import { browser } from '$app/environment';

	export let className = '';

	function handleSwitchDarkMode() {
		darkMode = !darkMode;

		localStorage.setItem('theme', darkMode ? 'dark' : 'light');

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			darkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
			darkMode = false;
		}
	}
</script>

<div class={className}>
	<input checked={darkMode} on:click={handleSwitchDarkMode} type="checkbox" id="theme-toggle" />
	<label for="theme-toggle" class={className} />
</div>

<style lang="postcss">
	#theme-toggle {
		@apply invisible;
	}

	#theme-toggle + label {
		@apply absolute h-9 w-9 cursor-pointer rounded-full duration-300 content-[''];
	}

	#theme-toggle:not(:checked) + label {
		@apply bg-amber-400;
	}

	#theme-toggle:checked + label {
		@apply bg-transparent;
		box-shadow: inset -18px -16px 1px 1px #ddd;
	}
</style>
