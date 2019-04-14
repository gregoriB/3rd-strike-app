import React, { useEffect, useContext, useRef } from 'react';
import Character from './Character';
import { Link } from 'react-router-dom';
import { StateContext } from '../contexts/stateContext';
import { characters, uniqueKey } from '../helpers/variables';

export default function CharacterList() {
  const state = useContext(StateContext);

  const charSelect = useRef(null);

  const handleSetupPage = () => {
    const select = charSelect.current;
    select.style.marginTop = `${(window.innerHeight - select.offsetHeight) / 5}px`;
  }
  
  useEffect(() => {
    handleSetupPage();
    state.setCurrentCategory('Normals');
    state.setCharList(characters.map((name) => {
        return (
          <Link className='character' to={`/${name}`} key={uniqueKey.incrementKey()}>
            <Character charName={name} />
          </Link>
        );
      })
    );
  }, []);

  return <div className='flex-container' ref={charSelect}>{state.charList}</div>
}
