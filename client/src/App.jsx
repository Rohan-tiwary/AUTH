import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer} from 'react-toastify';
import Leaderboard from './pages/Leaderboard'
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Leaderboard' element={<Leaderboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<EmailVerify/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
    </div>
  )
}

export default App