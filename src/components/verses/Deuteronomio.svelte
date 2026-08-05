<script>
  import { onMount } from 'svelte'
  import Atropos from 'atropos'

  let { clase = '', verseClass = '' } = $props()

  onMount(() => {
    const myAtropos = Atropos({
      el: '.deut-atropos',
      activeOffset: 20,
      rotateTouch: false,
      shadowScale: 0.95,
      shadowOffset: 50
      // rest of parameters
    })
  })
</script>

<div class={`${clase} atropos lg:hide deut-atropos flex flex-row justify-center align-middle `}>
  <!-- scale container (required) -->
  <div class="atropos-scale">
    <!-- rotate container (required) -->
    <div class="atropos-rotate">
      <!-- inner container (required) -->
      <div class="atropos-inner verse rounded-lg">
        <p class={`w-[30ch] self-center lg:text-2xl ${verseClass} m-4 flex-wrap  text-black`}>
          "Te humilló y te hizo pasar hambre, pero luego te alimentó con maná, comida que ni tú ni
          tus antepasados habían conocido, con lo que te enseñó que no sólo de pan vive el hombre,
          sino de todo lo que sale de la boca del Señor."
        </p>
        <p class="text-black max-lg:text-xl lg:text-5xl">Deuteronomio 8:3</p>
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
