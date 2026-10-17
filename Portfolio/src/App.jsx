import React from 'react'
import LoaderVideo from './components/LoaderVideo'
import Navbar from './components/Navbar'
import NeonKeysIntro from './components/NeonKeysIntro'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'
import './styles/Shared.css'

function App() {
  return (
    <>
      <LoaderVideo />
      <header>
        <Navbar />
      </header>
      <NeonKeysIntro />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}

export default App