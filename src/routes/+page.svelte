<script>
	import Passage from '../components/Passage.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h1 class="text-6xl">Bible App</h1>
<main class="flex flex-row align-middle justify-center items-center landing">
	<a class="link" href="/verse/rv1960/genesis/1">Estudiar la Biblia</a>
	<a class="link" href="/about">Preguntas frecuentes</a>
	<img
		src="https://img.freepik.com/free-vector/focused-tiny-people-reading-books_74855-5836.jpg?w=900&t=st=1683353870~exp=1683354470~hmac=a118ff333bf8ecf88c8de96c801219999d0ac0c06b35435c70aa5ff705954f10"
		alt="study img"
	/>
</main>

<style>
	.link {
		width: 19rem;
		text-align: center;
		height: 5rem;
		padding: 1rem;
		color: #fff;
		margin: 2rem;
		font-size: 1.2rem;
		transition: all 0.3s;
		font-weight: bold;
		background-color: rgb(36, 148, 239);
	}

	.link:hover {
		scale: 110%;
		background-color: rgb(14, 109, 187);
	}

	img {
		width: 50%;
	}

	@media (max-width: 600px) {
		.landing {
			flex-direction: column;
		}

		img {
			width: 70%;
		}

		.link {
			width: 70%;
		}
	}
</style>
