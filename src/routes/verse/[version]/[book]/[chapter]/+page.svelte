<script>
	/** @type {import('./$types').PageData} */
	import { onMount } from 'svelte';
	import { ALERT_TYPES, toastAlert } from '../../../../alert';
	import { clickOutside } from '../../../../../utils/clickOutside.js';
	import { goto } from '$app/navigation';
	import { books, versions } from '../../../../../constants';
	import Passage from '../../../../../components/Passage.svelte';

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
				goto(`/verse/${version}/${book}/${chapter}`);
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

			toastAlert('No se pudo cargar el capitulo, coloque un capitulo correcto', ALERT_TYPES.ERROR);
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
		goto(`/verse/${version}/${book}/${chapter}`);
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
					on:click={() => unSelect('version')}
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
									updateData(v.url, 'version');
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
					on:click={() => unSelect('book')}
				>
					{book === '' ? 'Choose Book' : formatName(book)}
				</button>

				{#if selectBook}
					<ul
						class="h-[20rem] absolute overflow-auto flex flex-col list rounded bg-gray-50 ring-1 ring-gray-300"
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
					on:click={() => unSelect('chapter')}
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

		<button
			class="btn-menu"
			on:click={() => {
				if (chapter - 1 <= 0) {
					toastAlert('Error ese capitulo no esta disponible', ALERT_TYPES.ERROR);
					return;
				}
				updateData((chapter -= 1), 'chapter');
			}}>Capitulo anterior</button
		>

		<button
			class="btn-menu"
			on:click={() => {
				if (chapter + 1 > chapters) {
					toastAlert('Error ese capitulo no esta disponible', ALERT_TYPES.ERROR);
					return;
				}
				updateData((chapter += 1), 'chapter');
			}}>Siguiente capitulo</button
		>
	</section>

	{#if loading}
		<div class="max-md">
			<div class="loader" />
		</div>
	{/if}

	{#if !loading && !hasError && info}
		<div class="max-md">
			<h3 class="text-3xl p-2">{formatName(book)}: {chapter}</h3>
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
