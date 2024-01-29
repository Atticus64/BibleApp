<script context="module">
  /**
   * @typedef {object} Verse
   * @prop {string} study
   * @prop {number} number
   * @prop {string} verse
   */
  /**
   * @typedef {object} PassageInfo
   * @prop {number} num_chapters
   * @prop {string} testament
   * @prop {string} name
   * @prop {string} chapter
   * @prop {Array<Verse>} vers
   */
</script>

<script>
  import { formatName } from '@/utils/chapter'

  import { scale } from 'svelte/transition'

  /** @type {boolean} */
  export let studyMode = false
  export let className = ''

  /**
   * @type {number}
   */
  export let fontSize
  /** @type {PassageInfo} */
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
  transition:scale={{ duration: 300 }}
  class={`${
    studyMode
      ? 'm-4 h-[40rem] lg:overflow-auto xl:overflow-auto 2xl:overflow-auto'
      : 'm-4 w-full max-w-full'
  } ${className}`}
>
  <h3 class={`mt-4 text-3xl`}>{formatName(info.name)}: {info.chapter}</h3>

  {#if info.vers && info.vers.length > 0}
    <ul class="flex flex-col gap-2 p-4">
      {#each info.vers as v}
        {#if v.study}
          <h3 class="p-2" style={`font-size: ${fontSize + 10}px`}>{v.study}</h3>
        {/if}
        <p class="verse" style={`font-size: ${fontSize}px`}>
          <b>
            {v.number}
          </b>
          {v.verse}
        </p>
      {/each}
    </ul>
  {/if}
</section>

<style>
  .verse {
    max-width: 50ch;
    text-wrap: balance;
  }

  .verse {
    font-size: larger;
  }

  @media (max-width: 800px) {
    .verse {
      font-size: larger;
    }
  }
</style>
