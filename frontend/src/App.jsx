import Loginpage from "./pages/login/Loginpage"
import { BrowserRouter } from "react-router"
import { Routes, Route } from "react-router"
import Register from "./pages/register/Register"
import Homepage from "./pages/home/Homepage"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/signUp_page" element={<Register />} />
          
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
