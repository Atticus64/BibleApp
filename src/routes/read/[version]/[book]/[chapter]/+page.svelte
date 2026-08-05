<script>
  import StudyChapter from '@/components/StudyChapter.svelte'

  let { data } = $props()
</script>

<StudyChapter
  book={data.params.book}
  versionRead={data.params.version}
  chapter={Number(data.params.chapter)}
/>
