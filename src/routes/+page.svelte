<script>
	import { page } from '$app/stores';
	import Button from '../components/Button.svelte';
	import headerImage from './../assets/headerImage.png';

	let url = $page.url.toString() + 'src/assets/bible.jpg';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Aplicacion de la Biblia para leer y estudiar" />
	<meta property="og:image" content={url} />
</svelte:head>

<div class="flex flex-col sm:flex-row items-center h-[100%] p-0 sm:p-6">
	<div class="flex flex-col">
		<h3 class="p-2 text-3xl">
			La aplicacion para
			<p class="study inline">Estudiar</p>
			y
			<p class="read inline">Leer</p>
			la Biblia que esperabas
		</h3>

		<div class="flex items-center gap-10 text-xl font-bold py-6">
			<Button
				href="/chapter/rv1960/genesis/1"
				color="blue"
				className="hover:scale-105 transition-transform p-8"
			>
				Estudiar la Biblia
			</Button>
			<Button href="/about" className="hover:scale-105 transition-transform p-8">
				Preguntas frecuentes
			</Button>
		</div>
	</div>

	<img src={headerImage} class="w-[100%] sm:w-[50%]" alt="study img" />
</div>

<style>
	.read {
		background: linear-gradient(120deg, #1d9bf0, #8ecdf7);
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.study {
		background: linear-gradient(120deg, #c5ecdd, #2ddb98);
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
