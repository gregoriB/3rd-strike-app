import React, { useContext, useEffect } from 'react';
import { StateContext } from '../contexts/stateContext';
import { Link } from 'react-router-dom';

export default function CharacterData(props) {
  const state = useContext(StateContext),
        char  = props.currentChar ? props.currentChar : state.currentChar; //workaround to stop typing the in name in address bar from causing errors

  const handleChooseCategory = (e) => {
    if (state.charInfo && state.charInfo.category === e.target.value) return;

    document.querySelectorAll('.button-type').forEach(button => button.classList.remove('active'));
    e.target.classList.add('active');
    state.setDataTable(null);
    handleImportData(e.target.value);
  }

  const handleImportData = type => {
      //using import() because 'require' doesn't work with dynamic paths
    import(`../data/${char}/${char} - ${type}.json`)
    .then(moveSet => moveSet['default'])
    .then((moveSet) => handleSetTableData(moveSet));
  }

  const handleSetTableData = moveSet => {
    state.setDataTable(() => {
      //set character info for page header
      const info = Object.entries(moveSet).splice(0, 2);
      state.setCharInfo({name: info[0][1], category: info[1][1]});
      // build data table
      const newData = Object.entries(moveSet).splice(2),
            table   = handleBuildTable(newData);
                
      return (
        <table cellSpacing='0' className='move-list'>
          <thead><tr key={Math.random() * 1000}>{table[0].map(headItem => headItem)}</tr></thead>
          <tbody>{table.splice(1).map(dataItem => <tr key={Math.random() * 1000}>{dataItem}</tr>)}</tbody>
        </table>
      )
    });
  }

  const handleBuildTable = data => {
    const attackType = data.map(item => item[0]),
          frameData  = data.map(item => Object.values(item[1])),
          tableHead  = ["Attack", ...Object.keys(data[0][1])],
          tableData  = [];
    tableData.push(tableHead.map(head => <th className='table-head-item' key={Math.random() * 1000}>{head}</th>));
    frameData.forEach((row, index) => {
      tableData.push(row.map(data => {
        let cssClass = 'frame-data';
        if (typeof parseInt(data) === 'number' && data < 0) (cssClass += ' negative');
        
        return  <td className={cssClass} key={Math.random() * 1000}>{typeof data !== 'object' ? data : handleCancelData(data)}</td> 
      }));
      tableData[index + 1].unshift(<td className='attack-type' key={Math.random() * 1000}>{attackType[index]}</td>);
    });

    return tableData;
  }

  const handleCancelData = data => {
    let cancels = []
    for (let cancel in data) if (data[cancel]) cancels.push(cancel);

    return cancels.map(cancel => handleCheckCancelType(cancel))
  }

  const handleCheckCancelType = cancel => {
    let type;
    switch(cancel) {
      case '??':
        type = '??'
        break;
      case 'Super Art':
        type = 'SA';
        break;
      case 'Special':
        type = 'SP';
        break;
      case 'Normal/Chain':
        type = 'NC';
        break;
      case 'Dash':
        type = 'DASH';
        break;
      case 'Superjump':
        type = 'SJ';
        break;
      default:
        break;
    }

    return <span className={`${type} cancel`}>{type}</span>
  }

  useEffect(() => {
    document.querySelector('.default').click();

    return () => {
      state.setDataTable(null)
      state.setCharInfo(null)
    }
  }, []);

  return (
    <>
      <div className="char-head">
        <div className='char-name'>{state.charInfo && state.charInfo.name}</div>
        <div className='char-info'>{state.charInfo && state.charInfo.category}</div>
      </div>
      <Link to='/'><button className='home-button'>HOME</button></Link>
      <div className="selector-buttons">
        <button className='button-type default' value='Normals' onClick={handleChooseCategory}>NORMALS</button>
        <button className='button-type' value='Specials' onClick={handleChooseCategory}>SPECIALS</button>
        <button className='button-type' value='Super Arts' onClick={handleChooseCategory}>SUPER ARTS</button>
        {
          state.currentChar === 'Yun' && 
          <button className='button-type' value='GeneiJin normals' onClick={handleChooseCategory}>
            GENEIJIN NORMALS
          </button>
        }
        {
          state.currentChar === 'Yun' && <button className='button-type' value='GeneiJin specials' onClick={handleChooseCategory}>
            GENEIJIN SPECIALS
          </button>
        }
        <button className='button-type' value='Misc' onClick={handleChooseCategory}>MISC</button>
      </div>
      {state.dataTable}
    </>
  )
}