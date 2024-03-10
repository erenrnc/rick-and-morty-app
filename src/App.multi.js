import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import multiselectStyles from './multiselectStyles';

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacters, setSelectedCharacters] = useState([]);

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/character')
            .then(response => {
                setCharacters(response.data.results.map(character => ({
                    value: character.id,
                    label: character.name,
                    image: character.image, // Add the image URL to the options
                })));
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
                options={characters}
                selectedValues={selectedCharacters}
                onSelect={handleSelect}
                onRemove={handleRemove}
                displayValue="label"
                style={multiselectStyles}
                showCheckbox={true}
                placeholder="Select characters"
                closeIcon="cancel"
                avoidHighlightFirstOption={true}
                closeOnSelect={false}
                selectionLimit={5}
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
