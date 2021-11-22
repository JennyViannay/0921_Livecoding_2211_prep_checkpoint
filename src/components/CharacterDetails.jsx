import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const CharacterDetails = () => {
    // Grace à useParams, on récupère l'id du personnage dans l'url
    const { id } = useParams();
    // On déclare notre state pour stocker les données du personnage
    const [character, setCharacter] = useState({});

    // On utilise useEffect pour récupérer les données du personnage depuis la methode getCharacter
    useEffect(() => {
        getCharacter()
    })
    
    // On déclare notre fonction qui récupère les données du personnage depuis l'API
    const getCharacter = () => {
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => setCharacter(response.data))
    }

    // On retourne le template et les infos du personnage que l'on souhaite afficher
    return (
        <div className="">Character Details
            { character && 
                <h1>{character.name}</h1>
            }
        </div>
    )
}