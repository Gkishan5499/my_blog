
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Header from './component/Header'
import FooterCom from './component/Footer'






function App() {
  
  return (
    <>
      <BrowserRouter>
       <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/projects' element={<Projects/>}/>
            <Route path='/sign-in' element={<Signin/>}/>
            <Route path='/sign-up' element={<Signup/>}/>



          </Routes>
          <FooterCom/>
      </BrowserRouter>
    </>
  )
}

export default App
