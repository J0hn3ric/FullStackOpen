import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const input = useField('Comment', 'text', 'comments-input')
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

  if(!blog) {
    return null
  }

  const showDeleteButton = () => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUser)
    return blog.user.username === user.username
  }

  const handleLike = async (event) => {
    event.preventDefault()
    dispatch(likeBlog({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }))
    dispatch(setNotification({
      message: `you voted ${blog.title}`,
      type:'success'
    }, 5))
  }

  const handleDelete = async (event) => {
    event.preventDefault()

    if (window.confirm(`Are you sure you wanna delete ${blog.title}??`)) {
      dispatch(deleteBlog(blog))
      dispatch(setNotification({
        message: `blog ${blog.title} deleted`,
        type: 'error'
      }, 5))
      navigate('/')
    }
  }

  const handleAddComment = (event) => {
    event.preventDefault()

    if(!input.input.value){
      dispatch(setNotification({
        message: 'a field is empty!!!',
        type: 'error'
      }, 5))
    } else {
      dispatch(addComment({
        id: id,
        comment: input.input.value
      }))
      input.submit()
      dispatch(setNotification({
        message: `you posted a comment ${input.input.value}!!!`,
        type: 'success'
      }, 5))
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p className="blogAllInfo">
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes {blog.likes} <button onClick={handleLike}>like</button> <br />
        {blog.user.username} <br />
        {showDeleteButton() ? (
          <button onClick={handleDelete}>delete</button>
        ) : (
          ''
        )}
      </p>
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          data-testid={input.testid}
          id={input.testid}
          {...input.input}
        />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Blog
