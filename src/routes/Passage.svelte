<script script>
	let book = 'genesis';
	//import { toast } from 'wc-toast';
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

		const resp = await fetch(
			`https://bible-api.deno.dev/api/${version === '' ? 'rv1960' : version}/book/${book}/${
				chapter != 0 ? chapter : '1'
			}`
		);

		if (!resp.ok) {
			const error = await resp.json();

			if (error.message === 'Not found') {
			}
			return;
		}

		const data = await resp.json();
		return data;
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
				d = await handleChange();
			}
		})();
	}

	function handleSelect() {
		if (selected != '') {
			book = selected;
		}
	}

	let count = 0;
	let d = handleChange();
</script>

<div>
	<wc-toast />
	<button on:click={handleChange}>Change</button>
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

	<div>
		{#await d}
			<p>waiting</p>
		{:then d}
			<h3>{book.toUpperCase()} {d.chapter}</h3>
			{#each d.vers as v}
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
</div>

<style>
</style>
