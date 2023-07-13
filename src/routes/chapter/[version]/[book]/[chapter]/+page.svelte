<script>
	/** @type {import('./$types').PageData} */
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { books, versions } from '@/constants';
	import { toastAlert } from '@/routes/alert';
	import { clickOutside } from '@/utils/clickOutside.js';
	import Button from '@/components/Button.svelte';
	import Passage from '@/components/Passage.svelte';

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
		const bkString = localStorage.getItem('bookmark');

		if (bkString) {
			const bkmark = JSON.parse(bkString);

			book = bkmark.book;
			version = bkmark.version;
			chapter = bkmark.chapter;
		}

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
				<Button color="green" id="selectBook" on:click={() => unSelect('version')}>
					{version === '' ? 'Select your version' : version}
				</Button>

				{#if selectVersion}
					<ul
						class="list absolute flex h-[17.5rem] flex-col overflow-auto rounded bg-gray-50 ring-1 ring-gray-300"
					>
						{#each versions as v}
							<button
								class="cursor-pointer select-none p-2 hover:bg-gray-200"
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
				<h4>Book</h4>
				<Button id="selectBook" on:click={() => unSelect('book')} color="green">
					{book === '' ? 'Choose Book' : formatName(book)}
				</Button>

				{#if selectBook}
					<ul
						class="list absolute flex h-[20rem] flex-col overflow-auto rounded bg-gray-50 ring-1 ring-gray-300"
					>
						{#each books as b}
							<button
								class="select-none p-2 hover:bg-gray-200"
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
				<h4>Chapter</h4>
				<Button id="selectBook" on:click={() => unSelect('chapter')} color="green">
					{chapter === 0 ? 'Select your chapter' : chapter}
				</Button>

				{#if selectChapter}
					<ul
						class="list absolute flex h-[20rem] w-[10rem] flex-col overflow-auto rounded bg-gray-50 ring-1 ring-gray-300"
					>
						{#each { length: chapters } as _, c}
							<button
								class="w-[5rem] cursor-pointer select-none p-2 hover:bg-gray-200"
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
				on:click={() => {
					if (chapter - 1 <= 0) {
						toastAlert('Error ese capitulo no esta disponible', 'error');
						return;
					}
					updateData((chapter -= 1), 'chapter');
				}}
				color="blue"
			>
				Capitulo anterior
			</Button>

			<Button
				on:click={() => {
					if (chapter + 1 > chapters) {
						toastAlert('Error ese capitulo no esta disponible', 'error');
						return;
					}
					updateData((chapter += 1), 'chapter');
				}}
				color="blue"
			>
				Siguiente capitulo
			</Button>
		</div>
	</section>

	{#if loading}
		<div class="max-md">
			<div class="loader" />
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
	:root {
		--load-color: #e37b4f;
	}

	.loader {
		width: 48px;
		height: 48px;
		display: inline-block;
		position: relative;
		border: 3px solid;
		border-color: #0090de #0000 var(--load-color) #0000;
		border-radius: 50%;
		box-sizing: border-box;
		animation: 1s rotate linear infinite;
	}
	.loader:before,
	.loader:after {
		content: '';
		top: 0;
		left: 0;
		position: absolute;
		border: 10px solid transparent;
		border-bottom-color: var(--load-color);
		transform: translate(-10px, 19px) rotate(-35deg);
	}
	.loader:after {
		border-color: #0090de #0000 #0000;
		transform: translate(32px, 3px) rotate(-35deg);
	}
	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	.list {
		width: min-content;
	}

	:root {
		--blue-bg: #7ecffb;
		--green-bg: #c5ecdd;
	}
</style>
