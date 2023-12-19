
<script>
  import { goto } from "$app/navigation"
  import { versions } from "@/constants";
  import { version } from "@/state/bible"


  /**
   * 
   * @param {{url: string, name: string}} v
   */
  function setVersion(v) {
	version.set(v.url)
	goto('/books')
  }
</script>

<div>
	<h1 class="p-2 text-3xl font-bold">Versiones</h1>

	<ul class="flex flex-col gap-2 p-2">
		{#each versions as versionBible}
			<button 
					class=" text-xl max-w p-4 bg-[#a8cae8] hover:bg-[#7faddb]  hover:shadow- rounded-sm dark:bg-[#4366b2] dark:hover:bg-blue-600"
			on:click={() => setVersion(versionBible)}>
				<span>
					{versionBible.name}
				</span>

			</button>
		{/each}
	</ul>
</div>

