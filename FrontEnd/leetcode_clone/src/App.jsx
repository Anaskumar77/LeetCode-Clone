import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAuth } from './store/slices/userSlice'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ProblemSet from './pages/PoblemSet/ProblemSet'
import SolveProblem from './pages/SolveProblem/SolveProblem'
import './App.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/problems" element={<ProblemSet />} />
        <Route path="/problem/:id" element={<SolveProblem />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
