import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/navbar'
import './home.css'
export default function Home() {
  return (
    <div id='bodybg'>
      <NavBar/>
      <div className='mainpagetext'>
          {/* <h1><b>COLLEGE SCHOLARSHIP PORTAL</b></h1>           */}
          <pre>
          “Education is the most powerful weapon you can use to change the world.” —B.B. King
          </pre>
      </div>
    </div>

  )
}
