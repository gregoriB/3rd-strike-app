import React from 'react'

export default function Character(props) {
  const setCurrentChar = () => props.setCurrentChar(props.charName)
  return (
    <div 
      className='character'
      onClick={setCurrentChar}
    >
      {props.charName}
    </div>
  );
}