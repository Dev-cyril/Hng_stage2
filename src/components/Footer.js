import React from 'react'
import facebook from '../assets/facebook.svg'
import instagram from '../assets/instagram.svg'
import twitter from '../assets/twitter.svg'
import youtube from '../assets/youtube.svg'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer>
        <div className='icons'>
            <img src={facebook} className='icon' alt="Facebook" />
            <img src={instagram} className='icon' alt="Instagram" />
            <img src={twitter} className='icon' alt="Twitter" />
            <img src={youtube} className='icon' alt="YouTube" />
        </div>
        <div className='links'>
            <a>Conditions of Use</a>
            <a>Privacy & Policy</a>
            <a>Press Room</a>
        </div>
    </footer>
  )
}
