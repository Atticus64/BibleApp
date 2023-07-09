<script>
	import { page } from '$app/stores';

	/**
	 * @type {string}
	 */
	export let href;

	/**
	 * @type {string}
	 */
	export let text;
</script>

<li aria-current={$page.url.pathname === href ? 'page' : null}>
	<a
		{href}
		class="flex items-center text-lg font-semibold tracking-widest transition-colors hover:text-[#175d93]"
	>
		<span>{text}</span>
		<slot />
	</a>
</li>

<style>
	li[aria-current='page'] > a {
		color: #36aff0;
	}

	li[aria-current='page'] > a span {
		color: black;
	}

	li {
		list-style-type: none;
	}
</style>
