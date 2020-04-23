import React, { useState, useEffect } from 'react'
import lib from './lib'
import auth from './auth'

const Choice = ({ handleChange, handleSubmit, handleSave, scales }) => {
  const keyChoices = Object.keys(lib.noteNumbersSearch)
  // const [scaleChoices, setScaleChoices] = useState([])

  // useEffect(() => {
  //   axios.get('/api/fretbored/')
  //     .then((res) => {
  //       console.log(res)
  //       setScaleChoices(res.data)
  //     })
  // }, [])

  // const scaleChoices = Object.keys(lib.scaleChoices)
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
            {scales.map((choice, id) => {
              return (
                <>
                  <option key={id} value={choice.name} disabled>{choice.name}</option>
                  {choice.scales.map((scale) => {
                    return (
                      <option key={scale.id} id={scale.id} value={scale.intervals}>{scale.name}</option>
                    )
                  })}
                </>
              )
            })}
          </select>
          <button className='button select-scale is-medium' onClick={handleSubmit}>Generate Scale</button>
          { auth.isLoggedIn() && <button className='button select-scale is-medium' onClick={handleSave}>Save</button>}
        </div>
      </form>
    </div>
  )
}

export default Choice