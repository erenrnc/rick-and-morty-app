import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        setCharacters(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });
  }, []);

  const handleCharacterSelect = (event) => {
    const selectedIds = Array.from(event.target.selectedOptions, option => option.value);
    const selectedChars = characters.filter(char => selectedIds.includes(char.id.toString()));
    setSelectedCharacters(selectedChars);
  };

  return (
    <div>
      <h1>Rick and Morty Character Selector</h1>
      <select multiple onChange={handleCharacterSelect}>
        {characters.map(character => (
          <option key={character.id} value={character.id}>
            {character.name}
          </option>
        ))}
      </select>
      <h2>Selected Characters:</h2>
      <ul>
        {selectedCharacters.map(character => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
