import React, { useState } from 'react'

const ScaleMelody = ({ scaleNotes, midiSounds, homeNotes }) => {

  const [buttonState, setButtonState] = useState(0)


  // function scaleMelodyBuilder(scale, guitar) {
  //   console.log(scale)
  //   const offset = scale[0] > 6 ? -12 : 0
  //   const adjScale = []
  //   console.log(scale)
  //   for (let i = 0; i < scale.length; i++) {
  //     if (scale[i] <= scale[0] && i !== 0) {
  //       adjScale.push(scale[i] + 60 + offset)
  //     } else {
  //       adjScale.push(scale[i] + 48 + offset)
  //     }
  //   }
  //   const rev = [...adjScale]
  //   rev.sort((a,b) => b - a)
  //   adjScale.push(rev.slice(1))
  //   console.log(adjScale)
  //   const mapArray = adjScale.flat(1)
  //   console.log(mapArray)
  //   const scaleArray = mapArray.flat(1).map((note, i) => {
  //     return i + 1 === mapArray.length ? [[], [[guitar, [note], 2 / 8, 1]]] : [[], [[guitar, [note], 1 / 8, 1]]]
  //   })
  //   console.log(scaleArray)
  //   return scaleArray
  // }

  function scaleMelodyBuilder2(scale) {
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
    return mapArray
    // mapArray.flat(1).forEach((note, i) => {
    // for (let i = 0; i < mapArray.length; i++) {
    //   // i + 1 === mapArray.length ? midiSounds.playChordAt(midiSounds.contextTime() + 0 * (0.5 * (1 * i)), guitar, note, 0.5) : midiSounds.playChordAt(midiSounds.contextTime() + 0.5 * 0, guitar, note, 0.5)
    //   console.log(mapArray[i])
    //   console.log(midiSounds)
    //   midiSounds.playChordNow(guitar, 40, 0.5)
    // }
    // console.log(scaleArray)
    // return scaleArray
  }



  // this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 0, guitar, note, 0.5)
  // this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 0, guitar, note, 1)


  // function playScale(event) {
  //   event.preventDefault()
  //   midiSounds.playChordAt(midiSounds.contextTime() + 0.5 * 0, 274, [40], 0.5)
  //   midiSounds.playChordAt(midiSounds.contextTime() + 0.5 * 1, 274, [43], 0.5)
  //   midiSounds.playChordAt(midiSounds.contextTime() + 0.5 * 2, 274, [45], 0.5)
  //   midiSounds.playChordAt(midiSounds.contextTime() + 0.5 * 3, 274, [46], 0.5)
  //   midiSounds.playChordAt(midiSounds.contextTime() + 0.5 * 4, 274, [47], 0.5)
  //   midiSounds.playChordAt(midiSounds.contextTime() + 0.5 * 5, 274, [48], 3)
  // }

  function startPlay(event) {
    if (buttonState) return
    console.log(midiSounds)
    event.preventDefault()
    const guitar = 274
    const notes = scaleMelodyBuilder2(scaleNotes)
    console.log(notes)
    for (let i = 0; i < notes.length; i++) {
      i  + 1 === notes.length ? midiSounds.playChordAt(midiSounds.contextTime() + 0.26 * i, guitar, [notes[i]], 0.51).then(() => setButtonState(midiSounds.contextTime())) : midiSounds.playChordAt(midiSounds.contextTime() + 0.26 * i, guitar, [notes[i]], 0.26)  
    }
    // data.push([[],[]])
    // midiSounds.startPlayLoop(data, 120, 1 / 8)
  }
  function stopAll() {
    midiSounds.stopPlayLoop()
  }
  if (homeNotes.length === 0) return null
  return (
    <>
    <button className='button' onClick={(event) => !buttonState ? startPlay(event) : stopAll()}>Play</button>
    {/* <button className='button' onClick={() => stopAll()}>stop scale</button> */}
    </>
  )
}


export default ScaleMelody