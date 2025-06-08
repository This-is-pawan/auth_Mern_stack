import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './page/Home'
import Login from './page/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Global } from './components/AppContextProvider'
const App = () => {
  
  
  return (
    <div>
      <ToastContainer position='top-right' 
       autoClose={2000}
    
      />
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
     </Routes>
    </div>
  )
}

export default App
