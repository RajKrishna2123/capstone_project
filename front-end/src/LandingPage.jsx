import React from 'react'
import Navbar from './components/Navbar'
import TechStack from './components/TechStack'
import './styling.css'
import Reviews from './components/Reviews'
import ContactForm from './components/ContactForm'

import Blackhole from './components/Blackhole'
import Security from './components/Security'
import Footer from './components/Footer'


function LandingPage() {
    return (
        <div className='parent select-none font-lato'>
            <div className='child text-white'>
                <Navbar/>
                <Blackhole/>
                
            </div>
            <TechStack />
            <Security />
            <Reviews />
            
            <div className='child'>
                <ContactForm />
                <div className='z-[-20]'>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default LandingPage
