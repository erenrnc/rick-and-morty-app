import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';

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

  const handleSelect = (selectedList, selectedItem) => {
    setSelectedCharacters(selectedList);
  };

  const handleRemove = (selectedList, removedItem) => {
    setSelectedCharacters(selectedList);
  };

  return (
    <div>
        <Multiselect
            options={characters.map(character => ({ value: character.id, label: character.name }))}
            selectedValues={selectedCharacters}
            onSelect={handleSelect}
            onRemove={handleRemove}
            displayValue="label"
            style={multiselectStyles}
        />
      <h2>Selected Characters:</h2>
      <ul>
        {selectedCharacters.map(character => (
          <li key={character.value}>{character.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
