/**
 * @typedef User
 * @property {boolean} loggedIn
 * @property {string} tag
 * @property {string} email
 */

export const user = $state({
  loggedIn: false,
  tag: '',
  email: ''
})
