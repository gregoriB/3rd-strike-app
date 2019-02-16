import React, { useContext, useEffect } from 'react';
import CharData from './components/CharData';
import CharSelect from './components/CharSelect';
import Error from './components/Error';
import { Route, Switch } from 'react-router-dom';
import { StateContext } from './contexts/stateContext';
import { characters } from './helpers/variables';
import './normalize.css';
import './App.css';

export default function App() {
  const state = useContext(StateContext);

  const handleCheckPath = () => {
    const path = window.location.pathname.split('/')[1].replace(/%20/g, ' ');
    console.log('test')
    console.log(window.location.pathname)
    for (const char of characters) {
      if (path.toLowerCase() === char.toLowerCase()) {
        state.setCurrentChar(char);
        
        return <CharData currentChar={char}/>;
      }
    }

    return <Error />;
  }

  useEffect(() => {
    console.log('App page loaded');
  })

return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={CharSelect} />
        <Route path={`/${state.currentChar}`} component={CharData} />
        <Route render={handleCheckPath} />
      </Switch>
    </div>
  );
}
