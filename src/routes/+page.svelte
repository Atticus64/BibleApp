<script>
  import Button from '@/components/Button.svelte'
  import { goToChapter } from '@/utils/chapter'
  import Josh from '@/components/verses/Josh.svelte'
  import Salmo from '@/components/verses/Salmo.svelte'
  import Santiago from '@/components/verses/Santiago.svelte'
  import Deuteronomio from '@/components/verses/Deuteronomio.svelte'
  import Lock from '@/components/icons/Lock.svelte'
  import OpenSource from '@/components/icons/OpenSource.svelte'
  import Lightning from '@/components/icons/Lightning.svelte'
  import ZeroAdds from '@/components/icons/ZeroAdds.svelte'
</script>

<div class="flex flex-col items-start p-0 sm:flex-row sm:p-6">
  <div class="flex h-max w-full flex-col place-self-start lg:h-[100vh]">
    <h3 class="p-2 max-lg:text-3xl md:text-3xl lg:text-6xl">
      Aplicación para
      <span class="study inline">Estudiar</span>
      y
      <span class="read inline">Leer</span>
      la Biblia
    </h3>

    <section class="min flex w-full flex-row gap-4 max-lg:p-4 max-md:flex-col">
      <div class="flex flex-col gap-2">
        <Josh clase="max-lg:w-full text-wrap" verseClass="text-wrap max-lg:w-fit" />
        <Salmo clase="max-lg:w-fit" verseClass="text-wrap max-lg:w-fit" />
      </div>
      <div class="flex flex-col gap-2">
        <Santiago clase="max-lg:w-fit" verseClass="text-wrap max-lg:w-fit" />
        <Deuteronomio clase="max-lg:w-fit" verseClass="text-wrap max-lg:w-fit" />
      </div>
    </section>

    <div
      class="min-lg:place-items-start m-4 flex font-bold max-lg:justify-around max-lg:text-xl max-md:justify-center max-md:gap-4 max-sm:flex-col max-sm:place-content-center max-sm:align-middle lg:gap-3 lg:text-2xl"
    >
      <Button
        on:click={() => goToChapter()}
        color="blue"
        className="hover:scale-105 transition-transform lg:p-8 max-lg:p-2"
      >
        Estudiar la Biblia
      </Button>
      <Button
        href="#faq"
        className="hover:scale-105 hover:text-black transition-transform lg:p-8 max-lg:p-2"
      >
        Preguntas frecuentes
      </Button>
    </div>
  </div>
</div>

<section class="flex w-full flex-col gap-7 pt-4">
  <span class="flex w-full items-center justify-center align-middle">
    <h2 class="text-5xl text-[#6092d1]">Características</h2>
  </span>
  <div
    class="grid w-full justify-center gap-2 align-middle max-lg:grid-flow-row lg:h-[60vh] lg:grid-flow-col"
  >
    <div class="h-fit w-[30ch] lg:h-[22em] border-gray-400 p-4 lg:border-r ">
      <h3 class="flex flex-col place-items-center justify-center align-middle text-2xl">
        <ZeroAdds color="#7faddb" width="6rem" height="6rem" />
        <span> Cero Publicidad </span>
      </h3>
      <p class="text-xl">
        La aplicación no se hizo con el fin de monetizar la lectura de la Biblia. Así que no tiene
        ningún tipo de publicidad.
      </p>
    </div>
    <div class="h-fit w-[30ch] lg:h-[22em] border-gray-400 p-4 lg:border-r">
      <h3 class="flex flex-col place-items-center justify-center align-middle text-2xl">
        <Lock color="#7faddb" width="6rem" height="6rem" />
        <span> Seguridad </span>
      </h3>
      <p class="text-xl">
        No almacenamos ningún tipo de información sensible unicamente la información para almacenar
        las notas de lectura.
      </p>
    </div>

    <div class="h-fit lg:h-[22em] w-[30ch] border-gray-400 p-4 lg:border-r">
      <h3 class="flex flex-col place-items-center justify-center align-middle text-2xl">
        <OpenSource color="#7faddb" width="6rem" height="6rem" />
        <span> Codigo Abierto </span>
      </h3>
      <p class="text-xl">
        La aplicación es totalmente de Código Abierto. Para que cualquiera que quiera mejorar la
        interfaz, el funcionamiento o la seguridad de la aplicación pueda hacerlo.
      </p>
    </div>
    <div class="w-[30ch] p-4">
      <h3 class="flex flex-col place-items-center justify-center align-middle text-2xl">
        <Lightning color="#7faddb" width="6rem" height="6rem" />
        <span> Rapida y Eficiente </span>
      </h3>
      <p class="text-xl">
        La busqueda y filtrado de los versiculos y versiones de la biblia estan optmizadas para que
        la lectura sea fluida ademas de brindar mayor comodidad al estudio de la misma.
      </p>
    </div>
  </div>
</section>

<section id="faq" class="flex h-[80vh] flex-col gap-4">
  <span class="flex flex-row justify-center align-middle">
    <h2 class="text-5xl text-[#6092d1]">Preguntas Frecuentes</h2>
  </span>
  <div class="text-column questions grid gap-10">
    <details open>
      <summary class="question p-4 text-3xl font-bold">
        ¿Que versiones de la Biblia contiene la aplicación?
      </summary>

      <p class="light:text-gray-500 text-2xl dark:text-gray-200">
        La aplicación contiene las versiones:
        <li>Reina Valera 1960</li>
        <li>Reina Valera 1995</li>
        <li>Nueva Version Internacional</li>
        <li>Dios Habla Hoy</li>
      </p>
    </details>

    <details open>
      <summary class="question p-4 text-3xl font-bold">
        ¿La informacion proviene de una API?
      </summary>
      <p class="light:text-gray-500 text-2xl dark:text-gray-200">
        Si utilizo una API que desarrollé, se llama BibleApi que es open-source y cualquiera la
        puede utilizar
        <li>
          <a href="https://bible-api.deno.dev/api" target="_blank" 

			  class="text-blue-700 hover:text-blue-300 dark:text-blue-200 dark:hover:text-blue-500 underline"
            >API de la Biblia</a
          >
        </li>
        <li>
          <a
            href="https://github.com/Atticus64/BibleApi"
            target="_blank"
			  class="text-blue-700 hover:text-blue-300 dark:text-blue-200 dark:hover:text-blue-500 underline"
            >Codigo fuente del API</a
          >
        </li>
        <li>
          <a
            href="https://docs-bible-api.vercel.app/"
            target="_blank"
			  class="text-blue-700 hover:text-blue-300 dark:text-blue-200 dark:hover:text-blue-500 underline"
           >Documentacion del API</a
          >
        </li>
      </p>
    </details>

	<details open>
      <summary class="question p-4 text-3xl font-bold">
        ¿Donde puedo encontrar el Código Fuente?
      </summary>

      <p class="light:text-gray-500 text-2xl dark:text-gray-200">
		El código fuente se encuentra en github

		<li>
			<a href="https://github.com/Atticus64/BibleApp"

			  class="text-blue-700 hover:text-blue-300 dark:text-blue-200 dark:hover:text-blue-500 underline"
			target="_blank"
			>
				Código de la aplicación 
			</a>
		</li>

		<li>

			<a href="https://github.com/Atticus64/BibleApi"
			  class="text-blue-700 hover:text-blue-300 dark:text-blue-200 dark:hover:text-blue-500 underline"
			  target="_blank"
			>
	
				Código fuente del API
			</a>
		</li>
	  </p>

	</details>

    <details open>
      <summary class="question p-4 text-3xl font-bold">
        ¿Tienes algun problema con la aplicación o sugerencia?
      </summary>

      <p class="light:text-gray-500 text-2xl dark:text-gray-200">
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
