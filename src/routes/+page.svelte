<script>
	import Button from '@/components/Button.svelte';
	import headerImage from '@/assets/headerImage.png';
</script>

<div class="flex h-[100%] flex-col items-center p-0 sm:flex-row sm:p-6">
	<div class="flex flex-col">
		<h3 class="p-2 text-3xl">
			La aplicacion para
			<p class="study inline">Estudiar</p>
			y
			<p class="read inline">Leer</p>
			la Biblia que esperabas
		</h3>

		<div class="flex items-center gap-10 py-6 text-xl font-bold">
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
		background: linear-gradient(120deg, #548874, #66ed6b);
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
