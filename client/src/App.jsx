import { useState } from 'react'
import Navbar  from './components/Navbar'
import Home from './components/Home'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Navbar />
    <Routes>
      <Routes exact path="/" element={<Home/>}/>
      <Routes exact path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </Router>
    </>
  )
}

export default App
