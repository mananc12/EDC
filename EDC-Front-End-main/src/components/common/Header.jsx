import React from 'react'
import '../../styles/header.css'

const Header = ({ props }) => {
  return (
    <>
      <div className="bgImg" key={props}>
        <div className="overlay">
          {' '}
          <h1>{props}</h1>{' '}
        </div>
      </div>
    </>
  )
}

export default Header
