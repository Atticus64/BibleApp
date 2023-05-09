<script>
	import Navbar from '@/components/navbar/navbar.svelte';
	import './styles.css';
</script>

<div class="flex max-w-[100vw] flex-col justify-between">
	<Navbar />

	<main class="mx-auto flex w-full max-w-screen-xl flex-col p-4">
		<slot />
	</main>

	<footer class="flex flex-row justify-center hover:cursor-pointer hover:underline">
		<p>
			Developed with ♥ by
			<a href="https://github.com/Atticus64" class="font-bold">Jonathan</a>
		</p>
	</footer>
</div>
