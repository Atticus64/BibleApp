import adapter from '@sveltejs/adapter-vercel'
import { preprocessMeltUI, sequence } from '@melt-ui/pp'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  runtime: 'nodejs18.x',
  preprocess: sequence([
    // ... other preprocessors
    preprocessMeltUI() // add to the end!
  ]),
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter()
  }
}

export default config
