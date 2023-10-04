import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./autocomple.module.css";

interface AutoCompleteProps {
  onInputValue: (
    e: string,
    query: string,
    setInputValue: Dispatch<SetStateAction<string>>
  ) => void;
  options: any;
}

export const AutoComplete = ({ onInputValue, options }: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState("");
  const [searchedWords, setSearchedWords] = useState([]);

  useEffect(() => {
    const newSearchedWord = { ...searchedWords };

    if (!Object.keys(newSearchedWord).includes(inputValue)) {
      onInputValue(inputValue, "nameStartsWith", setInputValue);
    }

    newSearchedWord[inputValue] = {};
    setSearchedWords(newSearchedWord);
  }, [inputValue]);

  const renderSuggestions = () => {
    return (
      <div className={styles.suggestions}>
        <ul>
          {Object.values(options).map((elem, index) => {
            const elemName = elem.name.toLowerCase();
            const inputValueToCheck = inputValue.toLowerCase();
            if (elemName.includes(inputValueToCheck)) {
              return <div key={index}>{elem.name}</div>; // Add a unique key for each element
            }
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.autocomplete}>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && Object.keys(options).length > 0 && renderSuggestions()}
      </div>
    </div>
  );
};
