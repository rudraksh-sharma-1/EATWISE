import React from 'react'
import Navbar from './Componenets/Navbar'
import Login from './Pages/Login'
import SignIn from './Pages/Signin'
import BlogHome from './Pages/BlogHome'
import Blog from './Pages/Blog'
import { Route, Routes } from 'react-router-dom'
import { MeteorDemo } from './Pages/Homepage'
import Footer from './Componenets/Footer'


function App() {

  return (
    <div>
      <Navbar/>

        <Routes>
          <Route path="/" element={<MeteorDemo/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bloghome" element={<BlogHome />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>

      <Footer/>

    </div>
  )
}

export default App
