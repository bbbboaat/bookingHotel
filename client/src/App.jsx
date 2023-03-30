import { useState } from 'react'
import Navbar  from './components/Navbar'
import Home from './components/Home'
import Booking from './components/Booking'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/Booking" element={<Booking/>}/>
    </Routes>
    </Router>
    </>
  )
}

export default App
