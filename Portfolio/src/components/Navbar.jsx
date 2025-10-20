import React from 'react'
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="logo">
            <span>SAMUEL</span>
            <div className="h-line"></div>
        </div>
        <nav>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Portfolio</li>
                <li>Contact</li>
            </ul>
    </nav>
    </div>
  )
}

export default Navbar