import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from "./components/Header";
import { CharactersList } from "./components/CharactersList";
import { CharacterDetails } from "./components/CharacterDetails";

const App = () => {
  return (
    <Router>
      {/* Header sera affiché dans toutes les pages */}
      <Header name="Jenny" />
      <Routes>
        {/* Les routes sont définies ici */}
        {/* La route principale sur '/ */}
        <Route exact path='/' element={<CharactersList />} />
        {/* Une route qui prend en parametre un id et qui affiche le composant CharacterDetails */}
        <Route path='/character/:id' element={<CharacterDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
