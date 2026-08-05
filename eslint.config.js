import { createRequire } from 'node:module'
import svelte from 'eslint-plugin-svelte'
import prettier from 'eslint-plugin-prettier'

const reqFromRoot = createRequire(import.meta.url)

const standardConfig = reqFromRoot('eslint-config-standard')
const reqFromStandard = createRequire(reqFromRoot.resolve('eslint-config-standard'))
const importPlugin = reqFromStandard('eslint-plugin-import')
const nPlugin = reqFromStandard('eslint-plugin-n')
const promisePlugin = reqFromStandard('eslint-plugin-promise')

const reqFromEslint = createRequire(reqFromRoot.resolve('eslint'))
const browserGlobals = reqFromEslint('globals').browser
const nodeGlobals = reqFromEslint('globals').node

const runeGlobals = Object.fromEntries(
  ['$state', '$derived', '$effect', '$props', '$bindable', '$inspect', '$host'].map((name) => [name, 'readonly'])
)

const standardGlobals = standardConfig.globals

export default [
  {
    ignores: [
      '**/.svelte-kit/**',
      '**/node_modules/**',
      '**/build/**',
      '**/.vercel/**',
      '**/package/**'
    ]
  },
  {
    files: ['**/*.{js,svelte.js}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...browserGlobals,
        ...nodeGlobals,
        ...standardGlobals,
        ...runeGlobals
      }
    },
    plugins: {
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin
    },
    rules: {
      ...standardConfig.rules,
      'prefer-promise-reject-errors': 'off',
      'space-before-function-paren': 'off'
    }
  },
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': 'error'
    }
  }
]
