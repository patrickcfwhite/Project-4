import React from 'react'
import lib from './lib'

const Choice = () => {
  const keyChoices = Object.keys(lib.noteNumbers2)
  const scaleChoices = Object.keys(lib.scaleChoices)
  return (
    <div>
      <select>
        {keyChoices.map(choice => {
          return (
            <option key={choice} value={lib.noteNumbers2[choice]}>{choice}</option>
          )
        })}
      </select>
      <select>
        {scaleChoices.map(choice => {
          return (
            <option key={choice} value={lib.scaleChoices[choice]}>{choice}</option>
          )
        })}
      </select>
    </div>
  )
}

export default Choice