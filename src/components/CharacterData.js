import React from 'react'

export default function CharacterData(props) {
  const handleGoBack = () => props.setCurrentChar(null)
  return (
    <>
      <div
        style={{
          display: props.currentChar ? 'block' : 'none'
        }}
      >
        <button
          className="go-back"
          onClick={handleGoBack}
        >
        BACK
        </button>
        <h1>{props.currentChar}</h1>
      </div>
    </>
  )
}