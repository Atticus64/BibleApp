<script>
  import { slide } from 'svelte/transition'
  import DownArrow from './icons/DownArrow.svelte'
  import RightArrow from './icons/RightArrow.svelte'

  let isOpen = true

  export let title = ''
  let className = ''
  export { className }

  //const colors =
  //' bg-white px-2 py-2  leading-none text-black transition-colors hover:bg-neutral-100 dark:bg-[#43beed] dark:hover:bg-[#85d3f4]'
  const colors =
    'flex items-center justify-evenly w-full p-5 font-medium rtl:text-right text-black border  border-gray-200 border-radious rounded dark:text-white dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
</script>

<div class={`shadow-lgi flex h-fit w-fit rounded-xl lg:w-[36rem]  lg:text-2xl ${className}`}>
  <div
    class="flex w-full flex-col justify-center
            overflow-hidden rounded align-middle transition-colors"
  >
    <h2 class="">
      <button
        on:click={() => (isOpen = !isOpen)}
        class={`
            flex
            w-full cursor-pointer items-start justify-center gap-2
            text-center align-text-bottom text-2xl font-bold text-black ${colors}`}
      >
        {#if isOpen}
          <DownArrow
            width="3rem"
            height="3rem"
            className="self-center place-self-center justify-self-center"
          />
        {:else}
          <RightArrow
            width="3rem"
            height="3rem"
            className="self-center place-self-center justify-self-center"
          />
        {/if}
        <span class="place-self-center self-center justify-self-center">
          {title}
        </span>
      </button>
    </h2>
    {#if isOpen}
      <div
        class={` content overflow-hidden  border border-b-2 border-t-0 border-gray-200 p-5 dark:border-gray-700 dark:bg-gray-900 dark:text-white`}
        transition:slide
      >
        <div class="px-5 py-4">
          <slot />
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
</style>
