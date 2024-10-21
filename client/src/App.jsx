
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
import PrivateRouter from './component/PrivateRouter'
import OnlyAdminPrivateRoute from './component/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'






function App() {
  
  return (
    <>
      <BrowserRouter>
       <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route element={<PrivateRouter/>}>
                 <Route path='/dashboard' element={<Dashboard/>}/>
            </Route>
            
            <Route element={<OnlyAdminPrivateRoute/>}>
                 <Route path='/create-post' element={<CreatePost/>}/>
                 <Route path='/update-post/:postId' element={<UpdatePost/>}/>

            </Route>
            <Route path='/projects' element={<Projects/>}/>
            <Route path='/post/:postSlug' element={<PostPage/>}/>


            <Route path='/sign-in' element={<Signin/>}/>
            <Route path='/sign-up' element={<Signup/>}/>



          </Routes>
          <FooterCom/>
      </BrowserRouter>
    </>
  )
}

export default App
