import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/navbar'

export default function Home() {
  return (
    <div><NavBar/>
        <Link to="/login">Login page</Link>
    </div>

  )
}
