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

export let pattern = writable('')

export let page = writable(1)
