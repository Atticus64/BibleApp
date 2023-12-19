import { goto } from '$app/navigation'

export function goToChapter() {
  const bkString = localStorage.getItem('bookmark')

  if (bkString) {
    const bkmark = JSON.parse(bkString)

    const book = bkmark.book
    const version = bkmark.version
    const chapter = bkmark.chapter

    goto(`/read/${version}/${book}/${chapter}`)
    return
  }

  goto('/read/rv1960/Genesis/1')
}

/**
   * @param {string} name
   */
export function formatName(name) {
  if (name.includes('-')) {
    const words = name.split('-')
    const acc = []
    for (const w of words) {
      const [firstLetter, ...rest] = w
      const newName = firstLetter.toUpperCase() + rest.join('')
      acc.push(newName)
    }
    return acc.join(' ')
  }

  const [firstLetter, ...rest] = name
  return firstLetter.toUpperCase() + rest.join('')
}
