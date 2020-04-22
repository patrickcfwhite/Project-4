import React from 'react'
import lib from './lib'
import MIDISounds from 'midi-sounds-react'
import axios from 'axios'

import Choice from './Choice'
import Positions from './Positions'
import Sidebar from './Sidebar'
import ScaleMelody from './ScaleMelody'
import Modal from './Modal'
import 'bulma'
import ScaleDisplay from './ScaleDisplay'



export class String extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      strings: { 'E': 40, 'A': 45, 'D': 50, 'G': 55, 'B': 59, 'e': 64 },
      stringArray: [40, 45, 50, 55, 59, 64],
      key: 0,
      keyLetter: 'C',
      scaleNotes: [],
      homeNotes: [],
      scaleIntervals: [2, 2, 1, 2, 2, 2, 1],
      activePosition: 'p0',
      previewPosition: 'p0',
      intervalAndNote: null,
      intervalPure: [],
      noteNotInterval: false,
      menuOpen: false,
      isModalOpen: false,
      modalLogin: true
    }
  }

  openMenu(event) {
    event.preventDefault()
    this.state.menuOpen === false ? this.setState({ menuOpen: true }) : null
  }

  closeMenu(event) {
    event.preventDefault()
    this.setState({ menuOpen: false })
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

  playScale(event) {
    event.preventDefault()
    this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 0, 274, [40], 0.5)
    this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 1, 274, [43], 0.5)
    this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 2, 274, [45], 0.5)
    this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 3, 274, [46], 0.5)
    this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 4, 274, [47], 0.5)
    this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.5 * 5, 274, [48], 3)
  }


  handleChange(event) {
    const { value } = event.target
    console.log(event.target.value)
    const update = value.length <= 2 ? lib.noteNumbers2[value] : lib.scaleChoices[value]
    console.log(update)
    !update[3] ? this.setState({ key: update, keyLetter: event.target.value }) : this.setState({ scaleIntervals: update })
  }

  handleSubmit(event) {
    event.preventDefault()
    // axios.get('')
    const scaleNotes = lib.scaleGenerator(this.state.key, this.state.scaleIntervals)
    const homeNotes = lib.homeNotesFinder(scaleNotes)
    const intvalandnote = lib.intervalAndNote(scaleNotes, this.state.keyLetter)
    console.log('intvalnote', intvalandnote)
    this.setState({ scaleNotes: scaleNotes, homeNotes: homeNotes, activePosition: 'p0', intervalAndNote: intvalandnote[0], intervalPure: intvalandnote[1] })
    this.render()
  }

  toggleFretDisplay(event) {
    event.preventDefault()
    this.setState({ noteNotInterval: !this.state.noteNotInterval })
  }

  handlePosition(event) {
    event.preventDefault()
    const { value } = event.target
    const eventType = event.type
    console.log(eventType, value)
    eventType !== 'click' ? this.setState({ previewPosition: value }) : value !== this.state.activePosition ? this.setState({ activePosition: value }) : this.setState({ activePosition: 'p0' })
  }

  handleMouseLeave() {
    this.setState({ previewPosition: 'p0' })
  }

  openModal(event) {
    event.preventDefault()
    const { isModalOpen } = this.state
    isModalOpen === true ? null : this.setState({ isModalOpen: !isModalOpen })
  }

  closeModal(event) {
    event.preventDefault()
    const { isModalOpen } = this.state
    isModalOpen === false ? null : this.setState({ isModalOpen: !isModalOpen, modalLogin: true })
  }

  toggleModalType(event) {
    event.preventDefault()
    const { modalLogin } = this.state
    const { value } = event.target
    if (modalLogin.toString() === value) return
    this.setState({ modalLogin: !modalLogin })
  }

  getFretInnerText(value, fret) {
    if (!this.state.intervalAndNote) return fret
    const { intervalAndNote, scaleNotes, noteNotInterval } = this.state
    const egg = value % 12
    const index = scaleNotes.indexOf(egg)
    // console.log(value, egg, index, scaleNotes)
    const correctPair = intervalAndNote[index]
    // console.log(correctPair)
    return !correctPair ? '' : noteNotInterval ? correctPair[0] : correctPair[1]
  }

  render() {
    if (!this.state.homeNotes) return null
    console.log('intervalpure', this.state.intervalPure, this.state.intervalAndNote)
    //console.log(this.state)
    return (
      <>
        <div className={!this.state.menuOpen ? 'canvas' : 'canvas show-menu'}>
          <Modal closeModal={(event) => this.closeModal(event)} isModalOpen={this.state.isModalOpen} toggleModalType={event => this.toggleModalType(event)} modalLogin={this.state.modalLogin} />
          <Sidebar closeMenu={(event) => this.closeMenu(event)} openModal={(event) => this.openModal(event)} isModalOpen={this.state.isModalOpen} menuOpen={this.state.menuOpen}/>
          <button className='button' onClick={(event) => {{!this.menuOpen ? this.openMenu(event) : this.closeMenu(event)}}}>Menu</button>
          <ScaleMelody scaleNotes={this.state.scaleNotes} midiSounds={this.midiSounds} />
          <Choice handleChange={(event) => this.handleChange(event)} handleSubmit={(event) => this.handleSubmit(event)} />
          <ScaleDisplay intervalAndNote={this.state.intervalAndNote} intervalPure={this.state.intervalPure}/>
          <Positions handleMouseLeave={() => this.handleMouseLeave()} handlePosition={(event) => this.handlePosition(event)} toggleFretDisplay={(event) => this.toggleFretDisplay(event)} noteNotInterval={this.state.noteNotInterval} />
          <div className='container stringcontainer'>
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
                    id={`f${fretNum}`}
                    value={value}
                    className={`fret ${classes}`}
                    onMouseDown={() => this.keyDown(value)}
                    onMouseUp={() => this.keyUp(value)}
                    onMouseOut={() => this.keyUp(value)}
                  // onClick={() => this.playTestInstrument(value)}
                  >{this.getFretInnerText(value, fretNum)}</div> :
                    <div
                      key={value}
                      id={`f${fretNum}`}
                      value={value}
                      className="fret"
                      onMouseDown={() => this.keyDown(value)}
                      onMouseUp={() => this.keyUp(value)}
                      onMouseOut={() => this.keyUp(value)}
                    // onClick={() => this.playTestInstrument(value)}
                    >{this.getFretInnerText(value)}</div>
                })}
              </div>
            })}
          </div >
            <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[274]} />
        </div>
      </>
    )
  }
}
