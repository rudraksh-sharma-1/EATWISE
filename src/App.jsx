import React from 'react'
import Navbar from './Componenets/Navbar'
import ShineBorderDemo from './Pages/Login'
import { Route, Routes } from 'react-router-dom'
import { MeteorDemo } from './Pages/Homepage'
import Footer from './Componenets/Footer'


function App() {

  return (
    <div>
      <Navbar/>

        <Routes>
          <Route path="/" element={<MeteorDemo/>} />
          <Route path="/Login" element={<ShineBorderDemo />} />
        </Routes>

      <Footer/>

    </div>
  )
}

export default App
