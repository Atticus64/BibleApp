<script>
	import Navbar from '../components/navbar/navbar.svelte';
	import './styles.css';
</script>

<div class="flex flex-col justify-between max-w-[100vw]">
	<Navbar />

	<main class="flex flex-col p-4 w-full max-w-screen-xl mx-auto">
		<slot />
	</main>

	<footer class="flex flex-row justify-center hover:underline hover:cursor-pointer">
		<p>
			Developed with ♥ by
			<a href="https://github.com/Atticus64" class="font-bold">Jonathan</a>
		</p>
	</footer>
</div>
