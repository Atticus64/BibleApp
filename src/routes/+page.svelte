<script>
  import Button from '@/components/Button.svelte'
  import { goToChapter } from '@/utils/chapter'
  import Josh from '@/components/verses/Josh.svelte'
  import Salmo from '@/components/verses/Salmo.svelte'
  import Santiago from '@/components/verses/Santiago.svelte'
  import Deuteronomio from '@/components/verses/Deuteronomio.svelte'

 
</script>

<div class="flex flex-col items-start p-0 sm:flex-row sm:p-6">
  <div class="lg:h-[100vh] h-fit flex flex-col place-self-start">
    <h3 class="p-2 lg:text-6xl md:text-3xl max-lg:text-3xl ">
      Aplicación para
      <span class="study inline">Estudiar</span>
      y
      <span class="read inline">Leer</span>
      la Biblia
    </h3>

	<section class="max-lg:flex-col min max-lg:p-4 flex flex-row gap-4 ">
		<div class="flex flex-col gap-2">

			<Josh clase="max-lg:w-fit" />
			<Salmo clase="max-lg:w-fit"  />
		</div>
		<div class="flex flex-col gap-2">
			<Santiago clase="max-lg:w-fit" />
			<Deuteronomio clase="max-lg:w-fit" />

		</div>

	</section>


    <div class="flex min-lg:place-items-start lg:gap-3 max-sm:flex-col max-md:justify-center max-md:gap-4 max-sm:place-content-center max-sm:align-middle max-lg:justify-around m-4 lg:text-2xl max-lg:text-xl font-bold">
      <Button
        on:click={() => goToChapter()}
        color="blue"
        className="hover:scale-105 transition-transform lg:p-8 max-lg:p-2"
      >
        Estudiar la Biblia
      </Button>
      <Button href="#faq" className="hover:scale-105 hover:text-black transition-transform lg:p-8 max-lg:p-2">
        Preguntas frecuentes
      </Button>
    </div>
  </div>

</div>

<section id="faq" class="h-[80vh] flex flex-col gap-4">
	<span class="flex flex-row justify-center align-middle">
		<h2 class="text-5xl text-[#6092d1]">
			Preguntas Frecuentes
		</h2>
	</span>
  <div class="text-column questions grid gap-10">
		<details open>
			<summary class="question p-4 text-3xl font-bold">
				¿Que versiones de la Biblia contiene la aplicación?
			</summary>
			
			<p class="text-2xl light:text-gray-500 dark:text-gray-200">
				La aplicación contiene las versiones:
					<li>Reina Valera 1960</li>
					<li>Reina Valera 1995</li>
					<li>Nueva Version Internacional</li>
					<li>Dios Habla Hoy</li>
			</p>
		</details>
     
      <details open>
	  <summary
	 	 class="question p-4 text-3xl font-bold" 
		>
		¿La informacion proviene de una API?
		</summary>
		<p class="text-2xl light:text-gray-500 dark:text-gray-200">

			Si utilizo una API que desarrollé, se llama BibleApi que es open-source y cualquiera la puede utilizar
			<li>
			  <a href="https://bible-api.deno.dev/api" target="_blank" class="text-blue-400 underline"
				>API</a
			  >
			</li>
			<li>
			  <a
				href="https://github.com/Atticus64/BibleApi"
				target="_blank"
				class="text-blue-400 underline">Codigo fuente del API</a
			  >
			</li>
			<li>
			  <a
				href="https://docs-bible-api.vercel.app/"
				target="_blank"
				class="text-blue-400 underline">Documentacion del API</a
			  >
			</li>
		</p>
	</details>
   
      <details open>
      <summary class="question text-3xl p-4 font-bold">
        ¿Tienes algun problema con la aplicación o sugerencia?
      </summary>

	  <p class="text-2xl light:text-gray-500 dark:text-gray-200">
		  Comunicate al correo
          <a
		  href="mailto:jonalca.ce@gmail.com"
		  class="text-green-500 hover:text-blue-500 hover:underline"
          >
		  jonalca.ce@gmail.com
		</a>
		
          O tambien puedes abrir un issue en
          <a
            href="https://github.com/Atticus64/BibleApp/issues/new"
            class="text-green-500 hover:text-blue-600 hover:underline"
			>
            github
		</a>
		
          Y lo arreglare en la medida de lo posible 😄
        </p> 
	</details>
	</div>
</section>

<style>

  .hide {
	display: none;
  }

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
  p {
    max-width: 75ch;
  }

  li {
    list-style: circle;
    margin-left: 2rem;
  }

  .questions {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    .questions {
      grid-template-columns: repeat(1, 1fr);
    }


    .question {
	      font-size: x-large;
    }
  }
</style>
