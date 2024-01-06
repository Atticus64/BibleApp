<script>
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import Image from '@tiptap/extension-image'
  import StarterKit from '@tiptap/starter-kit'
  import { draft, studyMode } from '@/state/study'
  import HeadingOne from './icons/HeadingOne.svelte'
  import HeadingTwo from './icons/HeadingTwo.svelte'
  import HeadingThree from './icons/HeadingThree.svelte'
  import Paragraph from './icons/Paragraph.svelte'
  import BlockQuote from './icons/BlockQuote.svelte'
  import Create from './icons/Create.svelte'
  import Save from './icons/Save.svelte'
  import { DEFAULT_NOTE } from '@/constants'
  import { editable, editableNote } from '@/state/notes'
  import Lock from './icons/Lock.svelte'
  import Unlock from './icons/Unlock.svelte'
  import Secure from './icons/Secure.svelte'

  export let manageNote = false

  /** @type {string} */
  export let content
  /**
   * @type {(e: MouseEvent) => Promise<void>}
   */
  export let createNote
  /** @type {Element | undefined} */
  let element
  /** @type {Editor} */
  let editor

  onMount(() => {
    editor = new Editor({
      editable: true,
      element: element,
      extensions: [StarterKit, Image],
      content: content.length <= 0 ? DEFAULT_NOTE : content,
      onUpdate: () => {
        if (manageNote) {
          $editableNote.body = editor.getHTML()
          return
        }
        $draft.body = editor.getHTML()
      },
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expectedo
        editor = editor
      },
      editorProps: {
        attributes: {
          class:
            'prose dark:prose-invert prose-sm sm:prose-base p-2 lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
        }
      }
    })
  })

  $: {
    if (editor) {
      editor.setEditable($editable)
    }
  }

  onDestroy(() => {
    if (editor) {
      editor.destroy()
    }
  })
</script>

<div
  class="mb-4 h-full w-full overflow-auto rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
>
  {#if editor}
    <div class="flex border-b px-3 py-2 dark:border-gray-600">
      <div
        class="flex w-full flex-wrap items-center justify-between divide-gray-200 dark:divide-gray-600 sm:divide-x sm:rtl:divide-x-reverse"
      >
        <section
          class="flex w-full flex-row flex-wrap justify-between space-x-1 align-middle rtl:space-x-reverse max-md:gap-6 sm:pe-4"
        >
          <div class="flex flex-wrap gap-2">
            <button
              disabled={!$editable}
              on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              class:active={editor.isActive('heading', { level: 1 })}
              type="button"
              class={`
              ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-gray-600' : ''}
              cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white
              `}
            >
              <HeadingOne className="h-6 w-6" />
              <span class="sr-only">Heading 1</span>
            </button>
            <button
              disabled={!$editable}
              on:click={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }}
              type="button"
              class={`
              ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-600' : ''}
              cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white
              `}
            >
              <HeadingTwo className="h-6 w-6" />

              <span class="sr-only">Heading 2</span>
            </button>
            <button
              disabled={!$editable}
              on:click={() => {
                editor.chain().focus().setHeading({ level: 3 }).run()
              }}
              class={`
              ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 dark:bg-gray-600' : ''}
              cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white
              `}
              type="button"
            >
              <HeadingThree className="h-6 w-6" />

              <span class="sr-only">Heading 3</span>
            </button>
            <button
              disabled={!$editable}
              on:click={() => {
                editor.chain().focus().setParagraph().run()
              }}
              type="button"
              class={`
              ${editor.isActive('paragraph') ? 'bg-gray-200 dark:bg-gray-600' : ''}
              cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white
              `}
            >
              <Paragraph className="h-6 w-6" />

              <span class="sr-only">Paragraph</span>
            </button>
            <button
              disabled={!$editable}
              class:active={editor.isActive('blockquote')}
              on:click={() => {
                editor.chain().focus().toggleBlockquote().run()
              }}
              type="button"
              class={`
              ${editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-gray-600' : ''}
              cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white
              `}
            >
              <BlockQuote className="h-6 w-6" />

              <span class="sr-only">Blockquote</span>
            </button>

            <div class="flex flex-row gap-4">
              <button
                on:click={createNote}
                class="flex h-12 w-fit items-center justify-end gap-2 rounded-lg bg-[#a8cae8] p-3 text-black transition-colors hover:bg-[#7faddb] dark:border-none dark:bg-[#4267b3] dark:text-white dark:hover:bg-blue-600"
              >
                <span> Crear </span>
                <Create className="h-6 w-6" />
              </button>

              <button
                type="submit"
                class="flex h-12 w-fit items-center justify-center gap-2 rounded-lg bg-[#a8cae8] p-3 text-black transition-colors hover:bg-[#7faddb] dark:border-none dark:bg-[#4267b3] dark:text-white dark:hover:bg-blue-600"
              >
                <span> Guardar </span>
                <Save className="h-6 w-6" />
              </button>
              <button
                on:click={(e) => {
                  e.preventDefault()
                  editable.set(!$editable)
                }}
                class="flex h-12 w-fit items-center justify-center gap-2 rounded-lg bg-[#a8cae8] p-3 text-black transition-colors hover:bg-[#7faddb] dark:border-none dark:bg-[#4267b3] dark:text-white dark:hover:bg-blue-600"
              >
                {$editable ? 'Edicion activa' : 'Edicion Desactivada'}
                {#if $editable}
                  <Unlock />
                {:else}
                  <Secure />
                {/if}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  {/if}
  <div bind:this={element} />
</div>

<style>
</style>
