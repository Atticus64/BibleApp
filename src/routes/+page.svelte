<script>
  import Button from '@/components/Button.svelte'
  import { goToChapter } from '@/utils/chapter'
</script>

<div class="flex h-[100%] flex-col items-center p-0 sm:flex-row sm:p-6">
  <div class="flex flex-col">
    <h3 class="p-2 text-3xl">
      La aplicacion para
      <p class="study inline">Estudiar</p>
      y
      <p class="read inline">Leer</p>
      la Biblia que esperabas
    </h3>

    <div class="flex items-center gap-10 py-6 text-xl font-bold">
      <Button
        on:click={() => goToChapter()}
        color="blue"
        className="hover:scale-105 hover:text-white transition-transform p-8"
      >
        Estudiar la Biblia
      </Button>
      <Button href="/about" className="hover:scale-105 hover:text-black transition-transform p-8">
        Preguntas frecuentes
      </Button>
    </div>
  </div>

  <img src="/hero-image.webp" class="w-full sm:w-1/2" width="600" height="450" alt="study img" />
</div>

<style>
  .read {
    color: #1d9bf0;
  }

  .read::selection {
    color: white;
    background-clip: none;
  }

  .study {
    color: #548874;
  }
</style>
