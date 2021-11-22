import { useEffect, useState } from 'react';
import axios from 'axios';
import { CharacterCard } from './CharacterCard';

export const CharactersList = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/character')
        .then(response => setCharacters(response.data.results))
    }, []);
    console.log(characters);
    return(
        <div>
            <h1>Characters List</h1>
            <div>
                {
                    characters ? 
                    characters.map(character => <CharacterCard key={character.id} character={character} />) 
                    : 'Loading...'
                }
            </div>
        </div>
    )
}