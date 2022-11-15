import React, { useState, useEffect } from 'react';
import { Word } from '../../types';

import style from './wordsTable.module.scss';

const WordsTable: React.FC = () => {
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('words') as string)) {
      const json = JSON.parse(localStorage.getItem('words') as string); 
      setAllWords(JSON.parse(json)); 
      setFilteredWords(JSON.parse(json)); 
    }
  }, []);

  const getLearnedWords = () => {
    const learnedWords: Word[] = allWords.filter((word: Word) => word.learned);
    setFilteredWords(learnedWords);
  };

  const getUnlearnedWords = () => {
    const unLearnedWords: Word[] = allWords.filter((word: Word) => !word.learned);
    setFilteredWords(unLearnedWords);
  };

  return(
    <div className={style.wordsListTableList}>
      <div className="container">
        <h1 className={style.wordsListTabletTitle}>Список всех слов</h1>
        <div className={style.wordsListTabletBtnsWrap}>
          <button className={style.wordsListTableBtnLearnedWords} onClick={getLearnedWords}>Изученные слова</button>
          <button className={style.wordsListTableBtnUnlearnedWords} onClick={getUnlearnedWords}>Неизученные слова</button>
        </div>
        <div className={style.wordsListTableContent}>
          {filteredWords.map((word: Word) => (
            <div className={style.wordsListTableItem} key={word.id}>{word.en}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { WordsTable };