import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../shared/Footer/Footer.jsx'
import Navbar from '../shared/Navbar/Navbar.jsx'

const Main = () => {
  return (
    <div>
        <Navbar></Navbar>
      <Outlet />
      <Footer></Footer>
    </div>
  )
}

export default Main
