import { useEffect, useState } from 'react';
import axios from 'axios';
import { CharacterCard } from './CharacterCard';

export const CharactersList = () => {
    // On déclare notre state pour stocker les données des personnages
    const [characters, setCharacters] = useState([]);
    // On déclare notre state pour stocker les info de la requête (pagination, nombre de résultats, etc.)
    const [infos, setInfos] = useState([]);
    // On déclare notre state pour determiné si on est en train de filtrer nos personnages ou non - par défaut on ne filtre pas
    const [charactersAlive, setCharactersAlive] = useState(false);
    // On déclare notre state pour stocker la current page - par defaut, on est sur la page 1
    const [currentPage, setCurrentPage] = useState(1);

    // On utilise useEffect pour récupérer les données qui nous interressent depuis la methode getDataFromApi
    useEffect(() => {
        getDataFromApi(currentPage)
    }, []);

    // On déclare notre fonction qui récupère les données qui nous interressent depuis l'API, en fonction de la page demandée
    const getDataFromApi = (numberPage) => {
        axios.get(`https://rickandmortyapi.com/api/character?page=${numberPage}`)
        .then(response => {
            setCharacters(response.data.results) 
            setInfos(response.data.info)
            setCurrentPage(numberPage)
        })
    }

    // On déclare une fonction qui permet de filtrer les personnages en fonction de leur statut (Alive)
    const filterCharacters = () => {
        // On verifie notre state charactersAlive
        // si celui ci est à false alors on filtre les personnages en fonction de leur statut
        // et on met à jour notre state charactersAlive a true
        if (charactersAlive === false) {
            setCharactersAlive(true)
            setCharacters(characters.filter(character => character.status === 'Alive'))
        } else {
            // sinon on remet à false notre state charactersAlive et on récupère les données initiales depuis l'API
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
                {/* Au click sur l'un des boutons de pagination 
                on fait appel à la methode getDataFromApi en demandant la current page + 1 ou - 1 */}
                <button type="button" onClick={() => infos.prev != null && getDataFromApi(currentPage - 1)}>Prev</button>
                <button type="button" onClick={() => infos.next != null && getDataFromApi(currentPage + 1)}>Next</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
                {/* on boucle sur le state characters et passons comme props au component CharacterCard un character à chaque fois */}
                {
                    characters ? 
                    characters.map(character => <CharacterCard key={character.id} character={character} />) 
                    : 'Loading...'
                }
            </div>
        </div>
    )
}