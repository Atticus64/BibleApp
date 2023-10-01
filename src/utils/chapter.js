import { goto } from '$app/navigation'

export function goToChapter() {
  const bkString = localStorage.getItem('bookmark')

  if (bkString) {
    const bkmark = JSON.parse(bkString)

    const book = bkmark.book
    const version = bkmark.version
    const chapter = bkmark.chapter

    goto(`/chapter/${version}/${book}/${chapter}`)
    return
  }

  goto('/chapter/rv1960/Genesis/1')
}
