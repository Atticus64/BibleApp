<script>
import { onMount } from 'svelte'
  import Atropos from 'atropos'
  import 'atropos/atropos.css'


  export let clase = ''
  export let verseClass = ''

  onMount(() => {
	const myAtropos = Atropos({
	  el: '.my-atropos',
      shadowScale: .100,
	  shadowOffset: 50,
	  rotateTouch: false
	  // rest of parameters
	});
  })

</script>

	<div class={`${clase} atropos my-atropos flex flex-row justify-center align-middle `}>
  <!-- scale container (required) -->
 	 <div class="atropos-scale">
    <!-- rotate container (required) -->
    <div class="atropos-rotate">
      <!-- inner container (required) -->
      <div class="atropos-inner verse rounded-lg">
				<p class={`lg:text-2xl lg:w-[30ch] ${verseClass} self-center m-4 text-black flex-wrap`}>
					"Medita día y noche el libro de esta ley teniéndolo siempre en tus labios; si obras en todo conforme a lo que se prescribe en él, prosperarás y tendrás éxito en todo cuanto emprendas." 

				</p>
				<p class="lg:text-5xl max-lg:text-xl text-black">
					Josué 1:8
				</p>
      </div>
  </div>
</div>
</div>

<style>

	
	.verse {
		padding: 1rem;
		background: radial-gradient(#a8cae8, #6092d1);
	}
</style>