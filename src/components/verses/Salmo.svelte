<script>
import { onMount } from 'svelte'
  import Atropos from 'atropos'

  
  export let clase = ''
  export let verseClass = ''
  onMount(() => {
	const myAtropos = Atropos({
	  el: '.salmo-atropos',
	  activeOffset: 20,
      shadowScale: 0.95,
	  rotateTouch: false,
	  shadowOffset: 50,
	  // rest of parameters
	});
  })

</script>

	<div class={` ${clase} atropos salmo-atropos flex flex-row justify-center align-middle `}>
  <!-- scale container (required) -->
 	 <div class="atropos-scale">
    <!-- rotate container (required) -->
    <div class="atropos-rotate">
      <!-- inner container (required) -->
      <div class="atropos-inner verse p-4 rounded-lg">
				<p class={`lg:text-2xl w-[30ch] ${verseClass} self-center m-4 text-black flex-wrap`}>

					"Tu palabra es una lámpara a mis pies; es una luz en mi sendero." 

				</p>
				<p class="lg:text-5xl max-lg:text-xl text-black">
					Salmo 119:105
				</p>
      </div>
  </div>
</div>
</div>

<style>
	
	
	.verse {
		text-wrap: wrap;
		background: radial-gradient(#e4c3bd, #ba7264);
	}
</style>