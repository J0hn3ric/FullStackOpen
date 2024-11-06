import {
  Link,
  useParams
} from 'react-router-dom'

import { useSelector } from 'react-redux'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(user => user.id === id))
  console.log(user)

  if(!user) {
    return null
  }

  const blogsUser = user.blogs

  return(
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogsUser.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )

}

export default User