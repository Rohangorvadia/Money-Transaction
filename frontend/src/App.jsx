import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Signup } from "./pages/signup"
import { Signin } from "./pages/signin"
import { Dashboard } from "./pages/dashboard"
import { SendMoney } from "./pages/sendmoney"
import { HomePage } from "./pages/HomePage"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/send" element={<SendMoney />}></Route>
        </Routes> 
      </BrowserRouter>
    </>
  )
}

export default App
