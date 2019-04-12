import React, { useState } from 'react'

export const StateContext = React.createContext();

export function StateProvider(props) {
  
  const [currentChar, setCurrentChar] = useState('Ryu'),
        [charList, setCharList]       = useState(null),
        [dataTable, setDataTable]     = useState(null),
        [charInfo, setCharInfo]       = useState({name: 'Ryu', category: 'Normals' }),
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