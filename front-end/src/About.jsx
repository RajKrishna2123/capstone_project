import React from 'react'
import Timeline from './components/Timeline'
import Authors from './components/Authors'
import Navbar from './components/Navbar'
import './styling.css'  
import Footer from './components/Footer'

function About() {
  return (
    <div className=' select-none font-lato text-white'>
      <Navbar/>
      <Authors/>
      <Timeline/>
      <Footer/>
    </div>
  )
}

export default About
