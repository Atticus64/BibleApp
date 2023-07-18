<script>
	import PageMenu from '@/components/PageMenu.svelte';
	import { searchResults, pattern, page, searchBible, loadingResults } from '@/state/search';
	import { Stretch } from 'svelte-loading-spinners';
	

	/**
	 * @type {number|undefined}
	 */
	let timeout;

	/***
	 * @type {AbortController}
	 */
	let ctr;

	function handleSearch() {
		page.set(1);

		if (!$pattern) {
			return;
		}

		loadingResults.set(true);
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			if (ctr) {
				ctr.abort();
			}

			const { query, controller } = searchBible();
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

{#if $loadingResults}
	<div class="flex justify-center align-middle max-md text-center self-center">
		<section class="flex flex-col align-middle mt-4 justify-center items-center">
			<Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
			<h4>Cargando Resultados</h4>
		</section>
	</div>
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
	<p>No hay resultados</p>
{/if}
