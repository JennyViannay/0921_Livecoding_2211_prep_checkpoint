import { Link } from "react-router-dom"

export const CharacterCard = ({ character }) => {
    return(
        <div className="mx-2">
            <h3>{character.name}</h3>
            <img src={character.image} alt={character.name} />
            <p>Status = {character.status}</p>
            <Link to={`/character/${character.id}`}>Voir plus</Link>
        </div>
    )
}