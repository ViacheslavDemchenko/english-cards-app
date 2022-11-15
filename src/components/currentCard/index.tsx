import React, { useState, useEffect } from "react";
import { getData } from '../../utils';

import style from './currentCard.module.scss';

import { Word, WordsList } from '../../types';

const CurrentCard: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word>({} as Word);
  const [currentWordText, setCurrentWordText] = useState<string>('');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('words') as string)) {
      setWords(JSON.parse(localStorage.getItem('words') as string)); 
    } else {
      getData().then((data: WordsList) => {
        let words: Word[] = data.default;
        setWords(words);
        localStorage.setItem('words', JSON.stringify(words));
      });
    }

    runOncePerDay();
  }, []);

  useEffect(() => {
    nextWordShow();
  }, [words]);

  const nextWordShow = () => {
    const unlearnedWords: Word[] = words.filter((word: Word) => !word.learned);
    const unlearnedWord: Word = unlearnedWords[Math.floor(Math.random() * unlearnedWords.length)];

    if (unlearnedWord) {
      setCurrentWord(unlearnedWord);
      setCurrentWordText(unlearnedWord.en);
    }
  };

  const confirm = () => {
    if (currentWord) {
      const newWords: Word[] = words.map((word: Word) => {
        if (word.id === currentWord.id) {
          return {
            ...word,
            learned: true
          }
        } else {
          return word;
        }
      });

      setWords(newWords);
      localStorage.setItem('words', JSON.stringify(newWords));
    }
  };

  const reject = () => {
    if (currentWord) {
      setCurrentWordText(currentWord.ru);
    }

    setTimeout(() => {
      nextWordShow();
    }, 3000);
  };

  const reset = () => {
    const newWords: Word[] = JSON.parse(localStorage.getItem('words') as string).map((word: Word) => {
      if (word.learned) {
        return {
          ...word,
          learned: false
        }
      } else {
        return word;
      }
    });

    setWords(newWords);
    localStorage.setItem('words', JSON.stringify(newWords));
  };


  const hasOneDayPassed = () => {
    const date: string = new Date().toLocaleDateString();
    localStorage.setItem('app_date', date);

    if(localStorage.getItem('app_date') === date) {
      return false;
    } else {
      localStorage.setItem('app_date', date);
      return true;
    }
  };

  const runOncePerDay = () => {
    if(!hasOneDayPassed()) {
      return false;
    }
    resetLearnedWords();
  };

  const resetLearnedWords = () => {
    
    const newWords: Word[] = JSON.parse(localStorage.getItem('words') as string).map((word: Word) => {
      if (word.learned && randomIntFromInterval(0, 1) === 1) {
        return {
          ...word,
          learned: false
        }
      } else {
        return word;
      }
    });

    setWords(newWords);
    localStorage.setItem('words', JSON.stringify(newWords));
  };

  const randomIntFromInterval = (min: number, max: number) => { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  if (!currentWordText) {
    return <>Идёт загрузка...</>;
  }

  return (
    <div className={style.currentCardWrap}>
      <div className="container">
        <h1 className={style.currentCardWrapTitle}>Текущая карточка</h1>
        <button className={style.currentCardReset} onClick={reset}>
          Обнулить изученные слова
        </button>
        <div className={style.currentCard}>
          <p className={style.currentCardWord}>{currentWordText}</p>
          <div className={style.currentCardBtnsWrap}>
            <button className={style.currentCardButtonYes} onClick={confirm}>
              Знаю
            </button>
            <button className={style.currentCardButtonNo} onClick={reject}>
              Не знаю
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentCard;