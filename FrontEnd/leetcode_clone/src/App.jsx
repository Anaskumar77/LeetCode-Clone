import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAuth } from './store/slices/userSlice'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ProblemSet from './pages/PoblemSet/ProblemSet'
import SolveProblem from './pages/SolveProblem/SolveProblem'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const { isInitialized, isLoggedIn } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  if (!isInitialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a0a', color: '#fff' }}>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/problems" replace /> : <Login />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/problems" replace /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/problems" replace /> : <Register />} />
        <Route path="/problems" element={isLoggedIn ? <ProblemSet /> : <Navigate to="/login" replace />} />
        <Route path="/problem/:id" element={isLoggedIn ? <SolveProblem /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
