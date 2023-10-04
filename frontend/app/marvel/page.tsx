"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AutoComplete } from "../components/AutoComplente";
const crypto = require("crypto-js");

export default function Marvel() {
  const [results, setResults] = useState({});

  const fetchMarvelData = async (
    e: string,
    query: string,
    setInputValue: Dispatch<SetStateAction<string>>
  ) => {
    if (e) {
      try {
        const response = await fetch(
          `http://localhost:8000/marvel?${query}=${e}`
        );
        const data = await response.json();
        const newResults = { ...results };

        data.data.results.forEach((result: any) => {         
          newResults[result.id] = {
            name: result.name,
          };
          setResults(newResults);
        });
        console.log("data.data", data.data)
      } catch (error) {
        setInputValue("");
        console.log("error: ", error);
      }
    }
  };

  // const MARVEL_API_BASE = "http://gateway.marvel.com/v1/public";
  // const MARVEL_PUBLIC_KEY = "3545a684c93eb550cef8db5d4e3a71c6";
  // const MARVEL_PRIVATE_KEY = "519800599e6cd234da911b7e30b1829b19ed2c66";

  // const fetchMarvelData = async (
  //   e: string,
  //   query: string,
  //   setInputValue: Dispatch<SetStateAction<string>>
  // ) => {
  //   const ts = new Date().getTime();
  //   const hash = crypto
  //     .MD5(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY)
  //     .toString();
  //   const apiUrl = `${MARVEL_API_BASE}/characters?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}&${query}=${e}`;

  //   try {
  //     const response = await fetch(apiUrl);
  //     if (!response.ok) {
  //       throw Error(`Error fetching the data ${response.statusText}`);
  //     }
  //     const data = await response.json();

  //     setMarvelData(data.data);
  //   } catch (error) {
  //     setInputValue("");
  //     console.log("errorssssss", error);
  //   }
  // };

  return (
    <div>
      <AutoComplete onInputValue={fetchMarvelData} options={results} />
    </div>
  );
}
