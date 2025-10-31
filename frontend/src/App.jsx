import { BrowserRouter } from "react-router"
import { Routes, Route } from "react-router"
import Login from "./pages/login/Login"
import Signup from "./pages/Signup/Signup"
import Dashboard from "./pages/dashboard/Dashboard"
import Editnotes from "./pages/EditNotes/Editnotes"
import Profile from "./pages/profile/Profile"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editNotes" element={<Editnotes />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
