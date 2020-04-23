import React, { useState } from 'react'
import lib from './lib'

const Positions = ({ handlePosition, handleMouseLeave, toggleFretDisplay, noteNotInterval, activePosition }) => {
  const positions = { i: 'p1', ii: 'p2', iii: 'p3', iv: 'p4', v: 'p5', vi: 'p6', vii: 'p7' }

  const positionNumeral = Object.keys(positions)

  function clicked(pos) {
    return (activePosition === `${pos}`)
  }
  
  return (
    <div className='container position-container'>
      {positionNumeral.map(x => {
        return <button className={clicked(positions[x]) ? 'button button-position-active is-rounded' : 'button button-position is-rounded'} key={x} onMouseLeave={handleMouseLeave} onMouseEnter={handlePosition} onClick={handlePosition} value={positions[x]}>{x}</button>
      })}
      <button id="inttoggle" className="button button-toggle is-rounded" onClick={toggleFretDisplay}>{noteNotInterval ? 'Intervals' : 'Notes'}</button>
    </div>
  )
}

export default Positions