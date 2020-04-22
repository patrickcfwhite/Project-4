import React from 'react'


const ScaleDisplay = ({ intervalAndNote, intervalPure }) => {

  function scalebox(notes, ints) {
    const noteCopy = [...notes]
    const scaleboxes = []
    for (let i = 0; i < 12; i++) {
      ints.some(x => x === i) ? scaleboxes.push(['intbox', noteCopy.shift()]) : scaleboxes.push('intbox')
    }
    return scaleboxes
  }
  if (intervalPure.length === 0) return null
  const scaleboxes = scalebox(intervalAndNote, intervalPure)
  // console.log(scaleboxes)
  return (
    <div className="container intcontainer">
      {scaleboxes.map(x => {
        return (x.length !== 2 ? <div className={x}></div> : <div className={`${x[0]} ${x[1][1]}`}>{`${x[1][0]}`}</div>)
        // return (x.length !== 2 ? <div>a</div> : <div>b</div>)
      })}
    </div>

  )
}

export default ScaleDisplay