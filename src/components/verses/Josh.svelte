<script>
  import { onMount } from 'svelte'
  import Atropos from 'atropos'
  import 'atropos/atropos.css'

  let { clase = '', verseClass = '' } = $props()

  onMount(() => {
    const myAtropos = Atropos({
      el: '.my-atropos',
      shadowScale: 0.1,
      shadowOffset: 50,
      rotateTouch: false
      // rest of parameters
    })
  })
</script>

<div class={`${clase} atropos my-atropos flex flex-row justify-center align-middle `}>
  <!-- scale container (required) -->
  <div class="atropos-scale">
    <!-- rotate container (required) -->
    <div class="atropos-rotate">
      <!-- inner container (required) -->
      <div class="atropos-inner verse rounded-lg">
        <p class={`lg:w-[30ch] lg:text-2xl ${verseClass} m-4 flex-wrap self-center text-black`}>
          "Medita día y noche el libro de esta ley teniéndolo siempre en tus labios; si obras en
          todo conforme a lo que se prescribe en él, prosperarás y tendrás éxito en todo cuanto
          emprendas."
        </p>
        <p class="text-black max-lg:text-xl lg:text-5xl">Josué 1:8</p>
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
