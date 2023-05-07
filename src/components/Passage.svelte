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
		<h3 class="text-2xl p-2">{v.study}</h3>
	{/if}
	<p class="text-xl verse">
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
</style>
