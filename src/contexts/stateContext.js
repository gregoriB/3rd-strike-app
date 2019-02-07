import React, { useState } from 'react'

export const StateContext = React.createContext();

export function StateProvider(props) {
  const [currentChar, setCurrentChar] = useState(null);
  const [charList, setCharList] = useState(null);

  return (
    <StateContext.Provider 
      value={{
        currentChar,
        setCurrentChar,
        charList,
        setCharList
      }}
    >
      {props.children}
    </StateContext.Provider>
  )
}
