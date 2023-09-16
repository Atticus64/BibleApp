// src/routes/blog/[slug]/+page.js

export const ssr = false

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  return {
    params
  }
  // if (params.slug === 'hello-world') {
  //  return {
  //    title: 'Hello world!',
  //    content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
  // }
  // }

  // throw error(404, 'Not found')
}
