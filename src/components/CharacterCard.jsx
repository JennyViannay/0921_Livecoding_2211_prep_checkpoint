import { Link } from "react-router-dom"
// ce component est un composant qui va nous permettre d'afficher les infos name et image plus statue
// d'un personnage en particulier depuis la props character
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