import Togglable from './Togglable'
import AddNew from './AddNew'
import Blog from './Blog'

import { ToggleProvider } from '../context/toggleContext'
import { useQuery } from '@tanstack/react-query'

import { getAll } from '../services/blogs'

const BlogList = () => {
  const compare = (a, b) => {
    if (a.likes < b.likes) {
      return 1
    } else if (a.likes > b.likes) {
      return -1
    }

    return 0
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    refetchOnWindowFocus: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const unsortedBlogs = result.data
  const blogs = unsortedBlogs.sort(compare)

  return(
    <>
      <ToggleProvider>
        <Togglable buttonLabel="create new blog">
          <AddNew />
        </Togglable>
      </ToggleProvider>
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </>
  )
}

export default BlogList