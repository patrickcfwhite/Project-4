import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import auth from './auth'


const Sidebar = ({ openModal, closeMenu, isModalOpen, menuOpen }) => {
  const isLoggedIn = auth.isLoggedIn()

  return (
    !isModalOpen && menuOpen ?
      <OutsideClickHandler onOutsideClick={(event) => {
        closeMenu(event)
      }}>
        <aside className="menu">
          {!isLoggedIn ?
            <>
              <p className="menu-label">
                General
            </p>
              <ul className="menu-list">
                <li><a onClick={openModal}>Login / Register</a></li>
              </ul>
            </>
            :
            <>
              <p className="menu-label">
                Saved Scales
            </p>
              <ul className="menu-list">

                <li><span><a>Members</a><a className="delete"></a></span></li>
                <li><div className="block">
                  <span className="tag is-success">
                    <button className="button is-small">Hello World</button>
                    <button className="delete is-small"></button>
                  </span>
                </div></li>
                <li><a>Add a member</a><a className="delete"></a></li>
              </ul>
              <ul className="menu-list">
                <li><a onClick={() => auth.logOut()}>Log out</a></li>
                <li><a>Delete Account</a></li>
              </ul>
            </>
          }
        </aside>
      </OutsideClickHandler>
      :
      <aside className="menu">
        {!isLoggedIn ?
          <>
            <p className="menu-label">
              General
            </p>
            <ul className="menu-list">
              <li><a onClick={openModal}>Login / Register</a></li>
            </ul>
          </>
          :
          <>
            <p className="menu-label">
              Saved Scales
            </p>
            <ul className="menu-list">

              <li><span><a>Members</a><a className="delete"></a></span></li>
              <li><div className="block">
                <span className="tag is-success">
                  <button className="button is-small">Hello World</button>
                  <button className="delete is-small"></button>
                </span>
              </div></li>
              <li><a>Add a member</a><a className="delete"></a></li>
            </ul>
            <ul className="menu-list">
              <li><a>Log out</a></li>
              <li><a>Delete Account</a></li>
            </ul>
          </>
        }
      </aside>
  )
}

export default Sidebar