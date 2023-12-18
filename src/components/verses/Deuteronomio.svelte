<script>
import { onMount } from 'svelte'
  import Atropos from 'atropos'

  export let clase = ''
  export let verseClass = ''

  onMount(() => {
	const myAtropos = Atropos({
	  el: '.deut-atropos',
	  activeOffset: 20,
	  rotateTouch: false,
      shadowScale: 0.95,
	  shadowOffset: 50,
	  // rest of parameters
	});
  })

</script>

	<div class={`${clase} atropos lg:hide deut-atropos flex flex-row justify-center align-middle `}>
  <!-- scale container (required) -->
 	 <div class="atropos-scale">
    <!-- rotate container (required) -->
    <div class="atropos-rotate">
      <!-- inner container (required) -->
      <div class="atropos-inner verse rounded-lg">
				<p class={`lg:text-2xl w-[30ch] self-center ${verseClass} m-4 text-black  flex-wrap`}>
					"Te humilló y te hizo pasar hambre, pero luego te alimentó con maná, comida que ni tú ni tus antepasados habían conocido, con lo que te enseñó que no sólo de pan vive el hombre, sino de todo lo que sale de la boca del Señor." 

				</p>
				<p class="lg:text-5xl max-lg:text-xl text-black">
					Deuteronomio 8:3
				</p>
      </div>
  </div>
</div>
</div>

<style>

	
	.verse {
		padding: 1rem;
		background: radial-gradient(#afd89d, #61a146);
	}
</style>