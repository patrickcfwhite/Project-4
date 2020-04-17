import React from 'react'
import lib from './lib'
import MIDISounds from 'midi-sounds-react'

export class String extends React.Component {
  constructor() {
    super()
    this.state = {
      strings: { 'E': 40, 'A': 45, 'D': 50, 'G': 55, 'B': 59, 'e': 64 },
      stringArray: [40, 45, 50, 55, 59, 64],
      key: 'A',
      scale: [],
      homeNotes: []
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
    const scale = lib.scaleGenerator(this.state.key, lib.majorScale)
    const homeNotes = lib.homeNotesFinder(scale)
    this.setState({ scale: scale, homeNotes: homeNotes })
  }
  generateString(string) {
    return lib.keyChecker(this.state.key, this.state.scale, string, this.state.homeNotes, lib.majorScale)
  }
  render() {
    if (!this.state.homeNotes)
      return null
    //console.log(this.state)
    return (<container className='stringcontainer'>
      {this.state.stringArray.map(string => {
        const fretboardArray = this.generateString(string)
        console.log('fretboardArray', fretboardArray)
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
    </container >)
  }
}
