import React from 'react'
import Navbar from './components/Navbar'
import TechStack from './components/TechStack'
import './styling.css'
import Reviews from './components/Reviews'
import ContactForm from './components/ContactForm'
import Blackhole from './components/Blackhole'
import Security from './components/Security'
import Footer from './components/Footer'
import BeforeAfter from './components/BeforeAfter'


function LandingPage() {
    return (
      <div className="parent select-none font-lato">
        <div className="child text-white">
          <Navbar />
          <Blackhole />
        </div>
        <div className="child flex justify-center items-center">
          <BeforeAfter />
        </div>
        <TechStack />
        <Security />
        <Reviews />

        <div className="child">
          <div className=''>
            <ContactForm />
            <Footer />
          </div>
        </div>
      </div>
    );
}

export default LandingPage
