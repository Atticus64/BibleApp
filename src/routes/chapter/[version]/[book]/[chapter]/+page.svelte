<script>
  import Controls from '@/components/Controls.svelte'
  import Passage from '@/components/Passage.svelte'
  import { studyMode } from '@/state/study'
  import { page } from '$app/stores'

  export let data
</script>

<Controls chapters={data.data.num_chapters} />

{#if data}
  <div class="flex max-w-full flex-row">
    <section class={$studyMode ? 'max-w-full xl:w-1/2 2xl:w-2/4' : 'w-full max-w-full'}>
      <h3 class="p-2 text-3xl">{$page.params.book}: {$page.params.chapter}</h3>
      <Passage studyMode={$studyMode} info={data.data} />
    </section>
  </div>
{/if}
