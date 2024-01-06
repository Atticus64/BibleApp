import { writable } from 'svelte/store'

/**
 * @typedef User
 * @property {boolean} loggedIn
 * @property {string} tag
 *  @property {string} email
 *  */

export const user = writable({
  loggedIn: false,
  tag: '',
  email: ''
})
