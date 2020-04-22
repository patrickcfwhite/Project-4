const jwt = require('jsonwebtoken')
const secret = '+cf!n%1qjma1zp)x%wk$g@=n)a=7sbwu)#3iurd$^^bl_^$s)^'

function setToken(token) {
  localStorage.setItem('token', token)
}

function isLoggedIn() {

  if (!localStorage.token) return false
  const token = localStorage.token
  jwt.verify( token, secret, function(err, decoded) {
    if ( err ) {
      localStorage.removeItem( 'token' )
    }
  })
  return (localStorage.token)
}


function getToken() {
  return localStorage.getItem('token')
}

function logOut() {
  localStorage.removeItem('token')
}

function getUserId() {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  return JSON.parse(atob(parts[1])).sub
}

export default {
  setToken,
  getToken,
  isLoggedIn,
  logOut,
  getUserId
}