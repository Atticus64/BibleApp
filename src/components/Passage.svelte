<script>
	export let info = {
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
</script>

{#each info.vers as v}
	{#if v.study}
		<h3 class="p-2 text-2xl">{v.study}</h3>
	{/if}
	<p class="verse text-xl">
		<b>
			{v.number}
		</b>
		{v.verse}
	</p>
{/each}

<style>
	.verse {
		max-width: 75ch;
	}

	.verse {
		font-size: large;
	}

	@media (max-width: 800px) {
		.verse {
			font-size: medium;
		}
	}
</style>
