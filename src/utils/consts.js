export const API_BASE_URL = 'https://bible-api.deno.dev'

export const DEFAULT_NOTE = `
# titulo 1 
## titulo 2 
### titulo 3
---
* lista
* desordenada 
---
1. lista
2. ordenada
---
**imagen**

*lista*
![](https://i.postimg.cc/wBZFwwBN/boat.jpg)`

/**
   * @param {string} name
   */
export function searchName(name) {
  if (name.includes('-')) {
    const words = name.split('-')
    const acc = []
    for (const w of words) {
      const [firstLetter, ...rest] = w
      const newName = firstLetter.toUpperCase() + rest.join('')
      acc.push(newName)
    }
    return acc.join('-')
  }

  const [firstLetter, ...rest] = name
  return firstLetter.toUpperCase() + rest.join('')
}
