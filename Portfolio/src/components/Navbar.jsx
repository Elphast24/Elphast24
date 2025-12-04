import React, { useState } from 'react'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar">
        <div className="logo">
            <span>SAMUEL</span>
            <div className="h-line"></div>
        </div>
        
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
        </div>

        <nav>
            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                <li onClick={closeMenu}><a href="#home">Home</a></li>
                <li onClick={closeMenu}><a href="#about">About</a></li>
                <li onClick={closeMenu}><a href="#portfolio">Portfolio</a></li>
                <li onClick={closeMenu}><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar