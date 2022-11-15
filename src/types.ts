interface Word {
  id: number,
  en: string,
  ru: string,
  learned: boolean
}

interface WordsList {
  default: Word[];
}

export { Word, WordsList };