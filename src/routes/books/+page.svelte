
<script>
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import Button from "@/components/Button.svelte"
  import { newTestament, oldTestament, versions } from "@/constants";
  import { book } from "@/state/bible"
  import { formatName } from "@/utils/chapter"
  import { scale } from "svelte/transition"

  /**
   * @type {'old' | 'new'} testament
   */
  let testament = 'old'
  const urlParam = $page.url.searchParams.get('testament')
  if (urlParam !== 'old' && urlParam !== 'new') {
	testament = 'old'
  } else {
	testament = urlParam
  }


  /**
   * 
   * @param {string} b
   */
  function setBook(b) {
	book.set(b)
	goto(`/chapters/${b.toLowerCase()}`)
  }
</script>

<section class="flex flex-col gap-6">

	<div class="flex flex-row justify-center align-middle p-4 gap-4">

		<button 
				class={`text-2xl w- select-none p-2 transition-shadow ${testament === 'old' ? 'bg-[#a8cae8]' : ''}hover:bg-[#7faddb]  hover:shadow- rounded-sm dark:bg-[#4366b2] dark:hover:bg-blue-600 ${testament === 'old' ? 'bg-[#d3eac8] dark:bg-[#4c8435] dark:hover:bg-[#afd89d] hover:bg-[#afd89d] hover:text-black' : ''}`}
		on:click={() => (testament = 'old')} >
			<span
				>
				Antiguo testamento
			</span>
		</button>
	
		<button 
				class={`text-2xl w- select-none p-2 transition-shadow hover:bg-[#7faddb]  hover:shadow- rounded-sm dark:bg-[#4366b2] dark:hover:bg-blue-600 ${testament === 'new' ? 'bg-[#d3eac8] dark:bg-[#4c8435] dark:hover:bg-[#afd89d] hover:bg-[#afd89d] hover:text-black' : ''}`}
		on:click={() => (testament = 'new')} >
			<span
	
			
				>
				Nuevo testamento
			</span>
		</button>

	</div>	

	<div transition:scale={{ duration: 300 }}>

		{#if testament === 'old'} 
			<ul class="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-10 p-6">
				{#each oldTestament as book}
					<button
						class="text-xl select-none p-4 transition-shadow bg-[#a8cae8] hover:bg-[#7faddb]  hover:shadow rounded-sm dark:bg-[#4366b2] dark:hover:bg-blue-600"
					 on:click={() => setBook(book)}>
						<span >
							{formatName(book)}
						</span>
		
					</button>
				{/each}
			</ul>
		{:else}
			<ul class="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-10 p-6">
				{#each newTestament as book}
					<button class=" text-xl max-w p-4 bg-[#a8cae8] hover:bg-[#7faddb]  hover:shadow- rounded-sm dark:bg-[#4366b2] dark:hover:bg-blue-600" on:click={() => setBook(book)}>
						<span class="select-none transition-shadow" >
							{formatName(book)}
						</span>
		
					</button>
				{/each}
			</ul>
		{/if}
	</div>

	<Button color='blue' className='self-center w-fit p-4' on:click={() => window.history.back()}>
		<span>
			Back
		</span>
		<svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/><path fill="currentColor" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/></svg>
	</Button>

</section>

