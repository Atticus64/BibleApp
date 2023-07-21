<script>
  export let studyMode = false
  export let info = {
    num_chapters: 50,
    testament: 'Antiguo Testamento',
    name: 'Genesis',
    chapter: '',
    vers: [
      {
        study: '',
        number: 0,
        verse: ''
      }
    ]
  }
</script>

<section
  class={studyMode
    ? 'm-4 h-[40rem] lg:overflow-auto xl:overflow-auto 2xl:overflow-auto'
    : 'm-4 w-full max-w-full'}
>
  {#each info.vers as v}
    {#if v.study}
      <h3 class="p-2 text-2xl">{v.study}</h3>
    {/if}
    <p class="verse text-xl">
      <b>
        {v.number}
      </b>
      {v.verse}
    </p>
  {/each}
</section>

<style>
  .verse {
    max-width: 75ch;
  }

  .verse {
    font-size: large;
  }

  @media (max-width: 800px) {
    .verse {
      font-size: medium;
    }
  }
</style>
