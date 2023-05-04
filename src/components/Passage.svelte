<script script>
	import { onMount } from 'svelte';
	import { ALERT_TYPES, toastAlert } from '../routes/alert';
	import { clickOutside } from '../utils/clickOutside.js';

	let book = 'genesis';

	const books = [
		'Genesis',
		'Exodo',
		'Levitico',
		'Numeros',
		'Deuteronomio',
		'Josue',
		'Jueces',
		'Rut',
		'1-Samuel',
		'2-Samuel',
		'1-Reyes',
		'2-Reyes',
		'1-Cronicas',
		'2-Cronicas',
		'Esdras',
		'Nehemias',
		'Ester',
		'Job',
		'Salmos',
		'Proverbios',
		'Eclesiastes',
		'Cantares',
		'Isaias',
		'Jeremias',
		'Lamentaciones',
		'Ezequiel',
		'Daniel',
		'Oseas',
		'Joel',
		'Amos',
		'Abdias',
		'Jonas',
		'Miqueas',
		'Nahum',
		'Habacuc',
		'Sofonias',
		'Hageo',
		'Zacarias',
		'Malaquias',
		'Mateo',
		'Marcos',
		'Lucas',
		'Juan',
		'Hechos',
		'Romanos',
		'1-Corintios',
		'2-Corintios',
		'Galatas',
		'Efesios',
		'Filipenses',
		'Colosenses',
		'1-Tesalonicenses',
		'2-Tesalonicenses',
		'1-Timoteo',
		'2-Timoteo',
		'Tito',
		'Filemon',
		'Hebreos',
		'Santiago',
		'1-Pedro',
		'2-Pedro',
		'1-Juan',
		'2-Juan',
		'3-Juan',
		'Judas',
		'Apocalipsis'
	];

	let loading = true;
	let hasError = false;
	let error = '';
	let selectBook = false;
	let selectChapter = false;
	let selectVersion = false;

	let data = {
		chapters: 50,
		testament: 'Antiguo Testamento',
		name: 'Genesis',
		chapter: '',
		vers: [
			{
				study: '',
				number: 0,
				verse: ''
			}
		]
	};

	let chapters = 55;
	let chapter = 0;
	let versions = [
		{
			url: 'rv1960',
			name: 'Reina Valera 1960'
		},
		{
			url: 'rv1995',
			name: 'Reina Valera 1995'
		},
		{
			url: 'nvi',
			name: 'Nueva Version Internacional'
		},
		{
			url: 'dhh',
			name: 'Dios Habla Hoy'
		}
	];
	let version = {
		name: '',
		url: ''
	};

	const getData = async () => {
		if (book === '') return;
		hasError = false;

		const r = await fetch(`https://bible-api.deno.dev/api/book/${book}`);
		const bookInfo = await r.json();

		if (chapters > bookInfo.chapters) {
			chapters = bookInfo.chapters;
			if (chapter > chapters) {
				chapter = 1;
			}
		}

		loading = true;
		const resp = await fetch(
			`https://bible-api.deno.dev/api/${version.url === '' ? 'rv1960' : version.url}/book/${book}/${
				chapter != 0 ? chapter : '1'
			}`
		);

		if (!resp.ok) {
			loading = false;
			hasError = true;
			const errorJson = await resp.json();

			if (errorJson.message === 'Not found') {
				error = 'Not found';
			}

			toastAlert('No se pudo cargar el capitulo, coloque un capitulo correcto', ALERT_TYPES.ERROR);
			return;
		}

		loading = false;
		const data = await resp.json();
		return data;
	};

	async function handleChange() {
		const data = await getData();

		chapters = data.chapters;

		return data;
	}

	$: {
		(async () => {
			if (book !== '' || chapter !== 0 || version.name !== '') {
				data = await handleChange();
			}
		})();
	}

	function setBook(b = '') {
		book = b;
		selectBook = false;
	}

	function setVersion(v = { name: '', url: '' }) {
		version = v;
		selectVersion = false;
	}

	function setChapter(c = 0) {
		chapter = c;
		selectChapter = false;
	}

	function unselectBook() {
		selectBook = !selectBook;
	}

	function unselectChapter() {
		selectChapter = !selectChapter;
	}

	function unselectVersion() {
		selectVersion = !selectVersion;
	}

	/**
	 *
	 * @param {string} name
	 */
	function formatName(name) {
		if (name.includes('-')) {
			const words = name.split('-');
			const acc = [];
			for (const w of words) {
				const [l, ...rest] = w;
				const newName = l.toUpperCase() + rest.join('');
				acc.push(newName);
			}
			return acc.join(' ');
		}

		const [l, ...rest] = name;
		return l.toUpperCase() + rest.join('');
	}

	onMount(async () => {
		const resp = await fetch(`https://bible-api.deno.dev/api/rv1960/book/genesis/1`);

		const chapter = await resp.json();
		loading = false;
		data = chapter;
	});
</script>

<div>
	<!--<SvelteToast />-->
	<h1 class="text-6xl">Bible App</h1>

	<wc-toast />
	<section class="flex flex-row">
		<div class="p-2 m-2">
			<div
				use:clickOutside
				on:click_outside={() => {
					selectVersion = false;
				}}
			>
				<h4>Version</h4>
				<button
					id="selectBook"
					type="button"
					class="flex items-center justify-between rounded p-2 bg-white ring-1 ring-gray-300"
					on:click={unselectVersion}
				>
					{version.name === '' ? 'Select your version' : version.name}
				</button>

				{#if selectVersion}
					<ul
						class="h-[17.5rem] ring-1 ring-gray-300 absolute overflow-auto flex flex-col list rounded bg-gray-50"
					>
						{#each versions as v}
							<button
								class="cursor-pointer select-none p-2 hover:bg-gray-200"
								on:click={() => {
									setVersion(v);
								}}
							>
								{v.name}
							</button>
						{/each}
					</ul>
				{/if}
			</div>
		</div>

		<div class="p-2 m-2">
			<div
				use:clickOutside
				on:click_outside={() => {
					selectBook = false;
				}}
			>
				<h4>Book</h4>
				<button
					id="selectBook"
					type="button"
					class="cursor-pointer block p-2 rounded ring-1 ring-gray-300 bg-white text-center"
					on:click={unselectBook}
				>
					{book === '' ? 'Choose Book' : book}
				</button>

				{#if selectBook}
					<ul
						class="h-[20rem] absolute overflow-auto flex flex-col list rounded bg-gray-50 ring-1 ring-gray-300"
					>
						{#each books as book}
							<button
								class="select-none p-2 hover:bg-gray-200"
								on:click={() => {
									setBook(book.toLowerCase());
								}}
							>
								{book}
							</button>
						{/each}
					</ul>
				{/if}
			</div>
		</div>

		<div class="p-2 m-2">
			<div
				use:clickOutside
				on:click_outside={() => {
					selectChapter = false;
				}}
			>
				<h4>Chapter</h4>
				<button
					id="selectBook"
					type="button"
					class="flex items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300"
					on:click={unselectChapter}
				>
					{chapter === 0 ? 'Select your chapter' : chapter}
				</button>

				{#if selectChapter}
					<ul
						class="h-[20rem] w-[10rem] absolute overflow-auto flex flex-col list rounded bg-gray-50 ring-1 ring-gray-300"
					>
						{#each { length: chapters } as _, c}
							<button
								class="cursor-pointer w-[5rem] select-none p-2 hover:bg-gray-200"
								on:click={() => {
									setChapter(c + 1);
								}}
							>
								{c + 1}
							</button>
						{/each}
					</ul>
				{/if}
			</div>
		</div>

		<button
			class="btn-menu"
			on:click={() => {
				if (chapter - 1 <= 0) {
					toastAlert('Error ese capitulo no esta disponible', ALERT_TYPES.ERROR);
					return;
				}
				chapter -= 1;
			}}>Capitulo anterior</button
		>

		<button
			class="btn-menu"
			on:click={() => {
				if (chapter + 1 > chapters) {
					toastAlert('Error ese capitulo no esta disponible', ALERT_TYPES.ERROR);
					return;
				}
				chapter += 1;
			}}>Siguiente capitulo</button
		>
	</section>

	{#if loading}
		<p>cargando...</p>
	{/if}

	{#if !loading && !hasError}
		<div>
			<h3>{formatName(book)}: {data.chapter}</h3>
			{#each data.vers as v}
				{#if v.study}
					<h4>{v.study}</h4>
				{/if}
				<p>
					<b>
						{v.number}
					</b>
					{v.verse}
				</p>
			{/each}
		</div>
	{/if}
</div>

<style>
	input:focus,
	textarea:focus,
	select:focus {
		outline: none;
	}

	.list {
		width: min-content;
	}

	.btn-menu {
		padding: 1rem;
		height: 4rem;
		margin-left: 1rem;
		margin-right: 1rem;
		margin-top: 1rem;
		border: 1px solid #cecece;
	}

	.btn-menu:hover {
		--tw-bg-opacity: 1;
		background-color: rgb(229 231 235 / var(--tw-bg-opacity));
	}
</style>
