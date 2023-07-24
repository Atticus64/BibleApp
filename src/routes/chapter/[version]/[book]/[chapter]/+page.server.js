export async function load({ params, fetch }) {
  const { book, chapter, version } = params

  const URL = 'https://bible-api.deno.dev/api'
  const res = await fetch(`${URL}/${version}/book/${book}/${chapter}`)
  const data = await res.json()

  return {
    data,
    params
  }
}
