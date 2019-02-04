import React, { Component } from 'react';
import Character from '../components/Character';

import { connect } from 'react-redux';
import { switchChar } from '../actions/switchCharAction';
import { mapChars } from '../actions/mapCharsAction';

class CharacterList extends Component {
  characters = ['Akuma', 'Yun', 'Ryu', 'Urien', 'Remy', 'Oro', 'Necro', 'Q', 'Dudley', 'Ibuki', 'Chun Li', 'Elena', 'Sean', 'Makoto', 'Hugo', 'Alex', 'Twelve', 'Ken', 'Yang'];
  
  handlePopularCharSelect = () => {
    if (this.props.currentChar) return;

    const chars = this.characters.map((name, index) => {
        return ( 
          <Character
            switchChar={this.props.switchChar}
            key={index}
            charName={name}
          />
        )
      });
    this.props.mapChars(chars)
  }

  componentDidMount() {
    this.handlePopularCharSelect();
  }
  
  componentDidUpdate() {

  }

  render() {
    return (
      <div className='flex-container'>
        {!this.props.currentChar && this.props.charList}
      </div>

    )
  }
}

const mapStateToProps = state => {
  return { 
    currentChar: state.switchChar.currentChar,
    charList: state.mapChars.charList
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    switchChar: (name) => dispatch(switchChar(name)),
    mapChars: (chars) => dispatch(mapChars(chars))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);