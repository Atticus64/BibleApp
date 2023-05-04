<script script>
	import { onMount } from 'svelte';
	import { ALERT_TYPES, toastAlert } from './alert';

	let book = 'genesis';
	//import { toast, SvelteToast } from '@zerodevx/svelte-toast';

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
	let version = '';

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
			`https://bible-api.deno.dev/api/${version === '' ? 'rv1960' : version}/book/${book}/${
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

	const handleClick = async () => {
		toastAlert('click', ALERT_TYPES.ERROR);
	};

	async function handleChange() {
		const data = await getData();

		chapters = data.chapters;

		return data;
	}

	let selected = '';

	$: {
		(async () => {
			if (book !== '' || chapter !== 0 || version !== '') {
				data = await handleChange();
			}
		})();
	}

	function handleSelect() {
		if (selected != '') {
			book = selected;
		}
	}

	let count = 0;

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
	<button on:click={handleClick} class="hover:bg-red-700 p-5 bg-blue-600 text-white">Change</button>
	<select
		name="book"
		bind:value={selected}
		placeholder="book"
		on:change={handleSelect}
		id="book-select"
	>
		{#each books as b}
			<option value={b.toLowerCase()}>{b}</option>
		{/each}

		<option value="" disabled selected>Select your book</option>
	</select>

	<select name="chapter" id="chapter-select" bind:value={chapter}>
		<option value="" disabled selected>Select your chapter</option>
		{#each { length: chapters } as _, i}
			<option value={i + 1}>{i + 1}</option>
		{/each}
	</select>

	<select name="version" id="chapter-select" bind:value={version}>
		<option value="" disabled selected>Select your version</option>
		{#each versions as v}
			<option value={v.url}>{v.name}</option>
		{/each}
	</select>

	{#if loading}
		<p>cargando...</p>
	{/if}

	{#if !loading && !hasError}
		<div>
			{#await data}
				<p>waiting</p>
			{:then data}
				<h3>{book.toUpperCase()} {data.chapter}</h3>
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
			{/await}
		</div>
	{/if}
</div>

<style>
</style>
