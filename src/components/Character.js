import React, { useContext} from 'react';
import { StateContext } from '../contexts/stateContext';

export default function Character(props) {
  const state = useContext(StateContext);

  return <div onClick={state.setCurrentChar}>{props.charName}</div>
}