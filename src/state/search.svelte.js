import { SvelteURL } from 'svelte/reactivity'
import { API_BASE_URL } from '@/constants'

/**
 * @typedef Verse
 * @property {string|undefined} study
 * @property {string} id
 * @property {string} verse
 * @property {string} book
 * @property {number} chapter
 * @property {number} number
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
 * @typedef MetaData
 * @property {number} page
 * @property {number} pageCount
 * @property {number} pageSize
 * @property {number} total
 */

/**
 * @typedef Result
 * @property {Verse[]} data
 * @property {MetaData} meta
 */

/** @type {{ value: Result }} */
export const searchResults = $state({
  value: {
    data: [],
    meta: {
      page: 0,
      pageCount: 0,
      pageSize: 0,
      total: 0
    }
  }
})

export const loadingResults = $state({ value: false })

export const pattern = $state({ value: '' })

export const page = $state({ value: 1 })

export const versionSearch = $state({
  value: {
    name: 'Reina Valera 1960',
    url: 'rv1960'
  }
})

export const testament = $state({
  value: {
    name: '',
    url: ''
  }
})

/**
 * @param {{ version: string, testament: string }} data
 */
export function searchBible({ version, testament }) {
  const controller = new AbortController()

  /** @param {string} search */
  const query = (search) => {
    if (!search || search.trim() === '') {
      return Promise.reject('No hay nada que buscar')
    }

    /** @type {SvelteURL} */
    let url

    if (!testament) {
      url = new SvelteURL(`${API_BASE_URL}/api/read/${version}/search`)
      url.searchParams.set('q', search)
    } else {
      url = new SvelteURL(`${API_BASE_URL}/api/read/${version}/search`)
      url.searchParams.set('testament', testament)
      url.searchParams.set('q', search)
    }

    return fetch(url.href, {
      signal: controller.signal
    }).then((res) => res.json())
  }

  /**
   * @param {string} search
   * @param {number} page
   * @param {string} version
   */
  const queryWithPage = (search, page, version) => {
    if (!search || search.trim() === '') {
      return Promise.reject('No hay nada que buscar')
    }

    const url = new SvelteURL(`${API_BASE_URL}/api/read/${version}/search`)
    url.searchParams.set('q', search)
    if (testament) {
      url.searchParams.set('testament', testament)
    }

    url.searchParams.set('page', page.toString())

    return fetch(url.href, {
      signal: controller.signal
    }).then((res) => res.json())
  }

  return {
    query,
    queryWithPage,
    controller
  }
}
