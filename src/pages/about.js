import React from 'react'
// import './about.css'
import avatar from './aboutavatar.png'
import NavBar from '../components/navbar';

function About() {
  return (
    <>
    <NavBar/>
    <section>
    <div className='container'>
        <div className='wrapper'>
            <img src={avatar}></img>
            <div className='box'>
                <p>We help you find best scholarships</p>
            </div>
        </div>
    </div>
    </section>
    </>
  )
}

export default About