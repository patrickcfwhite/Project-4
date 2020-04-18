import React from 'react'
import lib from './lib'

const Choice = ({ handleChange, handleSubmit }) => {
  const keyChoices = Object.keys(lib.noteNumbers2)
  const scaleChoices = Object.keys(lib.scaleChoices)
  return (
    <form>
      <select onChange={handleChange}>
        {keyChoices.map(choice => {
          return (
            <option key={choice} value={choice}>{choice}</option>
          )
        })}
      </select>
      <select onChange={handleChange}>
        {scaleChoices.map(choice => {
          return (
            <option key={choice} value={choice}>{choice}</option>
          )
        })}
      </select>
      <button onClick={handleSubmit}>Generate Scale</button>
    </form>
  )
}

export default Choice