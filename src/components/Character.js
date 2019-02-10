import React from 'react';

export default function Character(props) {
  const setCurrentChar = () => props.setCurrentChar(props.charName)

  return <div onClick={setCurrentChar}>{props.charName}</div>
}