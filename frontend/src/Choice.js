import React, { useState, useEffect } from 'react'
import lib from './lib'
import axios from 'axios'

const Choice = ({ handleChange, handleSubmit }) => {
  const keyChoices = Object.keys(lib.noteNumbers2)
  const [scaleChoices, setScaleChoices] = useState([])

  useEffect(() => {
    axios.get('/api/fretbored/')
      .then((res) => {
        console.log(res)
        setScaleChoices(res.data)
      })
  }, [])

  // const scaleChoices = Object.keys(lib.scaleChoices)
  if (!scaleChoices) return null
  return (
    <form>
      <select className='select is-rounded' onChange={handleChange}>
        {keyChoices.map(choice => {
          return (
            <option key={choice} value={choice}>{choice}</option>
          )
        })}
      </select>
      <select className='select is-rounded' onChange={handleChange}>
        {scaleChoices.map((choice, id) => {
          return (
            <option key={id} value={choice.name}>{choice.name}</option>
          )
        })}
      </select>
      <button onClick={handleSubmit}>Generate Scale</button>
    </form>
  )
}

export default Choice