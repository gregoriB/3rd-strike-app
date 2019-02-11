import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../contexts/stateContext';
import { Link } from 'react-router-dom';

export default function CharacterData() {
  const [misc, setMisc] = useState(null);
  const [normals, setNormals] = useState(null);
  const state = useContext(StateContext);
  
  const handleSetMisc = () => {
    let newData;
    import(`../data/${state.currentChar}/${state.currentChar} - Misc.json`)
    .then(data => newData = data['default'])
    .then(() => {
      setMisc(() => {
        const charInfo = []
        for (const stuff in newData) {
          if (stuff !== 'name' && stuff !== 'category') {
            charInfo.push(<li key={Math.random() * Date.now}>{stuff}: {newData[stuff]}</li>)
          }
        }

        return charInfo;
      });
    });
  }

  const handleSetNormals = () => {
    let moveSet;
    import(`../data/${state.currentChar}/${state.currentChar} - Normals.json`)
      .then(data => moveSet = data['default'])
      .then(() => {
        setNormals(() => {
          const newData = Object.entries(moveSet).splice(2)
          const charInfo = newData.map(attack => {
            const attackName = attack[0];

            return (
              <div key={Math.random() * Date.now} className='data-table'>
                <strong>{attackName}</strong>
                <ul>
                  {typeof attack[1] !== 'object' && attack[1]}
                  {Object.entries(attack[1]).map(frames => {

                    return <li key={Math.random() * Date.now}>{frames[0]}: {typeof frames[1] !== 'object' && frames[1]}</li>
                  })}
                </ul>
              </div>
            )
          });

          return charInfo;
        });
    });
  }

  useEffect(() => {
    handleSetMisc();
    handleSetNormals();

    return () => {
      setMisc(null);
      setNormals(null);
    }
  }, []);

  return (
    <>
      <Link to='/'><button>HOME</button></Link>
      <h1>{state.currentChar}</h1>
      {misc}
      {normals}
    </>
  )
}