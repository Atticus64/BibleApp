export const books = [
  'Genesis',
  'Exodo',
  'Levitico',
  'Numeros',
  'Deuteronomio',
  'Josue',
  'Jueces',
  'Rut',
  '1-Samuel',
  '2-Samuel',
  '1-Reyes',
  '2-Reyes',
  '1-Cronicas',
  '2-Cronicas',
  'Esdras',
  'Nehemias',
  'Ester',
  'Job',
  'Salmos',
  'Proverbios',
  'Eclesiastes',
  'Cantares',
  'Isaias',
  'Jeremias',
  'Lamentaciones',
  'Ezequiel',
  'Daniel',
  'Oseas',
  'Joel',
  'Amos',
  'Abdias',
  'Jonas',
  'Miqueas',
  'Nahum',
  'Habacuc',
  'Sofonias',
  'Hageo',
  'Zacarias',
  'Malaquias',
  'Mateo',
  'Marcos',
  'Lucas',
  'Juan',
  'Hechos',
  'Romanos',
  '1-Corintios',
  '2-Corintios',
  'Galatas',
  'Efesios',
  'Filipenses',
  'Colosenses',
  '1-Tesalonicenses',
  '2-Tesalonicenses',
  '1-Timoteo',
  '2-Timoteo',
  'Tito',
  'Filemon',
  'Hebreos',
  'Santiago',
  '1-Pedro',
  '2-Pedro',
  '1-Juan',
  '2-Juan',
  '3-Juan',
  'Judas',
  'Apocalipsis'
]

export const oldTestament = [
  'Genesis',
  'Exodo',
  'Levitico',
  'Numeros',
  'Deuteronomio',
  'Josue',
  'Jueces',
  'Rut',
  '1-Samuel',
  '2-Samuel',
  '1-Reyes',
  '2-Reyes',
  '1-Cronicas',
  '2-Cronicas',
  'Esdras',
  'Nehemias',
  'Ester',
  'Job',
  'Salmos',
  'Proverbios',
  'Eclesiastes',
  'Cantares',
  'Isaias',
  'Jeremias',
  'Lamentaciones',
  'Ezequiel',
  'Daniel',
  'Oseas',
  'Joel',
  'Amos',
  'Abdias',
  'Jonas',
  'Miqueas',
  'Nahum',
  'Habacuc',
  'Sofonias',
  'Hageo',
  'Zacarias',
  'Malaquias',
]

export const newTestament = [
  'Mateo',
  'Marcos',
  'Lucas',
  'Juan',
  'Hechos',
  'Romanos',
  '1-Corintios',
  '2-Corintios',
  'Galatas',
  'Efesios',
  'Filipenses',
  'Colosenses',
  '1-Tesalonicenses',
  '2-Tesalonicenses',
  '1-Timoteo',
  '2-Timoteo',
  'Tito',
  'Filemon',
  'Hebreos',
  'Santiago',
  '1-Pedro',
  '2-Pedro',
  '1-Juan',
  '2-Juan',
  '3-Juan',
  'Judas',
  'Apocalipsis'
]

export const VERSIONS = {
  rv1960: 'Reina Valera 1960',
  rv1995: 'Reina Valera 1995',
  nvi: 'Nueva Version Internacional',
  dhh: 'Dios Habla Hoy'
}

export const TESTAMENTS = [
  {
    url: 'old',
    name: 'Antiguo Testamento'
  },
  {
    url: 'new',
    name: 'Nuevo Testamento'
  },
  {
    url: 'both',
    name: 'Antiguo y Nuevo Testamento'
  }
]

export const versions = [
  {
    url: 'rv1960',
    name: 'Reina Valera 1960'
  },
  {
    url: 'rv1995',
    name: 'Reina Valera 1995'
  },
  {
    url: 'nvi',
    name: 'Nueva Version Internacional'
  },
  {
    url: 'dhh',
    name: 'Dios Habla Hoy'
  },
  {
    url: 'pdt',
    name: 'Palabra de Dios para todos'
  },
  {
    url: 'kjv',
    name: 'King James Version'
  }
]

export const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_URL ?? 'http://localhost:8000'

export const DEFAULT_NOTE = `
 <div>
    <h1>titulo 1</h1>
    <h2>titulo 2</h2>
    <h3>titulo 3</h3>

    <ul>
      <li>lista</li>
      <li>desordenada</li>
    </ul>
    <ol>
      <li>lista</li>
      <li>ordenada</li>
    </ol>

    <hr>
    <strong>imagen</strong>
    <blockquote>
      <p>Cita a resaltar</p>
    </blockquote>

  </div>`


export function searchName(name: string) {
  if (name.includes('-')) {
    const words = name.split('-')
    const acc = []
    for (const w of words) {
      const [firstLetter, ...rest] = w
      const newName = firstLetter.toUpperCase() + rest.join('')
      acc.push(newName)
    }
    return acc.join('-')
  }

  const [firstLetter, ...rest] = name
  return firstLetter.toUpperCase() + rest.join('')
}
