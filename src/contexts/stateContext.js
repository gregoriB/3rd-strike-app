import React, { useState } from 'react'

export const StateContext = React.createContext();

export function StateProvider(props) {
  
  const [currentChar, setCurrentChar] = useState(null),
        [charList, setCharList]       = useState(null),
        [dataTable, setDataTable]     = useState(null),
        [charInfo, setCharInfo]       = useState(null),
        [currentCategory, setCurrentCategory] = useState('Normals');

  return (
    <StateContext.Provider 
      value={{
        currentChar,
        setCurrentChar,
        charList,
        setCharList,
        dataTable,
        setDataTable,
        charInfo,
        setCharInfo,
        currentCategory,
        setCurrentCategory
      }}
    >
      {props.children}
    </StateContext.Provider>
  )
}