import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { del, update } from '../services/blogs'
import PropTypes from 'prop-types'

import { setNotification, useNotificationDispatch } from '../context/notificationContext'

const Blog = ({ blog }) => {
  const notificationDispatch = useNotificationDispatch()
  const [fullView, setFullView] = useState(false)
  const queryClient = useQueryClient()

  const handleFullView = (event) => {
    event.preventDefault()

    setFullView(!fullView)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteBlogMutation = useMutation({
    mutationFn: del,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'],
        blogs.filter(oldBlog =>
          blog.id !== oldBlog.id
        ))
    }
  })

  const likeBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'],
        blogs.map(blog =>
          blog.id === updatedBlog.id
            ? updatedBlog
            : blog
        )
      )
    }
  })

  const showDeleteButton = () => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUser)
    return blog.user.username === user.username
  }

  const handleLike = (event) => {
    event.preventDefault()

    likeBlogMutation.mutate({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    })

    console.log(blog)
  }

  const handleDelete = (event) => {
    event.preventDefault()

    if (window.confirm(`Are you sure you wanna delete ${blog.title}??`)) {
      deleteBlogMutation.mutate({ ...blog })
      setNotification(notificationDispatch, {
        message: `deleted ${blog.title}`,
        type: 'error'
      }, 5)
    }
  }

  const notFullInfo = () => (
    <p>
      {blog.title} {blog.author} <button onClick={handleFullView}>view</button>
    </p>
  )

  const fullInfo = () => (
    <div>
      <p className="blogAllInfo">
        {blog.title} {blog.author}
        <button onClick={handleFullView}>hide</button> <br />
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
    </div>
  )

  return (
    <div style={blogStyle} className="blog">
      {fullView ? fullInfo() : notFullInfo()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
