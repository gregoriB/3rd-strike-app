import React, { useState, useEffect } from 'react';
import Character from './Character';


export default function CharacterList() {
  const characters = ['Akuma', 'Yun', 'Ryu', 'Urien', 'Remy', 'Oro', 'Necro', 'Q', 'Dudley', 'Ibuki', 'Chun Li', 'Elena', 'Sean', 'Makoto', 'Hugo', 'Alex', 'Twelve', 'Ken', 'Yang'];
  
  const [charList, setCharList] = useState(null)

  useEffect(() => {
    // if (this.props.currentChar) return;

    setCharList(characters.map((name, index) => {
        return ( 
          <Character
            key={index}
            charName={name}
          />
        )
      })
    );
  });

  return (
    <div className='flex-container'>
      {/* {!this.props.currentChar && this.props.charList} */}
      {charList}
    </div>

  )
}