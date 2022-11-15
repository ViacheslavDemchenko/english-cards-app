import { WordsList } from './types';

const getData = async (): Promise<WordsList> => {
  const cards: WordsList = await import('./assets/words.json');
  return cards;
};

export { getData };