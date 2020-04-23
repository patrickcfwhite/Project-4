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
    <div className="container">
      <form className="scale-form">
        <div className="select-container">
          <select className='select is-medium is-rounded' onChange={handleChange}>
            {keyChoices.map(choice => {
              return (
                <option key={choice} value={choice}>{choice}</option>
              )
            })}
          </select>
          <select className='select is-medium is-rounded' onChange={handleChange}>
            {scaleChoices.map((choice, id) => {
              return (
                <>
                  <option key={id} value={choice.name} disabled>{choice.name}</option>
                  {choice.scales.map((scale) => {
                    return (
                      <option key={scale.id} value={scale.intervals}>{scale.name}</option>
                    )
                  })}
                </>
              )
            })}
          </select>
        <button className='button select-scale is-medium' onClick={handleSubmit}>Generate Scale</button>
        </div>
      </form>
    </div>
  )
}

export default Choice