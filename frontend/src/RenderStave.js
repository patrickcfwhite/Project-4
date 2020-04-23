
import React, { Component } from 'react'
import ReactHTMLParser from 'react-html-parser'
import Vex from 'vexflow'
const { Stave, Renderer, Formatter, StaveNote, Accidental } = Vex.Flow

const Notes = ({ noteLetters }) => {
  
  function noteBuilder(notes) {
    const usenotes = [...notes]
    usenotes.length < 8 ? usenotes.push(usenotes[0]) : usenotes
    console.log('usenotes', usenotes)
    let octave = 4
    let prevNote
    const notesmap = usenotes.map((note, i) => {
      if (note[0] === 'C' && i !== 0 && note[0] !== prevNote[0]) {
        octave += 1
      }
      const accidentCheck = i !== 0 ? (prevNote[0] === note[0]) : false
      let add
      let suffix = note.slice(1)
      if (accidentCheck) {
        console.log(prevNote, note)
        if (!note[1]) {
          console.log('thisShouldBeTrue')
          suffix = 'n'
        }
      }

      // } else {
      //   suffix = 
      // }
      console.log(suffix)
      switch (suffix) {
        case 'b':
          add = 'b'
          break
        case 'bb':
          add = 'bb'
          break
        case '#':
          add = '#'
          break
        case 'x':
          add = '##'
          break
        case 'n':
          add = 'n'
          break
      }
      prevNote = note
      console.log(suffix)
      return suffix === '' ? new StaveNote({ keys: [`${note[0].toLowerCase()}/${octave}`], duration: '8' }) : new StaveNote({ keys: [`${note[0].toLowerCase()}/${octave}`], duration: '8' }).addAccidental(0, new Accidental(`${add}`))
    })
    console.log(notesmap)
    return notesmap
  }
  
  console.log('renderstave', noteLetters)
  if (noteLetters.length > 1) {
    const staveNotes = noteBuilder(noteLetters)

    const svgContainer = document.createElement('div')
    const renderer = new Renderer(svgContainer, Renderer.Backends.SVG)
    const ctx = renderer.getContext()
    const stave = new Stave(0, 0, 400)  // x, y, width
    stave.addClef('treble').setContext(ctx).draw()
    const bb = Formatter.FormatAndDraw(ctx, stave, staveNotes, { auto_beam: true, align_rests: true })


    const svg = svgContainer.childNodes[0]
    const padding = 10
    const half = padding / 2
    svg.style.top = -bb.y + half + Math.max(0, (100 - bb.h) * 2 / 3) + 'px'
    svg.style.height = Math.max(100, bb.h)
    svg.style.left = '0px'
    svg.style.width = 800 + 'px'
    svg.style.position = 'absolute'
    svg.style.overflow = 'visible'
    svgContainer.style.height = Math.max(100, bb.h + padding) + 'px'
    svgContainer.style.width = 500 + 'px'
    svgContainer.style.position = 'relative'
    svgContainer.style.display = 'inlineBlock'

    const svgSerializer = new XMLSerializer()
    const svgOutput = svgSerializer.serializeToString(svgContainer)
    return <div>{ReactHTMLParser(svgOutput)}</div>

  } else {
    return null
  }
}

export default Notes


// // .addAccidental(0, new VF.Accidental("##"))
// // .addAccidental(0, new VF.Accidental("#"))
// // .addAccidental(0, new VF.Accidental("b"))
// // .addAccidental(0, new VF.Accidental("bb"))



// export default class Notes extends Component {
//   constructor(props) {
//     super(props)
//     console.log(this)
//   }

//   render() {
//     return 
//     // style={{
//     //   border: '2px blue solid',
//     //   padding: 10,
//     //   borderRadius: 10,
//     //   display: 'inline-block',
//     //   width: '400px'
//     // }}>
//     // </div>
//   }

//   componentDidMount() {
//     console.log('noteletters', this.props.noteLetters)


//     this.refs.outer.appendChild(svgContainer)
//   }




// }


