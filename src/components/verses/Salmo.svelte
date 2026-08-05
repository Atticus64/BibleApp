<script>
  import { onMount } from 'svelte'
  import Atropos from 'atropos'

  let { clase = '', verseClass = '' } = $props()
  onMount(() => {
    const myAtropos = Atropos({
      el: '.salmo-atropos',
      activeOffset: 20,
      shadowScale: 0.95,
      rotateTouch: false,
      shadowOffset: 50
      // rest of parameters
    })
  })
</script>

<div class={` ${clase} atropos salmo-atropos flex flex-row justify-center align-middle `}>
  <!-- scale container (required) -->
  <div class="atropos-scale">
    <!-- rotate container (required) -->
    <div class="atropos-rotate">
      <!-- inner container (required) -->
      <div class="atropos-inner verse rounded-lg p-4">
        <p class={`w-[30ch] lg:text-2xl ${verseClass} m-4 flex-wrap self-center text-black`}>
          "Tu palabra es una lámpara a mis pies; es una luz en mi sendero."
        </p>
        <p class="text-black max-lg:text-xl lg:text-5xl">Salmo 119:105</p>
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
