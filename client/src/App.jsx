import { Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Home from './pages/Home'

// Uncomment this when testing locally and in development
// axios.defaults.baseURL = 'http://localhost:8000'

axios.defaults.baseURL = 'https://aquastock.onrender.com'
axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
