import React from 'react'
import lib from './lib'

const Positions = ({ handlePosition, handleMouseLeave, toggleFretDisplay, noteNotInterval }) => {
  const positions = { i: 'p1', ii: 'p2', iii: 'p3', iv: 'p4', v: 'p5', vi: 'p6', vii: 'p7' }
  const positionNumeral = Object.keys(positions)
  
  return (
    <>
    {positionNumeral.map(x => {
      return <button key={x} onMouseLeave={handleMouseLeave} onMouseEnter={handlePosition} onClick={handlePosition} value={positions[x]}>{x}</button>
    })}
    <button onClick={toggleFretDisplay}>{noteNotInterval ? '123' : 'abc'}</button>
    </>
  )
}

export default Positions