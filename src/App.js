import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './selectStyles.css';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        setCharacters(response.data.results.map(character => ({
          value: character.id,
          label: character.name,
          image: character.image,
        })));
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });
  }, []);

  const handleSelect = (selectedOptions) => {
    setSelectedCharacters(selectedOptions);
  };

  const customFilterOption = (option, searchText) => option.label.props.children[1].toLowerCase().includes(searchText.toLowerCase());

  return (
    <div>
      <Select
        options={characters}
        value={selectedCharacters}
        onChange={handleSelect}
        isMulti
        filterOption={customFilterOption}
        getOptionLabel={(option) => (
          <div>
            <img src={option.image} alt={option.label} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
            {option.label}
          </div>
        )}
        getOptionValue={(option) => option.value}
        placeholder="Search characters..."
      />
      <h2>Selected Characters:</h2>
      <ul>
        {selectedCharacters.map(character => (
          <li key={character.value}>
            <img src={character.image} alt={character.label} style={{ width: '30px', height: '30px', marginRight: '5px' }} />
            {character.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
