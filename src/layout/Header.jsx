import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logoutUser } from '../Redux/Slice/user'

import './Header.scss'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className="header">
      <h2>Retrospective</h2>
      <img
        title="Logout"
        onClick={() => {
          dispatch(logoutUser())
          navigate('/Login')
        }}
        className="c-p"
        src={require('../assests/icon/logout.png')}
      />
    </div>
  )
}

export default Header
