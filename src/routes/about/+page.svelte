<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column questions grid gap-2">
	<div>
		<h2 class="question p-2 text-3xl font-bold">
			¿Que versiones de la Biblia contiene la aplicación?
		</h2>
		<div class="text-2xl">
			<p>La aplicación contiene las versiones:</p>
			<ul>
				<li>Reina Valera 1960</li>
				<li>Reina Valera 1995</li>
				<li>Nueva Version Internacional</li>
				<li>Dios Habla Hoy</li>
			</ul>
		</div>
		<h2 class="question p-2 text-3xl font-bold">¿La informacion proviene de una API?</h2>
		<div class="text-2xl">
			<p>
				Si utilizo una API que desarrolle, se llama BibleApi que es open-source y cualquiera la
				puede utilizar
			</p>
			<ul>
				<li>
					<a href="https://bible-api.deno.dev/api" target="_blank" class="text-blue-400 underline"
						>API</a
					>
				</li>
				<li>
					<a
						href="https://github.com/Atticus64/Bible-Api"
						target="_blank"
						class="text-blue-400 underline">Codigo fuente del API</a
					>
				</li>
			</ul>
		</div>
	</div>
	<div>
		<h2 class="question p-2 text-3xl font-bold">¿Tienes algun problema con la aplicación?</h2>
		<div class="text-2xl">
			<p>
				Comunicate al correo
				<a href="mailto:hackelian64@gmail.com" class="hover:text-green-600 hover:underline">
					hackelian64@gmail.com
				</a>

				O tambien puedes abrir un issue en
				<a
					href="https://github.com/Atticus64/BibleApp/issues/new"
					class="hover:text-blue-600 hover:underline"
				>
					github
				</a>

				Y lo arreglare en la medida de lo posible 😄
			</p>
			<p />
		</div>
	</div>
</div>

<style>
	p {
		max-width: 75ch;
	}

	li {
		list-style: circle;
		margin-left: 2rem;
	}

	.questions {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 800px) {
		.questions {
			grid-template-columns: repeat(1, 1fr);
		}

		p {
			font-size: medium;
		}

		.question {
			font-size: x-large;
		}
	}
</style>
