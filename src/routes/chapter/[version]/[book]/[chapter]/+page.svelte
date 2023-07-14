<script>
	/** @type {import('./$types').PageData} */
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { books, versions } from '@/constants';
	import { toastAlert } from '@/routes/alert';
	import { clickOutside } from '@/utils/clickOutside.js';
	import Button from '@/components/Button.svelte';
	import Passage from '@/components/Passage.svelte';
	import { Stretch } from 'svelte-loading-spinners';

	export let data;

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
		error = '';

		const r = await fetch(`https://bible-api.deno.dev/api/book/${book}`);
		const bookInfo = await r.json();

		if (chapters > bookInfo.chapters) {
			chapters = bookInfo.chapters;
			if (chapter > chapters) {
				chapter = 1;
				goto(`/chapter/${version}/${book}/${chapter}`);
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

			error =
				'No se encontro el capitulo, intentelo mas tarde o revise que sea correcta su busqueda';

			toastAlert('No se pudo cargar el capitulo, coloque un capitulo correcto', 'error');
			return;
		}

		loading = false;
		const chapInfo = await resp.json();
		return chapInfo;
	};

	/**
	 *
	 * @param {string} book
	 * @param {number} chapter
	 * @param {string} version
	 */
	async function handleChange(book, chapter, version) {
		localStorage.setItem(
			'bookmark',
			JSON.stringify({
				version,
				chapter,
				book
			})
		);
		goto(`/chapter/${version}/${book}/${chapter}`);
		info = await getData();
	}

	/**
	 * @param {string|number} value
	 * @param {"version"|"book"|"chapter"} prop
	 */
	function updateData(value, prop) {
		switch (prop) {
			case 'version':
				if (typeof value === 'string') {
					version = value;
					selectVersion = false;
				}
				break;
			case 'book':
				if (typeof value === 'string') {
					book = value;
					selectBook = false;
				}
				break;
			case 'chapter':
				if (typeof value === 'number') {
					chapter = value;
					selectChapter = false;
				}
				break;
		}
		handleChange(book, chapter, version).then();
	}

	/**
	 *
	 * @param {"book"|"chapter"|"version"} selector
	 */
	function unSelect(selector) {
		switch (selector) {
			case 'book':
				selectBook = !selectBook;
				break;
			case 'chapter':
				selectChapter = !selectChapter;
				break;
			case 'version':
				selectVersion = !selectVersion;
				break;
		}
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
				const [firstLetter, ...rest] = w;
				const newName = firstLetter.toUpperCase() + rest.join('');
				acc.push(newName);
			}
			return acc.join(' ');
		}

		const [firstLetter, ...rest] = name;
		return firstLetter.toUpperCase() + rest.join('');
	}

	onMount(async () => {
		info = await getData();
		chapters = info.chapters;
	});
</script>

<svelte:head>
	<title>{formatName(book)}: {chapter} - Bibliapp</title>
</svelte:head>

<div>
	<wc-toast />
	<section class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-12">
		<div class="flex flex-1 items-center gap-3">
			<div use:clickOutside on:click_outside={() => (selectVersion = false)} class="flex-1">
				<h4>Version</h4>
				<Button
					color="green"
					id="selectBook"
					className="dark:text-white dark:bg-green-500 dark:border-none dark:hover:bg-green-600"
					on:click={() => unSelect('version')}
				>
					{version === '' ? 'Selecciona tu version' : version}
				</Button>

				{#if selectVersion}
					<ul
						class="list absolute flex h-fit flex-col overflow-auto rounded bg-gray-50 ring-1 ring-gray-300"
					>
						{#each versions as v}
							<button
								class="cursor-pointer dark:bg-[#1e293b] dark:hover:bg-[#445268] select-none p-2 hover:bg-gray-200"
								on:click={() => {
									updateData(v.url, 'version');
								}}
							>
								{v.name}
							</button>
						{/each}
					</ul>
				{/if}
			</div>

			<div use:clickOutside on:click_outside={() => (selectBook = false)} class="flex-1">
				<h4>Libro</h4>
				<Button
					id="selectBook"
					on:click={() => unSelect('book')}
					color="green"
					className="dark:text-white dark:bg-green-500 dark:border-none dark:hover:bg-green-600"
				>
					{book === '' ? 'Choose Book' : formatName(book)}
				</Button>

				{#if selectBook}
					<ul
						class="list absolute flex h-[20rem] flex-col overflow-auto rounded bg-gray-50 ring-1 ring-gray-300"
					>
						{#each books as b}
							<button
								class="select-none p-2 hover:bg-gray-200 dark:bg-[#1e293b] dark:hover:bg-[#445268]"
								on:click={() => {
									updateData(b.toLowerCase(), 'book');
								}}
							>
								{b}
							</button>
						{/each}
					</ul>
				{/if}
			</div>

			<div use:clickOutside on:click_outside={() => (selectChapter = false)} class="flex-1">
				<h4>Capítulo</h4>
				<Button
					id="selectBook"
					on:click={() => unSelect('chapter')}
					color="green"
					className="w-5/12 dark:text-white dark:bg-green-500 dark:border-none dark:hover:bg-green-600"
				>
					{chapter === 0 ? 'Select your chapter' : chapter}
				</Button>

				{#if selectChapter}
					<ul
						class="list absolute flex h-[20rem] w-fit flex-col overflow-auto rounded bg-gray-50 ring-1 ring-gray-300"
					>
						{#each { length: chapters } as _, c}
							<button
								class="w-[5rem] cursor-pointer select-none p-2 dark:bg-[#1e293b] dark:hover:bg-[#445268] dark:text-white hover:bg-gray-200"
								on:click={() => {
									updateData(c + 1, 'chapter');
								}}
							>
								{c + 1}
							</button>
						{/each}
					</ul>
				{/if}
			</div>
		</div>

		<div class="flex flex-1 items-center gap-4 sm:self-end">
			<Button
				className="dark:text-white dark:bg-blue-500 dark:border-none dark:hover:bg-blue-600"
				on:click={() => {
					if (chapter - 1 <= 0) {
						toastAlert('Error ese capitulo no esta disponible', 'error');
						return;
					}
					updateData((chapter -= 1), 'chapter');
				}}
				color="blue"
			>
				Capítulo anterior
			</Button>

			<Button
				className="dark:text-white dark:bg-blue-500 dark:border-none dark:hover:bg-blue-600"
				on:click={() => {
					if (chapter + 1 > chapters) {
						toastAlert('Error ese capitulo no esta disponible', 'error');
						return;
					}
					updateData((chapter += 1), 'chapter');
				}}
				color="blue"
			>
				Siguiente capítulo
			</Button>
			<Button
				className="dark:text-white dark:bg-green-500 dark:border-none dark:hover:bg-green-600"
				on:click={() => {
					const url = `${$page.url.origin}/chapter/${version}/${book}/${chapter}`;
					navigator.clipboard
						.writeText(url)
						.then(() => {
							toastAlert('Url copiada al portapapeles', 'success');
						})
						.catch((err) => {
							toastAlert('Error al copiar url', 'error');
						});
				}}
				color="green"
			>
				Compartir capítulo
			</Button>
		</div>
	</section>

	{#if loading}
		<div class="flex justify-center align-middle max-md text-center self-center">
			<section class="flex flex-col align-middle mt-4 justify-center items-center">
				<Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
				<h4>Cargando Capítulo</h4>
			</section>
		</div>
	{/if}

	{#if !loading && !hasError && info}
		<div class="max-md">
			<h3 class="p-2 text-3xl">{formatName(book)}: {chapter}</h3>
			<Passage {info} />
		</div>
	{/if}
</div>

{#if hasError}
	<div>
		<h4><b> Ha ocurrido un error </b></h4>
		<p>
			{error}
		</p>
		<img
			src="https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=170667a&w=0&k=20&c=gsR5TEhp1tfg-qj1DAYdghj9NfM0ldfNEMJUfAzHGtU="
			alt=""
		/>
	</div>
{/if}

<style>
</style>
