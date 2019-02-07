import React, { useState, useEffect } from 'react';
import Character from './Character';
import CharacterData from './CharacterData';

export default function CharacterList() {
  const characters = [
    'Akuma', 'Yun', 'Ryu', 'Urien', 'Remy', 
    'Oro', 'Necro', 'Q', 'Dudley', 'Ibuki', 
    'Chun Li', 'Elena', 'Sean', 'Makoto', 
    'Hugo', 'Alex', 'Twelve', 'Ken', 'Yang'
  ];
  
  const [charList, setCharList] = useState(null);
  const [currentChar, setCurrentChar] = useState(null);

  useEffect(() => {
    if (currentChar || charList) return;

    setCharList(characters.map((name, index) => {
      console.log(name)
        return ( 
          <Character
            useEffect={useEffect}
            currentChar={currentChar}
            setCurrentChar={setCurrentChar}
            key={index}
            charName={name}
          />
        )
      })
    );
  });
  return (
    <>
      { currentChar ? 
        <CharacterData 
          setCurrentChar={setCurrentChar}
          currentChar={currentChar} 
        /> 
        : <div className='flex-container'>{charList}</div> }
    </>

  )
}