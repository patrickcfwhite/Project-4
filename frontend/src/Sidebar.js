import React from 'react'


const Sidebar = ({ isLoggedIn }) => {

  return (
    <aside className="menu">
      <p className="menu-label">
        General
      </p>
      <ul className="menu-list">
        <li><a>Login</a></li>
        <li><a>Register</a></li>
      </ul>
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
    </aside>
  )
}

export default Sidebar