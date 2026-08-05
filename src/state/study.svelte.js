/**
 * @typedef NoteDraft
 * @property {string} title
 * @property {string} description
 * @property {string} body
 * @property {string} id
 */

/** @type {{ value: NoteDraft }} */
export const draft = $state({
  value: {
    title: '',
    description: '',
    body: '',
    id: ''
  }
})

export const studyMode = $state({ value: false })
