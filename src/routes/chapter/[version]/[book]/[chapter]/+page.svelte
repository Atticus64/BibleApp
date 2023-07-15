<script>
	import StudyChapter from '@/components/StudyChapter.svelte';

	export let data;
</script>

<StudyChapter
	book={data.params.book}
	version={data.params.version}
	chapter={Number(data.params.chapter)}
/>
