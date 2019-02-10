import React, { useContext } from 'react';
import CharacterList from './components/CharacterList';
import CharacterData from './components/CharacterData';
import Error from './components/Error';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StateContext } from './contexts/stateContext';
import { characters } from './helpers/variables';
import './App.css';

export default function App() {
  const state = useContext(StateContext);

  const handleCheckPath = () => {
    const path = window.location.pathname.split('/')[1].replace(/%20/g, ' ');
    for (const char of characters) {
      if (path.toLowerCase() === char.toLowerCase()) {
        state.setCurrentChar(char);
        return <CharacterData />;
      }
    }

    return <Error />;
  }

return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/' component={CharacterList} exact />
          <Route path={`/${state.currentChar}`} component={CharacterData} />
          <Route render={handleCheckPath} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
