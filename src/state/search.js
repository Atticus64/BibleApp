import { writable } from 'svelte/store'

/**
 * @typedef Verse
 * @property {string} passage
 * @property {string|undefined} study
 * @property {string} id
 * @property {string} verse
 * @property {string} url
 */

/**
 * @typedef Book
 * @property {string} name
 * @property {string} abrev
 * @property {number} chapters
 * @property {string} testament
 */

/**
 * @typedef Data
 * @property {string[]} books
 * @property {Verse[]} vers
 */

/**
 * @typedef MetaData
 * @property {number} page
 * @property {number} pageCount
 * @property {number} pageSize
 * @property {number} total
 */

/**
 * @typedef Result
 * @property {Data} data
 * @property {MetaData} meta
 */

/**
 * @typedef {import("svelte/store").Writable<Result>} SearchResult
 */

/**
 * @type {SearchResult}
 */
export const searchResults = writable({
  data: {
    books: [],
    vers: []
  },
  meta: {
    page: 0,
    pageCount: 0,
    pageSize: 0,
    total: 0
  }
})

export const loadingResults = writable(false)

export const pattern = writable('')

export const page = writable(1)

export const versionSearch = writable({
  name: 'Reina Valera 1960',
  url: 'rv1960'
})

export const testament = writable({
  name: '',
  url: ''
})

/**
 *
 * @param {{ version: string, testament: string }} data
 */
export function searchBible ({ version, testament }) {
  const controller = new AbortController()
  /**
   *
   * @param {string} search
   */
  const query = (search) => {
    if (!search || search.trim() === '') {
      return Promise.reject('No hay nada que buscar')
    }

    /**
     * @type {URL}
     */
    let url
    if (!testament) {
      url = new URL(`https://bible-api.deno.dev/api/${version}/search`)
      url.searchParams.set('q', search)
    } else {
      url = new URL(`https://bible-api.deno.dev/api/${version}/search`)
      url.searchParams.set('testament', testament)
      url.searchParams.set('q', search)
    }

    return fetch(url, {
      signal: controller.signal
    }).then((res) => res.json())
  }

  /**
   *
   * @param {string} search
   * @param {number} page
   */
  const queryWithPage = (search, page) => {
    if (!search || search.trim() === '') {
      return Promise.reject('No hay nada que buscar')
    }

    const url = new URL('https://bible-api.deno.dev/api/nvi/search')
    url.searchParams.set('q', search)
    url.searchParams.set('page', page.toString())

    return fetch(url, {
      signal: controller.signal
    }).then((res) => res.json())
  }

  return {
    query,
    queryWithPage,
    controller
  }
}