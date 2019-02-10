import React, { useEffect, useContext } from 'react';
import Character from './Character';
import { StateContext } from '../contexts/stateContext';
import { Link } from 'react-router-dom';
import { characters } from '../helpers/variables';

export default function CharacterList() {
  const state = useContext(StateContext);
 
  useEffect(() => {
    if (state.charList) return;

    state.setCharList(characters.map((name, index) => {
        return (
          <Link className='character' to={`/${name}`} key={index}>
            <Character setCurrentChar={state.setCurrentChar} charName={name} />
          </Link>
        );
      })
    );
  });

  return <div className='flex-container'>{state.charList}</div>
}