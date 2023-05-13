<script>
	import Navbar from '@/components/navbar/navbar.svelte';
	import '@/app.css';
</script>

<div class="flex max-w-[100vw] flex-col justify-between">
	<Navbar />

	<main class="mx-auto flex w-full max-w-screen-xl flex-col p-4">
		<slot />
	</main>

	
</div>
