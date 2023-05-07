<script>
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main class="flex items-center land-menu">
	<div class="flex flex-col">
		<h3 class="text-4xl p-2 phrase">
			La aplicacion para <b class="study">Estudiar</b> y <b class="read">Leer</b> la Biblia que esperabas
		</h3>
		<div class="flex">
			<a class="link btn-study" href="/chapter/rv1960/genesis/1">Estudiar la Biblia</a>
			<a class="link btn-faq" href="/about">Preguntas frecuentes</a>
		</div>
	</div>
	<img
		src="https://cdni.iconscout.com/illustration/premium/thumb/online-study-2710520-2261196.png"
		alt="study img"
	/>
</main>

<style>
	:root {
		--blue-bg: #7ecffb;
		--green-bg: #c5ecdd;
	}

	.btn-study {
		background-color: var(--blue-bg);
	}

	.btn-study:hover {
		background-color: #36aff0;
	}

	.btn-faq {
		background-color: var(--green-bg);
	}

	.btn-faq:hover {
		background-color: #2ddb98;
	}

	.read {
		background: linear-gradient(120deg, #1d9bf0, #8ecdf7);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.study {
		background: linear-gradient(120deg, var(--green-bg), #2ddb98);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.link {
		width: 19rem;
		text-align: center;
		padding: 1rem;
		border-radius: 1rem;
		color: #000;
		margin: 2rem;
		font-size: 1.2rem;
		transition: all 0.3s;
		font-weight: bold;
	}

	.link:hover {
		scale: 110%;
	}

	img {
		width: 50%;
	}

	@media (max-width: 900px) {
		.landing {
			flex-direction: column;
		}

		.land-menu {
			flex-direction: column;
		}

		.phrase {
			font-size: xx-large;
		}

		img {
			width: 70%;
		}

		.link {
			width: 70%;
		}
	}
</style>
