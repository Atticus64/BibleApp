import { create, insertMultiple, search } from 'npm:@orama/orama'
 
const movieDB = await create({
  schema: {
    title: 'string',
    director: 'string',
    plot: 'string',
    year: 'number',
    isFavorite: 'boolean',
  },
})

const docs = [
  {
    title: 'The prestige',
    director: 'Christopher Nolan',
    plot: 'Two friends and fellow magicians become bitter enemies after a sudden tragedy. As they devote themselves to this rivalry, they make sacrifices that bring them fame but with terrible consequences.',
    year: 2006,
    isFavorite: true,
  },
  {
    title: 'Big Fish',
    director: 'Tim Burton',
    plot: 'Will Bloom returns home to care for his dying father, who had a penchant for telling unbelievable stories. After he passes away, Will tries to find out if his tales were really true.',
    year: 2004,
    isFavorite: true,
  },
  {
    title: 'Harry Potter and the Philosopher\'s Stone',
    director: 'Chris Columbus',
    plot: 'Harry Potter, an eleven-year-old orphan, discovers that he is a wizard and is invited to study at Hogwarts. Even as he escapes a dreary life and enters a world of magic, he finds trouble awaiting him.',
    year: 2001,
    isFavorite: false,
  },
];
 
// await insertMultiple(movieDB, docs);


const searchResult = await search(movieDB, {
  term: 'Chr',
})

console.log(searchResult)
