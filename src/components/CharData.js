import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../contexts/stateContext';
import { Link } from 'react-router-dom';

export default function CharacterData(props) {
  const state = useContext(StateContext),
        char  = props.currentChar ? props.currentChar : state.currentChar;

  const [dataTable, setDataTable] = useState(null),
        [charInfo, setCharInfo]   = useState({name: null, category: null });

  const handleActivateButton = (e) => {
    if (charInfo.category === e.target.value) return;

    document.querySelectorAll('.button-type').forEach(button => button.classList.remove('active'))
    e.target.classList.add('active')
    setDataTable(null);
    handleImportData(e.target.value);
  }

  const handleImportData = (type) => {

    let moveSet;
    import(`../data/${char}/${char} - ${type}.json`)
    .then(data => moveSet = data['default'])
    .then(() => {
      setDataTable(() => {
          //set character info for page header
        const info      = Object.entries(moveSet).splice(0, 2);
        setCharInfo({name: info[0][1], category: info[1][1]});

        const newData   = Object.entries(moveSet).splice(2),
              tableData = handleBuildTable(newData);
                  
        return (
          <table cellSpacing='0' className='move-list'>
            <thead><tr key={Math.random() * 1000}>{tableData[0].map(headItem => headItem)}</tr></thead>
            <tbody>{tableData.splice(1).map(dataItem => <tr key={Math.random() * 1000}>{dataItem}</tr>)}</tbody>
          </table>
        )
      });
  });
  }

  const handleBuildTable = (data) => {
    const attackType = data.map(item => item[0]),
          frameData  = data.map(item => Object.values(item[1])),
          tableHead  = ["Attack", ...Object.keys(data[0][1])],
          tableData  = [];

    tableData.push(tableHead.map(head => <th className='table-head-item' key={Math.random() * 1000}>{head}</th>));
    frameData.forEach((row, index) => {
      tableData.push(row.map(data => {
        let cssClass = 'frame-data';
        if (typeof parseInt(data) === 'number' && data < 0) (cssClass += ' negative');
        
        return  <td className={cssClass} key={Math.random() * 1000}>{typeof data !== 'object' ? data : 'cancels'}</td>;
      }));
      tableData[index + 1].unshift(<td className='attack-type' key={Math.random() * 1000}>{attackType[index]}</td>);
    });

    return tableData;
  }

  useEffect(() => {
    document.querySelector('.default').click();

    return () => {
      setDataTable(null)
      setCharInfo(null)
    }
  }, []);

  return (
    <>
      <div className="char-head">
        <div className='char-name'>{charInfo.name}</div>
        <div className='char-info'>{charInfo.category}</div>
      </div>
      <Link to='/'><button className='home-button'>HOME</button></Link>
      <div className="selector-buttons">
        <button className='button-type default' value='Normals' onClick={handleActivateButton}>NORMALS</button>
        <button className='button-type' value='Specials' onClick={handleActivateButton}>SPECIALS</button>
        <button className='button-type' value='Super Arts' onClick={handleActivateButton}>SUPER ARTS</button>
        {
          state.currentChar === 'Yun' && 
          <button className='button-type' value='GeneiJin normals' onClick={handleActivateButton}>
            GENEIJIN NORMALS
          </button>
        }
        {
          state.currentChar === 'Yun' && <button className='button-type' value='GeneiJin specials' onClick={handleActivateButton}>
            GENEIJIN SPECIALS
          </button>
        }
        <button className='button-type' value='Misc' onClick={handleActivateButton}>MISC</button>
      </div>
      {dataTable}
      
    </>
  )
}