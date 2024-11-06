import { Table } from 'react-bootstrap'

import Togglable from './Togglable'
import AddNew from './AddNew'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { initializeBlogs } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 3,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  return(
    <>
      <Togglable buttonLabel="create new blog">
        <AddNew />
      </Togglable>
      <Table striped>
        <tbody>
          {blogs.map((blog) =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>
                <em className='p-1 text-secondary'>posted by: </em> {blog.user.name}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

export default BlogList