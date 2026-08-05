<script>
  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'
  import { versions } from '@/constants'
  import { version } from '@/state/bible.svelte.js'

  /**
   *
   * @param {{url: string, name: string}} v
   */
  function setVersion(v) {
    version.value = v.url
    goto(resolve('/books'))
  }
</script>

<div>
  <h1 class="p-2 text-3xl font-bold">Versiones</h1>

  <ul class="flex flex-col gap-2 p-2">
    {#each versions as versionBible (versionBible.url)}
      <button
        class=" max-w hover:shadow- rounded-sm bg-[#a8cae8] p-4 text-xl hover:bg-[#7faddb] dark:bg-[#4366b2] dark:hover:bg-blue-600"
        onclick={() => setVersion(versionBible)}
      >
        <span>
          {versionBible.name}
        </span>
      </button>
    {/each}
  </ul>
</div>
