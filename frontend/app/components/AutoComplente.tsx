import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./autocomple.module.css";

type Results = {
  [key: string]: {
    name: string;
    id: number
  };
};

interface AutoCompleteProps {
  onInputValue: (
    e: string,
    setInputValue: Dispatch<SetStateAction<string>>
  ) => void;
  options: Results;
  onSearchClick: (inputValue: string) => void
  onAutoCompleteClick: (id: number) => void
}

type SearchedWords = {
  [key: string]: {};
};

export const AutoComplete = ({ onInputValue, options, onSearchClick, onAutoCompleteClick }: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchedWords, setSearchedWords] = useState<SearchedWords>({});

  useEffect(() => {
    const newSearchedWord = { ...searchedWords };

    if (!Object.keys(newSearchedWord).includes(inputValue)) {
      onInputValue(inputValue, setInputValue);
    }

    newSearchedWord[inputValue] = {};
    setSearchedWords(newSearchedWord);
  }, [inputValue]);

  const filterValues = () => {
    const listToShow = Object.values(options).filter((elem) => {
      const elemName = elem.name.toLowerCase();
      const inputValueToCheck = inputValue.toLowerCase();
      if (elemName.startsWith(inputValueToCheck)) {
        return elem;
      }
    });

    return listToShow.slice(0, 10);
  };

  const renderSuggestions = () => {
    return (
      <div className={styles.suggestions}>
        <ul className={styles.suggestionsList}>
          {Object.values(filterValues()).map((elem, index) => {
            return (
              <li key={index}>
                <button className={styles.suggestionButton} onClick={() => onAutoCompleteClick(elem.id)}>{elem.name}</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.autocomplete}>
      <div className={styles.inputContainer}>
        <div className={styles.inputAndSearchButton}>
          <input
            className={styles.input}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className={styles.inputSearchButton} onClick={() => onSearchClick(inputValue)}>Search</button>
        </div>
        {inputValue && Object.keys(options).length > 0 && renderSuggestions()}
      </div>
    </div>
  );
};
