import React, { useContext, useEffect } from 'react';
import { StateContext } from '../contexts/stateContext';
import { uniqueKey } from '../helpers/variables';
import NavBar from './NavBar';

export default function CharacterData(props) {
  const state = useContext(StateContext),
        char  = props.currentChar || state.currentChar; //workaround to stop manually inputing the name in the address bar from causing errors

  const handleChooseCategory = e => {
    document.querySelectorAll('.button-type').forEach(button => button.classList.remove('active'));
    e.target.classList.add('active');
    handleImportData();
  }
  
  const handleImportData = () => {
    state.setDataTable(null);
      //using import() because 'require' doesn't work with dynamic paths
    import(`../data/${char}/${char} - ${state.currentCategory}.json`)
    .then(moveSet => moveSet['default'])
    .then((moveSet) => handleSetTableData(moveSet));
  }

  const handleSetTableData = moveSet => {
    console.log(moveSet)
      //set character info for page header
    const info = Object.entries(moveSet).splice(0, 2);
    state.setCharInfo({name: info[0][1].split(' / ').join(' '), category: info[1][1]});
    const newData = Object.entries(moveSet).splice(2);
    const table   = handleBuildTable(newData, info);
    state.setDataTable(() => 
      <table cellSpacing='0' className='move-list'>
        <thead><tr key={uniqueKey.incrementKey()}>{table[0].map(headItem => headItem)}</tr></thead>
        <tbody>{table.splice(1).map(dataItem => <tr key={uniqueKey.incrementKey()}>{dataItem}</tr>)}</tbody>
      </table>
    );
  }

  const handleBuildTable = (data, info) => {
    const attackType = data.map(item => item[0]),
          dataType   = info[1][1] === 'Misc' ? 'Move Type' : 'Attack',
          frameData  = data.map(item => Object.values(item[1])),
          tableHead  = [dataType, ...Object.keys(data[0][1])],
          tableData  = [];
    tableData.push(tableHead.map((head, index) => <th className='table-head-item' onClick={(e) => handleClickHead(e, index)} key={uniqueKey.incrementKey()}>{head}</th>));
    frameData.forEach((row, index) => {
      tableData.push(row.map(data => handleDetermineDataType(data)));
      tableData[index + 1].unshift(<td className='attack' key={uniqueKey.incrementKey()}>{attackType[index]}</td>);
    });

    return tableData;
  }

  const handleDetermineDataType = data => {
    let cssClass = 'misc-data';
    let type = cssClass.split(' ')[0] === 'number' ? Number(type) : data;
    if (data < 0) {
      cssClass = 'number negative';
    }
    else if (data > 0) {
      cssClass = 'number positive';
    }
    else if (data > -1 && data < 1) {
      cssClass = 'number neutral';
    }
    else if (typeof data === 'object') {
      cssClass = '';
      type = handleCancelsData(data);
    }
    else if (typeof data === 'string') {
      type = handleOrganizeString(data);
    }

    return <td className={`frame-data ${cssClass}`} key={uniqueKey.incrementKey()}>{type}</td>;
  }  

  const handleOrganizeString = data => {
    let cssClass;
    const controllerMotions = [
      'QCB', 'QCF', 'HCB', 'HCF', 'DPM', 'RDP', '360', '720', 'Hold', 'Mash', 'Down', 'Jab', 'Punch'
    ];
    const splitData = data.split(' ');
    const newData = [];
    for (let item of splitData) {
      let type;
      switch(item) {
        case '0':
          cssClass = 'number neutral';
          break;
        case 'D':
          cssClass = 'down';
          type = 'KD'
          break;
        case 'H':
          cssClass = 'high';
          break;
        case 'L':
          cssClass = 'low';
          break;
        case '+':
          cssClass = 'plus-sign';
          break;
        case '/':
        case '-':
        case '~':
        case '(':
        case ')':
         cssClass = 'separator';
          break;
        case '--':
          cssClass = 'blank-spot'
          break;
        default:
          if (controllerMotions.includes(item)) {

            return handleControllerMotions(splitData);
          }
          if (item > 0 && parseInt(item)) {
            cssClass = 'number positive';
          }
          if (item < 0 && parseInt(item)) {
            cssClass = 'number negative';
          }
          break;
      }
      newData.push(<div className={cssClass} key={uniqueKey.incrementKey()}>{type || item}</div>);
    }

    return newData;
  }

  const handleControllerMotions = data => {
    const newData = [];
    let cssClass;
    for (let item of data) {
      let modifiedData = [...data];
      let newItem;
      switch(item) {
        case '360':
          modifiedData.splice(0, 1, 'rotation', 'or', 'reverse-rotation')
          return handleControllerMotions(modifiedData);

        case 'rotation':
          cssClass = 'attack-motion rotation';
          newItem = '\u27f3';
          break;
        case 'reverse-rotation':
          cssClass = 'attack-motion rotation';
          newItem = '\u27f2';
          break;
        case '720':
          modifiedData.splice(0, 1, 'rotation', 'rotation', 'or', 'reverse-rotation', 'reverse-rotation')
          return handleControllerMotions(modifiedData);

        case 'QCF':
          cssClass = 'attack-motion';
          newItem = '\u2b07 \u2b0a \u27a1';
          break;
        case 'QCB':
          cssClass = 'attack-motion';
          newItem = '\u2b07 \u2b0b \u2b05';
          break;
        case 'DPM':
          cssClass = 'attack-motion';
          newItem = '\u27a1 \u2b07 \u2b0a';
          break;
        case 'RDP':
          cssClass = 'attack-motion';
          newItem = '\u2b05 \u2b07 \u2b0b ';
          break;
        case 'HCB':
          cssClass = 'attack-motion';
          newItem = '\u27a1 \u2b0a \u2b07 \u2b0b \u2b05';
          break;
        case 'HCF':
          cssClass = 'attack-motion';
          newItem = '\u2b05 \u2b0b \u2b07 \u2b0a \u27a1';
          break;
        case 'Fwd':
          cssClass = 'attack-motion';
          newItem = '\u27a1';
          break;
        case 'Back':
          cssClass = 'attack-motion';
          newItem = '\u2b05';
          break;
        case 'Down':
          cssClass = 'attack-motion';
          newItem = '\u2b07';
          break;
        case 'Up':
          cssClass = 'attack-motion';
          newItem = '\u2b06';
          break;
        case 'Punch':
        case '2-Punches':
        case '3-Punches':
          cssClass = 'attack-type punches';
          break;
        case 'Kick':
        case '2-Kicks':
        case '3-Kicks':
          cssClass = 'attack-type kicks';
          break;
        case 'Jab':
          cssClass = 'attack-type jab light';
          break;
        case 'Strong':
          cssClass = 'attack-type strong medium';
          break;
        case 'Fierce':
          cssClass = 'attack-type fierce heavy';
          break;
        case 'Short':
          cssClass = 'attack-type short light';
          break;
        case 'Forward':
          cssClass = 'attack-type forward medium';
          break;
        case 'Roundhouse':
          cssClass = 'attack-type roundhouse heavy';
          break;
        case '(Mash)':
          cssClass = 'attack-criteria'
          break;
        case '(Hold)':
          cssClass = 'attack-criteria';
          break;
        case '(Air)':
          cssClass = 'attack-criteria';
          break;
        case '+':
          cssClass = 'plus-sign';
          break;
        case ',':
          cssClass = 'comma';
          break;
        default:
          cssClass = 'attack-motion';
          break;
      }
      newData.push(<div className={cssClass} key={uniqueKey.incrementKey()}>{newItem || item}</div>);
    }

    return newData;
  }

  const handleCancelsData = data => {
    let cancels = [];
    for (let cancel in data) {
      if (data[cancel]) {
        cancels.push(cancel);
      }
    }
    if (!cancels.length) {
      cancels.push('-'); //filler for empty space
    }

    return <div className='cancel-data'>{cancels.map(cancel => handleCheckCancelType(cancel))}</div>;
  }

  const handleCheckCancelType = cancel => {
    let type, text, toolTip = false;
    switch(cancel) {
      case '?':
        type = '?';
        text = 'question-mark-single';
        toolTip = 'ambiguous cancel';
        break;
      case '??':
        type = '??';
        text = 'question-mark-double';
        toolTip = 'ambiguous cancel';
        break;
      case 'Super Art':
        type = 'SA';
        toolTip = 'Super Art Cancellable';
        break;
      case 'Special':
        type = 'SP';
        toolTip = 'Special Move Cancellable';
        break;
      case 'Normal/Chain':
        type = 'NC';
        toolTip = 'Normal/Chain Cancellable';
        break;
      case 'Dash':
        type = 'DASH';
        toolTip = 'Dash Cancellable';
        break;
      case 'Superjump':
        type = 'SJ';
        toolTip = 'Super Jump Cancellable';
        break;
      case 'Self':
        type = 'SELF';
        toolTip = 'cancels with itself';
        break;
      default:
        type = '-';
        text = 'separator';
        break;
    }

    return (
      <div key={uniqueKey.incrementKey()} className={`${text || type} cancel`}>
        {type}
        { 
          toolTip && 
          <div className="tool-tip">
            <div className="tool-tip-info">{toolTip}</div>
            <div className='tool-tip-pointer' />
          </div>
        }
      </div>
    );
  }

  function handleClickHead(e, index) {
    handleToggleHeadActive(e);
    handleSortTable(index);
  }

  function handleToggleHeadActive(e) {
    document.querySelectorAll('th').forEach(head => head.classList.remove('active'));
    e.target.classList.add('active');
  }

  const handleDebouncedResize = handleDebounce(() => handleSetFontSize(), 100);

  function handleDebounce(func, wait, immediate) {
    let timeout;

    return () => {
      const context = this,
            args    = arguments;
      const later = () => {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (immediate && !timeout) {
        func.apply(context, args);
      }
    };
  };

    //sets font size according to screen pixel width to make things more responsive
  const handleSetFontSize = () => {
    const fontSize = window.innerWidth;
    document.querySelector('body').style.fontSize = `${fontSize * .01}px`;
    document.querySelector('.char-head').style.fontSize = `${fontSize * .025}px`;
  }

  function handleSortTable(headIndex) {
    let rows, i, counter = 0;
    let switching= true;
    let sortBy = 'greatest';
    while(switching) {
      let data1, data2;
      switching = false;
      rows = document.querySelectorAll('tr');
      rowLoop: for (i = 1; i < rows.length - 1; i++) {
        data1 = rows[i].querySelectorAll('td')[headIndex].textContent;
        data2 = rows[i + 1].querySelectorAll('td')[headIndex].textContent;
        switch(sortBy) {
          case 'greatest':
            if ((!Number(data1) || !Number(data2)) && data1.toLowerCase() < data2.toLowerCase()) {
              break rowLoop;
            }
            else if (Number(data1) < Number(data2)) {
              break rowLoop;
            }
            break;
          case 'least':
            if ((!Number(data1) || !Number(data2)) && data1.toLowerCase() > data2.toLowerCase()) {
              break rowLoop;
            }
            else if (Number(data1) > Number(data2)) {
              break rowLoop;
            }
            break;
          default:
        }
      }
      if (i < rows.length - 1) {
        counter++;
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
      else if (sortBy === 'greatest' && counter === 0) {
        sortBy = 'least';
        switching = true;
      }
    }
  }

  useEffect(() => {
    handleImportData();
    // handleSetFontSize();
    window.addEventListener('resize', handleDebouncedResize)
    // document.querySelector('.default').click(); //loads a table on component load.  Presently that's the Normals table.

    return () => {
      state.setDataTable(null)
      state.setCharInfo(null)
      window.removeEventListener('resize', handleDebouncedResize)
    }
  }, [char, state.currentCategory]);

  return (
    <div className='page'>
      <NavBar />
      <div className="char-head">
        <div className='char-name'>{state.charInfo && state.charInfo.name}</div>
      </div>
      {state.dataTable}
    </div>
  )
}