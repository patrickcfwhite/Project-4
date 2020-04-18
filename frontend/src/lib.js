const noteNumbers = { 0: 'C', 1: ['C#', 'Db'], 2: 'D', 3: ['D#', 'Eb'], 4: 'E', 5: 'F', 6: ['F#', 'Gb'], 7: 'G', 8: ['G#', 'Ab'], 9: 'A', 10: ['A#', 'Bb'], 11: 'B' }

const noteNumbers2 = { 'C': 0, 'Dbb': 0, 'B#': 0, 'Db': 1, 'C#': 1, 'Bx': 1, 'D': 2, 'Ebb': 2, 'Cx': 2, 'Eb': 3, 'D#': 3, 'Fbb': 3, 'E': 4, 'Dx': 4, 'Fb': 4, 'F': 5, 'Gbb': 5, 'E#': 5, 'Gb': 6, 'F#': 6, 'Ex': 6, 'G': 7, 'Abb': 7, 'Fx': 7, 'Ab': 8, 'G#': 8, 'A': 9, 'Bbb': 9, 'Gx': 9, 'Bb': 10, 'A#': 10, 'Cbb': 10, 'B': 11, 'Ax': 11, 'Cb': 11 }

const scaleChoices = { 'Natural Major': [2, 2, 1, 2, 2, 2, 1], 'Natural Minor': [2, 1, 2, 2, 1, 2, 2], 'Harmonic Minor': [2, 1, 2, 2, 1, 3, 1], 'Melodic Minor': [2,1,2,2,2,2,1] }

const majorScale = [2, 2, 1, 2, 2, 2, 1]
const minorScale = [2, 1, 2, 2, 1, 2, 2]
const harMinor = [2, 1, 2, 2, 1, 3, 1]
const melMinor = [2,1,2,2,2,2,1]

function scaleGenerator(note, scale) {
  const starting = note
  //console.log(starting)
  const noteArray = [starting]
  // console.log(noteArray)
  for (let i = 0; i < scale.length; i++) {

    const add = scale[i] + noteArray[i]
    //console.log(note, add)
    noteArray.push(add % 12)
  }
  //console.log(noteArray)
  return noteArray
}



function homeNotesFinder(noteArray) {
  const map = noteArray.map(x => {
    while (x < 42) {
      x += 12
    }
    return x
  })

  const fretArray = map.map(x => x - 40)
  //console.log(fretArray)
  return fretArray
}

function fretCheck(note, fretNum, string, scaleNotes, scaleIntervals) {
  if (string === 40 && fretNum === note - 1) return false
  if (!scaleIntervals.some(x => x === 3)) {
    if (fretNum < note - 1) return false
    if (fretNum > note + 3) return false
    // if (string === 59 && fretNum === note - 1 && keyCheck(scaleNotes, fretNum + 54)) return false
    if (string === 59 && fretNum === note - 1) return false
  } else if (scaleIntervals.some(x => x === 3)) {
    if (fretNum < note - 1) return false
    if (fretNum > note + 3) return false
    // if (string === 55 && keyCheck(scaleNotes, fretNum + 52) && keyCheck(scaleNotes, fretNum + 51) && fretNum > note + 1) return false
    if (string === 59 && fretNum === note - 1 && keyCheck(scaleNotes, fretNum + 53)) return false
    

  }
  return true
}

function keyCheck(scale, fret) {
  // console.log(scale, fret)
  return (scale.some(x => x === (fret % 12)))
}


function positionChecker(fretboardArray, fretArray, notesArray, string, scaleNotes, scaleIntervals, statePositionActive, statePositionPreview) {
  for (const note of notesArray) {
    const fretNum = fretArray[1]
    if (fretCheck(note, fretNum, string, scaleNotes, scaleIntervals)) {
      const position = `p${notesArray.indexOf(note) + 1}`
      const active = `p${notesArray.indexOf(note) + 1}a`
      const preview = `p${notesArray.indexOf(note) + 1}p`
      const twoBefore = fretboardArray[fretboardArray.length - 4]
      //add class 'p${position}'
      //console.log(position)
      if (!twoBefore || (twoBefore.includes(position) && scaleIntervals.some(x => x === 3)) || !twoBefore.includes(position)) {
      //console.log(fretNum, twoBefore)
      statePositionActive === position ? fretArray.push(active) : statePositionPreview === position ? fretArray.push(preview) : preview
    }
    }
  }
  return fretArray
}


function keyChecker(key, scaleNotes, string, notesArray, scaleIntervals, position, preview) {
  const fretboardArray = []
  for (let i = 0; i < 22; i++) {
    const fretArray = []
    const fret = string + i
    //console.log(fret, scale)
    fretArray.push(fret, i)
    //console.log(scale)
    if (keyCheck(scaleNotes, fret)) {
      //add class 'key'
      fretArray.push('key')
      //console.log(`${i} is in the key of ${key}`)
      positionChecker(fretboardArray, fretArray, notesArray, string, scaleNotes, scaleIntervals, position, preview)
    }
    //console.log(fretArray)
    fretboardArray.push(fretArray)
  }
  //console.log(fretboardArray)
  return fretboardArray
}

// const scale = scaleGenerator('C', majorScale)

// const homenotes = homeNotesFinder(scale)

// //console.log(egg, bean)

// keyChecker('C', scale, 64, homenotes)
//positionCheck(7, bean)

// function threeNotePositionChecker(fretboardArray, fretArray, notesArray, string, scaleNotes, scaleIntervals) {
//   const offset = string === 40 ? 0 : string === 45 ? 1 : string ===  50 ? 2 : string === 55 ? 3 : string === 59 ? 4 : 5
//   for (const note of notesArray) {
//     const fretNum = fretArray[1]

//       const position = `p${notesArray.indexOf(note) + 1}`
//       const twoBefore = fretboardArray[fretboardArray.length - 4]
//       //add class 'p${position}'
//       //console.log(position)
//       // if (!twoBefore || (twoBefore.includes(position) && scaleIntervals.some(x => x === 3)) || !twoBefore.includes(position)) {
//         //console.log(fretNum, twoBefore)
//         fretArray.push(position)
//     // }
//   }
//   return fretArray
// }


export default { noteNumbers2, harMinor, melMinor, minorScale, majorScale, scaleChoices, scaleGenerator, homeNotesFinder, positionChecker, keyChecker }