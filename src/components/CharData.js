import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../contexts/stateContext';
import { Link } from 'react-router-dom';

export default function CharacterData(props) {
  const [dataTable, setDataTable] = useState(null);
  const state = useContext(StateContext);
  const char = props.currentChar ? props.currentChar : state.currentChar;


  const handleChooseTable = (e) => {
    setDataTable(null);
    const type = e.target.value;
    type === 'Misc' ? handleSetMisc() : handleSetMoveList(type);
  }
  
  const handleSetMisc = () => {
    let newData;
    import(`../data/${char}/${char} - Misc.json`)
    .then(data => newData = data['default'])
    .then(() => {
      setDataTable(() => {
        const charInfo = [];
        for (const stuff in newData) {
          if (stuff !== 'name' && stuff !== 'category') {
            charInfo.push(<li key={Math.random() * 1000}>{stuff}: {newData[stuff]}</li>);
          }
        }

        return charInfo;
      });
    });
  }

  const handleSetMoveList = (type) => {
    console.log(type)
    let moveSet;
    import(`../data/${char}/${char} - ${type}.json`)
      .then(data => moveSet = data['default'])
      .then(() => {
        setDataTable(() => {
          const newData    = Object.entries(moveSet).splice(2),
                attackType = [],
                th         = [],
                td         = [];
          newData.forEach(attack => {
            attackType.push(attack[0]);
            th.push(Object.keys(attack[1]))
            td.push(Object.values(attack[1]))
          });
          let charInfo = [];
          charInfo.push(th[0].map(head => <th className='table-head' key={Math.random() * 1000}>{head}</th>))
          
          charInfo[0].unshift(<th className='table-head' key={Math.random() * 1000}>Attack</th>)
          
          td.forEach(row => {
            charInfo.push(row.map(data => {
              return <td className='frame-data' key={Math.random() * 1000}>{typeof data !== 'object' ? data : 'cancels'}</td>;
            }));
          });

          attackType.forEach((type, index)=> charInfo[index+1].unshift(<td className='attack-type' key={Math.random() * 1000}>{type}</td>))
          
          return charInfo = charInfo.map(info => <tr key={Math.random() * 1000}>{info}</tr> );
        });
    });
  }

  useEffect(() => {
    handleSetMoveList('Normals');

    return () => setDataTable(null)
  }, []);

  return (
    <>
      <Link to='/'><button className='home-button'>HOME</button></Link>
      <h1 className='char-name'>{state.currentChar}</h1>
      <div className="selector-buttons">
        <button className='button-type' value='Normals' onClick={handleChooseTable}>NORMALS</button>
        <button className='button-type' value='Specials' onClick={handleChooseTable}>SPECIALS</button>
        <button className='button-type' value='Super Arts' onClick={handleChooseTable}>SUPER ARTS</button>
        {
          state.currentChar === 'Yun' && 
          <button className='button-type' value='GeneiJin normals' onClick={handleChooseTable}>
            GENEIJIN NORMALS
          </button>
        }
        {
          state.currentChar === 'Yun' && <button className='button-type' value='GeneiJin specials' onClick={handleChooseTable}>
            GENEIJIN SPECIALS
          </button>
        }
        <button className='button-type' value='Misc' onClick={handleChooseTable}>MISC</button>
      </div>
      <table cellSpacing='0'>
        <tbody>{dataTable}</tbody>
      </table>
      
    </>
  )
}