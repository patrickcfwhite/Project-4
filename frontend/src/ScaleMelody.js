import React from 'react'

const ScaleMelody = ({ scaleNotes, midiSounds }) => {


  function scaleMelodyBuilder(scale, guitar) {
    console.log(scale)
    const offset = scale[0] > 6 ? -12 : 0
    const adjScale = []
    console.log(scale)
    for (let i = 0; i < scale.length; i++) {
      if (scale[i] <= scale[0] && i !== 0) {
        adjScale.push(scale[i] + 60 + offset)
      } else {
        adjScale.push(scale[i] + 48 + offset)
      }
    }
    const rev = [...adjScale]
    rev.sort((a,b) => b - a)
    adjScale.push(rev.slice(1))
    console.log(adjScale)
    const mapArray = adjScale.flat(1)
    console.log(mapArray)
    const scaleArray = mapArray.flat(1).map((note, i) => {
      return i + 1 === mapArray.length ? [[], [[guitar, [note], 2 / 8, 1]]] : [[], [[guitar, [note], 1 / 8, 1]]]
    })
    console.log(scaleArray)
    return scaleArray
  }

  function startPlay() {
    const guitar = 274
    const data = scaleMelodyBuilder(scaleNotes, guitar)
    data.push([[],[]])
    midiSounds.startPlayLoop(data, 120, 1 / 8)
  }
  function stopAll() {
    midiSounds.stopPlayLoop()
  }


  return (
    <>
    <button className='button' onClick={() => startPlay()}>start scale</button>
    <button className='button' onClick={() => stopAll()}>stop scale</button>
    </>
  )
}


export default ScaleMelody