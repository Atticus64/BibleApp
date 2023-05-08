<script>
	import headerImage from "./../assets/headerImage.png"
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="flex flex-col sm:flex-row items-center h-[100%] p-0 sm:p-6">
	<div class="flex flex-col">
		<h3 class="p-2 text-3xl">
			La aplicacion para
			<p class="study inline">Estudiar</p> y
			<p class="read inline">Leer</p> la Biblia que esperabas
		</h3>

		<div class="flex items-center gap-10 text-xl font-bold py-6 px-2">
			<a
			href="/chapter/rv1960/genesis/1"
			class="flex justify-center items-center rounded-[10px] w-[100%] h-[50px] bg-blue-500 hover:scale-110 hover:bg-blue-700 transition text-center">
			Estudiar la Biblia</a>

			<a
			class="flex justify-center items-center rounded-[10px] w-[100%] h-[50px] bg-teal-200 hover:scale-110 hover:bg-teal-400 transition text-center"
			href="/about">
			Preguntas frecuentes</a>
		</div>
	</div>

	<img
		src={headerImage}
		class="w-[100%] sm:w-[50%]"
		alt="study img"
	/>
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
