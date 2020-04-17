import React from 'react'
import ReactDOM from 'react-dom'

import './style.scss'
import { String } from './String'
import Choice from './Choice'

const App = () => {
  return (
    <>
    <Choice />
    <String />
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)


