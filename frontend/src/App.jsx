import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Details from './pages/Details'
import Match from './pages/Match'
import { LineupBuilder} from './pages/Lineup'
import { PredictionsPage } from './pages/Prediction'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/details" element={<Details/>}/>
        <Route path="/league" element={<Match/>}/>
        <Route path='/lineup' element={<LineupBuilder/>}/>
        <Route path='/prediction' element={<PredictionsPage/>}/>
      </Routes>
    </>
  )
}

export default App
