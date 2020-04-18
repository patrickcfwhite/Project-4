import React from 'react'
import lib from './lib'
import MIDISounds from 'midi-sounds-react'

import Choice from './Choice'
import Positions from './Positions'

export class String extends React.Component {
  constructor() {
    super()
    this.state = {
      strings: { 'E': 40, 'A': 45, 'D': 50, 'G': 55, 'B': 59, 'e': 64 },
      stringArray: [40, 45, 50, 55, 59, 64],
      key: null,
      scaleNotes: [],
      homeNotes: [],
      scaleIntervals: [],
      activePosition: 'p0',
      previewPosition: 'p0'
    }
  }

  playTestInstrument(note) {
    this.midiSounds.playChordNow(274, [note], 0.2)
  }

  keyDown(n, v) {
    this.keyUp(n)
    var volume = 1
    if (v) {
      volume = v
    }
    this.envelopes[n] = this.midiSounds.player.queueWaveTable(this.midiSounds.audioContext
      , this.midiSounds.equalizer.input
      , window[this.midiSounds.player.loader.instrumentInfo(274).variable]
      , 0, n, 9999, volume)
    this.setState(this.state)
  }
  keyUp(n) {
    if (this.envelopes) {
      if (this.envelopes[n]) {
        this.envelopes[n].cancel()
        this.envelopes[n] = null
        this.setState(this.state)
      }
    }
  }
  pressed(n) {
    if (this.envelopes) {
      if (this.envelopes[n]) {
        return true
      }
    }
    return false
  }

  componentDidMount() {
    this.envelopes = []
    this.midiSounds.setMasterVolume(0.8)
    this.midiSounds.setEchoLevel(0.02)
    
    
  }

  generateString(string) {
    return lib.keyChecker(this.state.key, this.state.scaleNotes, string, this.state.homeNotes, this.state.scaleIntervals, this.state.activePosition, this.state.previewPosition)
  }

  handleChange(event) {
    const { value } = event.target
    const update = value.length <= 2 ? lib.noteNumbers2[value] : lib.scaleChoices[value]
    console.log(update)
    !update[3] ? this.setState({ key: update }) : this.setState({ scaleIntervals: update })
  }

  handleSubmit(event) {
    console.log(this.state)
    event.preventDefault()
    const scaleNotes = lib.scaleGenerator(this.state.key, this.state.scaleIntervals)
    const homeNotes = lib.homeNotesFinder(scaleNotes)
    this.setState({ scaleNotes: scaleNotes, homeNotes: homeNotes })
    this.render()
  }

  handlePosition(event) {
    event.preventDefault()
    const { value } = event.target
    const eventType = event.type
    console.log(eventType, value)
    eventType !== 'click' ?  this.setState({ previewPosition: value }) : value !== this.state.activePosition ? this.setState({ activePosition: value }) : this.setState({ activePosition: 'p0' })
  }

  handleMouseLeave() {
    this.setState({ previewPosition: 'p0' })
  }

  render() {
    if (!this.state.homeNotes)
      return null
    //console.log(this.state)
    
    return (
      <>
      <Choice  handleChange={(event) => this.handleChange(event)} handleSubmit={(event) => this.handleSubmit(event)}/>
      <Positions handleMouseLeave={() => this.handleMouseLeave()} handlePosition={(event) => this.handlePosition(event)}/>
    <container className='stringcontainer'>
      {this.state.stringArray.map(string => {
        const fretboardArray = this.generateString(string)
        //console.log('fretboardArray', fretboardArray)
        return <div key={string} className="string">
          {fretboardArray.map(fret => {
            //console.log(fret)
            const value = fret.shift()
            const fretNum = fret.shift()
            const classes = fret.join(' ')
            //console.log(value, fretNum, classes)
            return classes ? <div
              key={value}
              value={value}
              className={`fret ${classes}`}
              onMouseDown={() => this.keyDown(value)}
              onMouseUp={() => this.keyUp(value)}
              onMouseOut={() => this.keyUp(value)}
            // onClick={() => this.playTestInstrument(value)}
            >{fretNum}</div> :
              <div
                key={value}
                value={value}
                className="fret"
                onMouseDown={() => this.keyDown(value)}
                onMouseUp={() => this.keyUp(value)}
                onMouseOut={() => this.keyUp(value)}
                // onClick={() => this.playTestInstrument(value)}
              >{fretNum}</div>
          })}
        </div>
      })}
      <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[274]} />
    </container >
    </>)
  }
}
