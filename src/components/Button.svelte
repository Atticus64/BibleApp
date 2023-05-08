<script>
	/** @type {string | undefined }*/
	export let href = undefined;

	/** @type {'button' | 'submit' | 'reset'}*/
	export let type = 'button';

	/** @type {'blue' | 'teal' | 'green'} */
	export let color = 'teal';

	/** @type {string | undefined} */
	export let className = undefined;

	const COLOR = {
		blue: 'bg-blue-500 hover:bg-blue-700 text-white transition-colors',
		teal: 'bg-teal-200 hover:bg-teal-400 text-black transition-colors',
		green:
			'bg-[#c5ecdd] transition-shadow border border-gray-300 hover:shadow-md hover:border-transparent'
	};
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class="flex justify-center items-center rounded-lg w-full h-12 px-4 {COLOR[color]} {className}"
	type={href ? undefined : type}
	{href}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
	{...$$restProps}
>
	<slot />
</svelte:element>
