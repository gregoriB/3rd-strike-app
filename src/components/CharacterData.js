import React, { Component } from 'react'

class CharacterData extends Component {

  handleGoBack = () => {
    this.props.switchChar(undefined)
  }

  render() {
    return (
      <>
        <div
          style={{
            display: this.props.currentChar ? 'block' : 'none'
          }}
        >
          <button
            className="go-back"
            onClick={this.handleGoBack}
          >
          BACK
          </button>
          <h1>{this.props.currentChar}</h1>
        </div>
      </>
    )
  }
}

export default CharacterData;
