import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import axios from 'axios'
import auth from './auth'

const Modal = ({ closeModal, isModalOpen, toggleModalType, modalLogin }) => {

  const [credentials, setCredentials] = useState({ email: '', username: '', password: '', password_confirmation: '' })

  function handleChange(event) {
    const { name, value } = event.target
    const data = { ...credentials, [name]: value }
    setCredentials(data)
  }

  function handleLogin(event) {
    event.preventDefault()
    axios.post('/api/login/', credentials)
      .then(res => {
        const token = res.data.token
        auth.setToken(token)
        location.reload()
      })
      .catch(error => console.log(error))
  }

  function handleRegister(event) {
    event.preventDefault()
    const e = event
    axios.post('/api/register/', credentials)
      .then(() => handleLogin(e))
      .catch(error => console.log(error))
  }

  return (
    <div className={isModalOpen ? 'modal is-active' : 'modal'}>
      <div className="modal-background"></div>
      <div className="modal-content">
        {isModalOpen ?
          <OutsideClickHandler onOutsideClick={(event) => {
            closeModal(event)
          }}>
            <div className='field modal-buttonsis-grouped'>
            <button className='modal-button button' value={true} onClick={toggleModalType}>Login</button>
            <button className='modal-button button'value={false} onClick={toggleModalType}>Register</button>
            <button className='modal-button button' onClick={closeModal}>Close</button>
            </div>
            {modalLogin ?
              <>
                <h2>Login</h2>
                <div className="field">
                  <p className="control">
                    <input onChange={event => handleChange(event)} className="input" name="email" type="email" placeholder="Email" />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <input onChange={event => handleChange(event)} className="input" name='password' type="password" placeholder="Password" />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button onClick={event => handleLogin(event)} className="button is-success">
                      Login
                    </button>
                  </p>
                </div>
              </>
              :
              <>
                <h2>Register</h2>
                <div className="field">
                  <p className="control">
                    <input onChange={event => handleChange(event)} className="input" name='email' type="email" placeholder="Email" />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <input onChange={event => handleChange(event)} className="input" name='username' type="email" placeholder="Username" />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <input onChange={event => handleChange(event)} className="input" name='password' type="password" placeholder="Password" />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <input onChange={event => handleChange(event)} className="input" name='password_confirmation' type="password" placeholder="Password Confirmation" />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button onClick={event => handleRegister(event)} className="button is-success">
                      Register
                    </button>
                  </p>
                </div>
              </>
            }
          </OutsideClickHandler>
          : <div></div>
        }
      </div>
    </div>

  )
}


export default Modal