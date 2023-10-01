"use client";

import React, { useState } from "react";
import crypto from "crypto"

const data = 'Hello, World!';
const md5Hash = crypto.createHash('md5').update(data).digest('hex');

console.log(md5Hash); 

const PokemonSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    setSearchTerm(event.target.value);
    const data = await fetchPokemonSuggestions(event.target.value);
    if (data.id) {
      setSuggestions([data.name]); // If a Pokémon with the given name exists, set it as a suggestion
    } else {
      setSuggestions(["hello", "barbie"]); // Clear suggestions if no matching Pokémon is found
    }
  };

  const fetchPokemonSuggestions = async (searchTerm) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
    );
    const data = await response.json();
    return data;
  };
  console.log(crypto)

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a Pokémon"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <ul>
        <li>pokemonName</li>
        <li>pokemonName</li>
        <li>pokemonName</li>
      </ul>
    </div>
  );
};

export default PokemonSearch;
