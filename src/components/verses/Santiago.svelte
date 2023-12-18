<script>
import { onMount } from 'svelte'
  import Atropos from 'atropos'

  export let clase = ''

  onMount(() => {
	const myAtropos = Atropos({
	  el: '.santiago-atropos',
	  activeOffset: 20,
      shadowScale: 0.95,
	  shadowOffset: 50,
	  rotateTouch: false
	  // rest of parameters
	});
  })

</script>

	<div class={` ${clase} atropos santiago-atropos flex flex-row justify-center align-middle `}>
  <!-- scale container (required) -->
 	 <div class="atropos-scale">
    <!-- rotate container (required) -->
    <div class="atropos-rotate">
      <!-- inner container (required) -->
      <div class="atropos-inner verse rounded-lg">
				<p class={`lg:text-2xl w-[30ch] self-center m-4 text-black `}>
					"No se contenten solo con escuchar la palabra, pues así se engañan ustedes mismos. Llévenla a la práctica." 

				</p>
				<p class="lg:text-5xl text-black">
					Santiago 1:22
				</p>
      </div>
  </div>
</div>
</div>

<style>

	
	.verse {
		padding: 1rem;
		background: radial-gradient(#92cace, #438e96);
	}
</style>