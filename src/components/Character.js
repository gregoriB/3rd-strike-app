import React, { Component } from 'react'

class Character extends Component {

  handleSelectChar = () => {
    this.props.switchChar(this.props.charName)
  }

  componentDidUpdate () {
  }

  render() {
    return (
      <div 
        className='character'
        onClick={this.handleSelectChar}
      >
        {this.props.charName}
      </div>
    )
  }
}

export default Character;