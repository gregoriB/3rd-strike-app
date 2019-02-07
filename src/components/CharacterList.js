import React, { useEffect, useContext } from 'react';
import Character from './Character';
import CharacterData from './CharacterData';
import { StateContext } from '../contexts/stateContext'

export default function CharacterList() {
  const state = useContext(StateContext);
  const characters = [
    'Akuma', 'Yun', 'Ryu', 'Urien', 'Remy', 
    'Oro', 'Necro', 'Q', 'Dudley', 'Ibuki', 
    'Chun Li', 'Elena', 'Sean', 'Makoto', 
    'Hugo', 'Alex', 'Twelve', 'Ken', 'Yang'
  ];
  
  useEffect(() => {
    if (state.currentChar || state.charList) return;

    state.setCharList(characters.map((name, index) => {
        return ( 
          <Character
            useEffect={useEffect}
            currentChar={state.currentChar}
            setCurrentChar={state.setCurrentChar}
            key={index}
            charName={name}
          />
        )
      })
    );
  });

  return (
    <>
      { state.currentChar ? 
        <CharacterData 
          setCurrentChar={state.setCurrentChar}
          currentChar={state.currentChar} 
        /> 
        : <div className='flex-container'>{state.charList}</div> }
    </>

  )
}