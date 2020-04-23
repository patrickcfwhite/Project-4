import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import auth from './auth'


const Sidebar = ({ openModal, closeMenu, isModalOpen, menuOpen, savedScales, loadSaved }) => {
  const isLoggedIn = auth.isLoggedIn()
  if (!savedScales) return null
  return (
    !isModalOpen && menuOpen ?
      <OutsideClickHandler onOutsideClick={(event) => {
        closeMenu(event)
      }}>

        <aside className="menu">
          <button className='button close-button' onClick={
            closeMenu
          }>Close</button>
          {!isLoggedIn ?
            <div>
              <p className="menu-label">
                General
              </p>
              <ul className="menu-list">
                <li><a onClick={openModal}>Login / Register</a></li>
              </ul>
            </div>
            :
            <div>
              <p className="menu-label">
                Saved Scales
              </p>
              {savedScales.length === 0 ? <ul className="menu-list select is-multiple">
                <select multiple size="10">
                  <option className="option is-small">Your saved scales</option>
                  <option className="option is-small">will be stored here!</option>
                </select>
              </ul> :
                <ul className="menu-list select is-multiple">
                  <select multiple size="10">
                    {savedScales.map(scale => {
                      return scale.position !== 0 ? (<option onClick={loadSaved} id={`${scale.position} ${scale.key_number}`} value={scale.scale.intervals} className="option is-small">{scale.key} {scale.scale.name} Position: {scale.position}</option>) :
                        (<option onClick={loadSaved} id={`${scale.position} ${scale.key_number}`} value={scale.scale.intervals} className="option is-small">{scale.key} {scale.scale.name}</option>)
                    })}

                  </select>
                </ul>
              }
              <ul className="last-options menu-list">
                <li><a onClick={() => auth.logOut()}>Log out</a></li>
                <li><a>Delete Account</a></li>
              </ul>
            </div>
          }
        </aside>
      </OutsideClickHandler>
      :
      <aside className="menu">
        <button className='button close-button' onClick={
          closeMenu
        }>Close</button>
        {!isLoggedIn ?
          <div>
            <p className="menu-label">
              General
        </p>
            <ul className="menu-list">
              <li><a onClick={openModal}>Login / Register</a></li>
            </ul>
          </div>
          :
          <div>
            <p className="menu-label">
              Saved Scales
        </p>
            <ul className="menu-list select is-multiple">
              <select multiple size="10">
                {savedScales.map(scale => {
                  return <option onClick={loadSaved} id={`${scale.position} ${scale.key_number}`} value={scale.scale.intervals} className="option is-small">{scale.key} {scale.scale.name} Position: {scale.position}</option>
                })}

              </select>
            </ul>
            <ul className="last-options menu-list">
              <li><a onClick={() => auth.logOut()}>Log out</a></li>
              <li><a>Delete Account</a></li>
            </ul>
          </div>
        }
      </aside>
  )
}

export default Sidebar