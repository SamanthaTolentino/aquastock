import { Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Home from './pages/Home'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Routes>
        <Route path='/aquastock/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
