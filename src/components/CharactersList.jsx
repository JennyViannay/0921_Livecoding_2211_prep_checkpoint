import { useEffect, useState } from 'react';
import axios from 'axios';
import { CharacterCard } from './CharacterCard';

export const CharactersList = () => {
    const [characters, setCharacters] = useState([]);
    const [infos, setInfos] = useState([]);
    const [charactersAlive, setCharactersAlive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getDataFromApi(currentPage)
    }, []);

    const getDataFromApi = (numberPage) => {
        axios.get(`https://rickandmortyapi.com/api/character?page=${numberPage}`)
        .then(response => {
            setCharacters(response.data.results) 
            setInfos(response.data.info)
            setCurrentPage(numberPage)
        })
    }

    const filterCharacters = () => {
        if (charactersAlive === false) {
            setCharactersAlive(true)
            setCharacters(characters.filter(character => character.status === 'Alive'))
        } else {
            setCharactersAlive(false)
            getDataFromApi()
        }
    }

    return (
        <div className="container mx-auto py-4">
            <h1>Characters List</h1>
            <div>
                <p>Total result : {infos && infos.count}</p>
                <p>{currentPage} / {infos && infos.pages} </p>
            </div>
            <div>
                <button 
                type="button" 
                className="bg-green-500 hover:bg-green-300 text-gray-800 font-bold p-3 border rounded-xl"
                onClick={() => filterCharacters()}>{charactersAlive ? 'Get All Characters' : 'Get Alive Characters'}
                </button>
                <br />
                <button type="button" onClick={() => infos.prev != null && getDataFromApi(currentPage - 1)}>Prev</button>
                <button type="button" onClick={() => infos.next != null && getDataFromApi(currentPage + 1)}>Next</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
                {
                    characters ? 
                    characters.map(character => <CharacterCard key={character.id} character={character} />) 
                    : 'Loading...'
                }
            </div>
        </div>
    )
}