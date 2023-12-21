<script>
  import StudyChapter from '@/components/StudyChapter.svelte'

  export let data
</script>

<StudyChapter
  book={data.params.book}
  versionRead={data.params.version}
  chapter={Number(data.params.chapter)}
/>
