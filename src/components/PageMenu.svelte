<script>
	import { toastAlert } from '@/routes/alert';
	import { getLocalThemeIsDark } from '@/utils/localTheme';
	import { loadingResults, page, pattern, searchBible, searchResults, testament, versionSearch } from '@/state/search';

	function reSearch() {
		const { queryWithPage } = searchBible({ version: $versionSearch.url, testament: $testament.url });

		queryWithPage($pattern, $page)
			.then((d) => {
				searchResults.set(d);
				loadingResults.set(false);
			})
			.catch((e) => {
				console.log('fetch cancelado');
				console.error(e);
				loadingResults.set(false);
			});
	}
	/**
	 *
	 * @param {number} pageValue
	 */
	function changePage(pageValue) {
		page.set(pageValue);

		reSearch();
	}

	/**
	 * @type {number}
	 */
	/**
	 * @type {number}
	 */
	export let pageCount;

	let isMiddle = $page > 2 && $page < pageCount - 1;

	function getMiddleValue() {
		return isMiddle ? $page : Math.ceil(pageCount / 2);
	}

	$: {
		if ($page > 2 && $page < pageCount - 1) {
			isMiddle = true;
		} else {
			isMiddle = false;
		}
	}
</script>

<wc-toast />
<nav >
	<ul class="navigation inline-flex -space-x-px text-base h-10">
		<li>
			<button
				on:click={() => {
					if ($page === 1) {
						toastAlert('No hay paginas anteriores', 'error', getLocalThemeIsDark());
						return;
					}
					changePage($page - 1);
				}}
				aria-label="Anterior pagina"
				class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>Prev</button
			>
		</li>
		{#if pageCount <= 5}
			{#each { length: pageCount } as _, pg}
				<li>
					<button
						on:click={() => page.set(pg + 1)}
						class={`${
							pg === $page - 1
								? 'font-bold bg-blue-200 dark:font-normal dark:bg-blue-800 border border-gray-300:bg-gray-100:text-gray-700 dark:border-gray-700 dark:text-white'
								: ''
						} flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
						>{pg + 1}</button
					>
				</li>
			{/each}
		{:else}
			{#each { length: 2 } as _, pg}
				<li>
					<button
						on:click={() => {
							console.log(pg)
							changePage(pg + 1);
						}}
						class={`${
							pg === $page - 1
								? 'font-bold bg-blue-200 dark:font-normal dark:bg-blue-800 border border-gray-300:bg-gray-100:text-gray-700 dark:border-gray-700 dark:text-white'
								: ''
						} flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
						>{pg + 1}</button
					>
				</li>
			{/each}
			<li class="max-sm:hidden">
				<button
					class={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
					>....</button
				>
			</li>
			<li class="">
				<button
					on:click={() => {
						changePage(getMiddleValue());
					}}
					class={`${
						isMiddle 
							? 'font-bold bg-blue-200 dark:font-normal dark:bg-blue-800 border border-gray-300:bg-gray-100:text-gray-700 dark:border-gray-700 dark:text-white'
							: ''
					} flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
					>{isMiddle ? $page : Math.ceil(pageCount / 2)}</button
				>
			</li>
			<li class="max-sm:hidden">
				<button
					class={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
					>....</button
				>
			</li>
			<li>
				<button
					on:click={() => {
						changePage(pageCount - 1);
					}}
					class={`${
						pageCount - 1 === $page
							? 'font-bold bg-blue-200 dark:font-normal dark:bg-blue-800 border border-gray-300:bg-gray-100:text-gray-700 dark:border-gray-700 dark:text-white'
							: ''
					} flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
					>{pageCount - 1}</button
				>
			</li>
			<li>
				<button
					on:click={() => changePage(pageCount)}
					class={`${
						pageCount === $page
							? 'font-bold bg-blue-200 dark:font-normal dark:bg-blue-800 border border-gray-300:bg-gray-100:text-gray-700 dark:border-gray-700 dark:text-white'
							: ''
					} flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
					>{pageCount}</button
				>
			</li>
		{/if}

		<li>
			<button
				on:click={() => {
					if ($page === pageCount) {
						toastAlert('No hay paginas siguientes', 'error', getLocalThemeIsDark());
						return;
					}
					changePage($page + 1);
				}}
				aria-label="Siguiente pagina"
				class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>Sig</button
			>
		</li>
	</ul>
</nav>

<style>
	.navigation > li {
		list-style: none;
	}
</style>
