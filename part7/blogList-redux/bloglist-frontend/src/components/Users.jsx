import { Link } from 'react-router-dom'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { initializeUsers } from '../reducers/usersReducer'
import Login from './Login'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.user)

  useEffect(() => {
    if(user) {
      dispatch(initializeUsers())
    }
  }, [user])

  return(
    <div>
      {user
        ? <div>
          <h1>Users</h1>
          <table>
            <thead>
              <tr>
                <th />
                <th>blogs created</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        : <Login />
      }
    </div>
  )
}

export default Users