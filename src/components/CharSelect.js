import React, { useEffect, useContext } from 'react';
import Character from './Character';
import { Link } from 'react-router-dom';
import { StateContext } from '../contexts/stateContext';
import { characters, uniqueKey } from '../helpers/variables';

export default function CharacterList() {
  const state = useContext(StateContext);
 
  useEffect(() => {
    state.setCharList(characters.map((name) => {
        return (
          <Link className='character' to={`/${name}`} key={uniqueKey.incrementKey()}>
            <Character charName={name} />
          </Link>
        );
      })
    );
  }, []);

  return <div className='flex-container'>{state.charList}</div>
}
