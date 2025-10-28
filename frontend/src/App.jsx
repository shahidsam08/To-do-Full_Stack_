import { BrowserRouter } from "react-router"
import { Routes, Route } from "react-router"
import Login from "./pages/login/Login"
import Signup from "./pages/Signup/Signup"
import Dashboard from "./pages/dashboard/Dashboard"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
