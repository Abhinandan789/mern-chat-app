import {Routes, Route, Navigate} from 'react-router-dom';
//import './App.css'
import Home from './pages/home/Home';
import SignUp from './pages/signUp/SignUp';
import LogIn from './pages/login/Login';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {

  const {authUser} = useAuthContext();
  return (
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="login" element={authUser ? <Navigate to='/' /> : <LogIn />} />
          <Route path="/signup" element={authUser ? <Navigate to='/' /> : <SignUp />} />
        </Routes>
        <Toaster />
        <SpeedInsights />
      </div>

  )
}

export default App
