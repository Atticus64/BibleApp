<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { books, versions } from '@/constants';
	import { toastAlert } from '@/routes/alert';
	import { clickOutside } from '@/utils/clickOutside.js';
	import Button from '@/components/Button.svelte';
	import Passage from '@/components/Passage.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { Stretch } from 'svelte-loading-spinners';
	import { Draft, studyMode } from '@/state/study';
	import { user } from '@/state/user';
	import { getLocalThemeIsDark } from '@/utils/localTheme';

	/**
	 * @type {boolean}
	 */
	export let wantBookMark = false;

	/**
	 * @type {string}
	 */
	export let version = 'rv1960';

	/**
	 * @type {string}
	 */
	export let book = 'genesis';

	/**
	 * @type {number}
	 */
	export let chapter = 1;

	let md =
		$Draft.body.length === 0
			? `# titulo 1 
## titulo 2 
### titulo 3
---
* lista
* desordenada 
---
1. lista
2. ordenada
---
**imagen**

*lista*
![](https://i.postimg.cc/wBZFwwBN/boat.jpg)`
			: $Draft.body;

	$: {
		Draft.update((u) => {
			u.body = md;
			return u;
		});
	}

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

			toastAlert(
				'No se pudo cargar el capitulo, coloque un capitulo correcto',
				'error',
				getLocalThemeIsDark()
			);
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

	function isValidNote() {
		if (!$user.loggedIn) {
			toastAlert('Necesitas estar autenticado para crear notas', 'error', getLocalThemeIsDark());
			return false;
		}

		if ($Draft.body.length < 20) {
			toastAlert('El texto debe ser mayor o igual a 20 caracteres', 'error', getLocalThemeIsDark());
			return false;
		}

		if ($Draft.title.length < 8) {
			toastAlert('El titulo debe ser mayor o igual a 8 caracteres', 'error', getLocalThemeIsDark());
			return false;
		}

		if ($Draft.title.length > 40) {
			toastAlert('El titulo debe ser menor a 40 caracteres', 'error', getLocalThemeIsDark());
			return false;
		}

		if ($Draft.description.length < 10) {
			toastAlert('La descripcion debe ser mayor a 10 caracteres', 'error', getLocalThemeIsDark());
			return false;
		}

		return true;
	}

	function getCurrentPage() {
		return `${$page.url.origin}/chapter/${version}/${book}/${chapter}`;
	}

	async function submitNote(e) {
		if (!isValidNote()) {
			return;
		}

		const formData = Object.fromEntries(new FormData(e.target));

		if ($Draft.id !== '') {
			updateNote(formData);
			return;
		}

		createNote(formData);
	}

	async function handleNewNote(e) {
		if (!isValidNote()) {
			return;
		}

		const formData = {
			title: $Draft.title,
			body: $Draft.body,
			description: $Draft.description
		};
		createNote(formData);
	}

	/**
	 *
	 * @param {{ [k: string]: FormDataEntryValue }} formData
	 */
	async function updateNote(formData) {
		console.log(formData);
		if ($Draft.id !== '') {
			const res = await fetch(`https://bible-api.deno.dev/notes/${$Draft.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(formData)
			});

			if (!res.ok) {
				toastAlert('No se pudo guardar la nota', 'error', getLocalThemeIsDark());
				return;
			}

			toastAlert('Nota actualizada', 'success', getLocalThemeIsDark());

			return;
		}
	}

	/**
	 *
	 * @param {{ [k: string]: FormDataEntryValue }} formData
	 */
	async function createNote(formData) {
		formData.page = getCurrentPage();
		const response = await fetch('https://bible-api.deno.dev/notes/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(formData)
		});

		if (!response.ok) {
			toastAlert('No se pudo crear la nota', 'error', getLocalThemeIsDark());
			return;
		}

		toastAlert('Nota creada', 'success', getLocalThemeIsDark());

		const data = await response.json();

		Draft.set({
			id: data.id,
			title: $Draft.title,
			body: $Draft.body,
			description: $Draft.description
		});
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
		if (wantBookMark) {
			const bkString = localStorage.getItem('bookmark');

			if (bkString) {
				const bkmark = JSON.parse(bkString);

				book = bkmark.book;
				version = bkmark.version;
				chapter = bkmark.chapter;
			}
		}

		info = await getData();
		chapters = info.chapters;
	});
</script>

<svelte:head>
	<title>{formatName(book)}: {chapter} - Bibliapp</title>
</svelte:head>

<div class="w-full">
	<wc-toast />
	<section class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-12">
		<div class="flex items-center gap-3">
			<div use:clickOutside on:click_outside={() => (selectVersion = false)}>
				<h4>Version</h4>
				<Button
					color="green"
					id="selectBook"
					className="w-12 dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
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

			<div use:clickOutside on:click_outside={() => (selectBook = false)} class="">
				<h4>Libro</h4>
				<Button
					id="selectBook"
					on:click={() => unSelect('book')}
					color="green"
					className="w-10 m-0 dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
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

			<div use:clickOutside on:click_outside={() => (selectChapter = false)} class="">
				<h4>Capítulo</h4>
				<Button
					id="selectBook"
					on:click={() => unSelect('chapter')}
					color="green"
					className="w-5/12 dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
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

		<div class="flex items-center gap-4 sm:self-end">
			<Button
				id="selectBook"
				on:click={() => studyMode.set(!$studyMode)}
				className={$studyMode
					? 'bg-yellow-500 hover:bg-yellow-400  max-lg:hidden text-black'
					: 'bg-green-600 hover:bg-classNamegreen-400 max-lg:hidden  text-black'}
			>
				{$studyMode ? 'Modo Estudio Activo' : 'Modo Lectura activo'}
			</Button>
			<Button
				className="dark:text-white dark:bg-blue-500 dark:border-none dark:hover:bg-blue-600"
				on:click={async () => {
					if (chapter - 1 <= 0) {
						toastAlert('Error ese capitulo no esta disponible', 'error', getLocalThemeIsDark());
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
						toastAlert('Error ese capitulo no esta disponible', 'error', getLocalThemeIsDark());
						return;
					}
					updateData((chapter += 1), 'chapter');
				}}
				color="blue"
			>
				Siguiente capítulo
			</Button>
			<Button
				className="dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
				on:click={() => {
					const url = `${$page.url.origin}/chapter/${version}/${book}/${chapter}`;
					navigator.clipboard
						.writeText(url)
						.then(() => {
							toastAlert('Url copiada al portapapeles', 'success', getLocalThemeIsDark());
						})
						.catch((err) => {
							toastAlert('Error al copiar url', 'error', getLocalThemeIsDark());
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
		<div class="max-w-full flex flex-row">
			<section class={$studyMode ? '2xl:w-2/4 xl:w-1/2 max-w-full' : 'max-w-full w-full'}>
				<h3 class="p-2 text-3xl">{formatName(book)}: {chapter}</h3>
				<Passage studyMode={$studyMode} {info} />
			</section>

			{#if $studyMode}
				<section class="xl:w-1/2 xl:max-w-full 2xl:w-1/2 2xl:max-w-full max-lg:hidden">
					<div class="p-4 h-[13rem] m-10 justify-center overflow-auto">
						<SvelteMarkdown source={md} />
					</div>
					<div class="h-[26rem]">
						<form on:submit|preventDefault={submitNote}>
							<div class="">
								<label
									for="title"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo</label
								>
								<input
									type="text"
									id="title"
									name="title"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="titulo de mi nota"
									bind:value={$Draft.title}
									required
								/>
							</div>
							<div>
								<label
									for="description"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>Descripción</label
								>
								<input
									type="text"
									name="description"
									id="description"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="descripción de mi nota"
									required
									bind:value={$Draft.description}
								/>
							</div>
							<textarea
								name="body"
								class="mt-2 w-full h-[15rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								bind:value={md}
							/>

							<div class="flex flex-row justify-end gap-4">
								<Button type="submit">Guardar nota</Button>
								<Button on:click={handleNewNote}>Crear Nueva Nota</Button>
							</div>
						</form>
					</div>
				</section>
			{/if}
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
