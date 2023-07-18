<script>
	import Button from '@/components/Button.svelte';
	import PageMenu from '@/components/PageMenu.svelte';
	import { TESTAMENTS, versions } from '@/constants';
	import {
		searchResults,
		pattern,
		page,
		searchBible,
		loadingResults,
		versionSearch,
		testament
	} from '@/state/search';
	import { clickOutside } from '@/utils/clickOutside';
	import { Stretch } from 'svelte-loading-spinners';

	let selectVersion = false;
	let selectTestament = false;

	/**
	 * @type {number}
	 */
	let timeout;

	/***
	 * @type {AbortController}
	 */
	let ctr;

	/**
	 *
	 * @param {string|{url: string, name: string}} value
	 * @param {string} prop
	 */
	function updateData(value, prop) {
		switch (prop) {
			case 'testament':
				if (typeof value === 'object') {
					testament.set(value);
					selectTestament = false;
				}
				break;
		}
	}

	$: {
		search($versionSearch.url, $testament.url, false);
	}

	function handleSearch() {
		search($versionSearch.url, $testament.url, true);
	}

	/**
	 *
	 * @param {string} version
	 * @param {string} testament
	 * @param {boolean|undefined} timer
	 */
	function search(version, testament, timer) {
		const getResults = () => {
			if (ctr) {
				ctr.abort();
			}

			const { query, controller } = searchBible({ version, testament });
			ctr = controller;

			query($pattern)
				.then((d) => {
					searchResults.set(d);
					loadingResults.set(false);
				})
				.catch((e) => {
					console.log('fetch cancelado');
					console.error(e);
					loadingResults.set(false);
				});
		};

		page.set(1);

		if (!$pattern) {
			return;
		}

		loadingResults.set(true);
		if (!timer) {
			getResults();
			return;
		}

		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			getResults();
		}, 500);
	}
</script>

<form class="m-2 pb-2">
	<label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
		>Search</label
	>
	<div class="relative">
		<input
			type="search"
			id="default-search"
			class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="Jesús, la verdad, pedro, etc..."
			required
			bind:value={$pattern}
			on:input={handleSearch}
		/>
		<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
			<svg
				class="w-4 h-4 text-gray-500 dark:text-gray-400"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 20"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
				/>
			</svg>
		</div>
	</div>
</form>

<div class="flex items-center gap-3">
	<div
		use:clickOutside
		on:click_outside={() => (selectTestament = false)}
		on:mouseleave={() => (selectTestament = false)}
	>
		<h4>Testamento</h4>
		<Button
			color="green"
			type="button"
			id="selectBook"
			className="w-12 dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
			on:click={() => (selectTestament = !selectTestament)}
		>
			{$testament.name === '' ? 'Antiguo y Nuevo Testamento' : $testament.name}
		</Button>

		{#if selectTestament}
			<ul
				class="list absolute flex h-fit flex-col overflow-auto rounded bg-gray-50 ring-1 ring-gray-300"
			>
				{#each TESTAMENTS as t}
					<button
						class="cursor-pointer dark:bg-[#1e293b] dark:hover:bg-[#445268] select-none p-2 hover:bg-gray-200"
						on:click={() => {
							updateData(t, 'testament');
						}}
					>
						{t.name}
					</button>
				{/each}
			</ul>
		{/if}
	</div>
	<div
		use:clickOutside
		on:click_outside={() => (selectVersion = false)}
		on:mouseleave={() => (selectVersion = false)}
	>
		<h4>Version</h4>
		<Button
			color="green"
			id="selectBook"
			className="w-12 dark:text-white dark:bg-green-800 dark:border-none dark:hover:bg-green-600"
			on:click={() => (selectVersion = !selectVersion)}
		>
			{$versionSearch.name === '' ? 'Ingresa tu version' : $versionSearch.name}
		</Button>

		{#if selectVersion}
			<ul
				class="list absolute flex h-fit flex-col overflow-auto rounded bg-gray-50 ring-1 ring-gray-300"
			>
				{#each versions as v}
					<button
						on:click={() => {
							versionSearch.set(v);
							selectVersion = false;
						}}
						class="cursor-pointer dark:bg-[#1e293b] dark:hover:bg-[#445268] select-none p-2 hover:bg-gray-200"
					>
						{v.name}
					</button>
				{/each}
			</ul>
		{/if}
	</div>
</div>

{#if $loadingResults}
	<div class="flex justify-center align-middle max-md text-center self-center">
		<section class="flex flex-col align-middle mt-4 justify-center items-center">
			<Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
			<h4>Cargando Resultados</h4>
		</section>
	</div>
{:else if $searchResults.data.vers.length === 0}
	<p>No hay resultados</p>
{:else if $searchResults.data.vers.length > 0}
	{#each $searchResults.data.vers as vers}
		<div
			class="flex gap-2 m-2 flex-col p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
		>
			{#if vers.study}
				<h4 class="text-2xl">{vers.study}</h4>
			{/if}
			<p>Pasaje: {vers.passage}</p>
			<p>{vers.verse}</p>

			<a href={vers.url} target="_blank" class="underline text-blue-500 w-fit p-2"
				>Leer este pasaje</a
			>
		</div>
	{/each}

	<div class="flex justify-center align-middle">
		<PageMenu pageCount={$searchResults.meta.pageCount} />
	</div>
{:else}
	<p>No se han podido obtener resultados</p>
{/if}
