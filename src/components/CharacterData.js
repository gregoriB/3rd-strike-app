import React, { useContext } from 'react';
import { StateContext } from '../contexts/stateContext';
import { Link } from 'react-router-dom';


export default function CharacterData() {
  const state = useContext(StateContext);

  return (
    <>
      <Link to='/'><button>HOME</button></Link>
      <h1>{state.currentChar}</h1>
    </>
  )
}