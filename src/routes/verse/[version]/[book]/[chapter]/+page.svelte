<script>
	/** @type {import('./$types').PageData} */
	import { onMount } from 'svelte';
	import { ALERT_TYPES, toastAlert } from '../../../../alert';
	import { clickOutside } from '../../../../../utils/clickOutside.js';
	import { books, versions } from '../../../../../constants';

	export let data;

	function bar() {
		window.location.pathname = `verse/${version}/${book}/${chapter}`;
	}

	let book = data.params.book;
	let version = data.params.version;

	let loading = true;
	let hasError = false;
	let error = '';
	let selectBook = false;
	let selectChapter = false;
	let selectVersion = false;

	let info = {
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
	let chapter = Number(data.params.chapter);

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
			`https://bible-api.deno.dev/api/${
				version === '' ? 'rv1960' : version
			}/book/${book}/${chapter}`
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
		const info = await resp.json();
		return info;
	};

	/**
	 *
	 * @param {string} book
	 * @param {number} chapter
	 * @param {string} version
	 */
	function handleChange(book, chapter, version) {
		//(async () => {
		//	if (book !== '' || chapter !== 0 || version !== '') {
		//		info = await getData();
		//		chapters = info.chapters;
		//	}
		//})();
	}

	$: {
		handleChange(book, chapter, version);
	}

	function setBook(b = '') {
		book = b;
		selectBook = false;
		window.location.pathname = `/verse/${version}/${book}/${chapter}`;
	}

	function setVersion(v = '') {
		version = v;
		selectVersion = false;
		window.location.pathname = `/verse/${version}/${book}/${chapter}`;
	}

	function setChapter(c = 0) {
		chapter = c;
		selectChapter = false;
		window.location.pathname = `/verse/${version}/${book}/${chapter}`;
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
		info = await getData();
		chapters = info.chapters;
	});
</script>

<div>
	<!--<SvelteToast />-->
	<h1 class="text-6xl">Bible App</h1>

	<wc-toast />
	<section class="flex flex-row menu m-2">
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
					{version === '' ? 'Select your version' : version}
				</button>

				{#if selectVersion}
					<ul
						class="h-[17.5rem] ring-1 ring-gray-300 absolute overflow-auto flex flex-col list rounded bg-gray-50"
					>
						{#each versions as v}
							<button
								class="cursor-pointer select-none p-2 hover:bg-gray-200"
								on:click={() => {
									setVersion(v.url);
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
					{book === '' ? 'Choose Book' : formatName(book)}
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
					class="flex items-center w-[4rem] text-center justify-center rounded bg-white p-2 ring-1 ring-gray-300"
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
				setChapter((chapter -= 1));
			}}>Capitulo anterior</button
		>

		<button
			class="btn-menu"
			on:click={() => {
				if (chapter + 1 > chapters) {
					toastAlert('Error ese capitulo no esta disponible', ALERT_TYPES.ERROR);
					return;
				}
				setChapter((chapter += 1));
			}}>Siguiente capitulo</button
		>
	</section>

	{#if loading}
		<div class="max-md">
			<p>cargando capitulo...</p>
		</div>
	{/if}

	{#if !loading && !hasError}
		<div class="max-md">
			<h3 class="text-3xl p-2">{formatName(book)}: {chapter}</h3>
			{#each info.vers as v}
				{#if v.study}
					<h3 class="text-2xl p-2">{v.study}</h3>
				{/if}
				<p class="text-xl">
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

	@media (max-width: 800px) {
		.menu {
			flex-direction: column;
		}

		.btn-menu {
			width: 55%;
			margin-top: 1rem;
		}
	}
</style>
