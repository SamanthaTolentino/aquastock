import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Home from '../src/pages/Home'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Routes>
        <Route path='/fish-app/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
