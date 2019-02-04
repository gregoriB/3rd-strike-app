import React, { Component } from 'react';
import CharacterList from './CharacterList';
import CharacterData from '../components/CharacterData';
import '../App.css';

import store from '../store';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { switchChar } from '../actions/switchCharAction';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <CharacterList />
        </Provider>
        <CharacterData 
          switchChar={this.props.switchChar}
          currentChar={this.props.currentChar}
        />      
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    currentChar: state.switchChar.currentChar,
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    switchChar: (name) => dispatch(switchChar(name)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);