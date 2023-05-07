<script>
	import Navbar from '../components/navbar/navbar.svelte';
	import './styles.css';
</script>

<div class="flex flex-col justify-between max-w-[100vw] min-h-[100vh]">
	<Navbar />

	<main class="flex flex-col p-[1rem] w-[100%] max-w-[1360px] mx-[auto]">
		<slot />
	</main>

	<footer class="flex flex-row justify-center">
		<p>This app was developed in 
			<a
			href="https://kit.svelte.dev"
			class="font-bold"
			>SvelteKit</a>
		</p>
	</footer>
</div>
