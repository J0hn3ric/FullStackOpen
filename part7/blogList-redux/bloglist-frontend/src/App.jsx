import {
  BrowserRouter as Router,
  Routes, Route,
  Link
} from 'react-router-dom'

import Home from './components/Home'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Login from './components/Login'
import Head from './components/Head'
import { useSelector } from 'react-redux'

const App = () => {
  const user = useSelector(state => state.user)

  return (
    <div className='container'>
      <Router>
        {user
          ? <div>
            <Head />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/users' element={<Users />} />
              <Route path='/users/:id' element={<User />}/>
              <Route path='/blogs/:id' element={<Blog />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
          : <Login />
        }
      </Router>
    </div>
  )
}

export default App
