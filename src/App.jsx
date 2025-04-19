import React from 'react'
import Navbar from './Componenets/Navbar'
import ShineBorderDemo from './Pages/Login'
import { Route, Routes } from 'react-router-dom'
import { MeteorDemo } from './Pages/Homepage'


function App() {

  return (
    <div>
      <Navbar/>

        <Routes>
          <Route path="/" element={<MeteorDemo/>} />
          <Route path="/Login" element={<ShineBorderDemo />} />
          
        </Routes>
      

    </div>
  )
}

export default App
