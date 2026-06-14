import Login    from './pages/Login/Login'
import Register from './pages/Register/Register'
import './App.css'

// Temporary routing — replace with react-router when ready
const page = window.location.pathname;

function App() {
  if (page === '/register') return <Register />;
  return <Login />;
}

export default App
