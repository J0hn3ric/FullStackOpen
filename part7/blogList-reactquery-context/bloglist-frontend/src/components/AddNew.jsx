import { useState } from 'react'
import { setVisibility, useVisibilityDispatch } from '../context/toggleContext'
import { setNotification, useNotificationDispatch } from '../context/notificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../services/blogs'

const AddNew = () => {
  const notificationDispatch = useNotificationDispatch()
  const visibilityDispatch = useVisibilityDispatch()
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const compare = (a, b) => {
    if (a.likes < b.likes) {
      return 1
    } else if (a.likes > b.likes) {
      return -1
    }

    return 0
  }

  const newBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog).sort(compare))
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!title || !author || !url) {
      setNotification(notificationDispatch,
        {
          message: 'a field is blank, please compile it',
          type: 'error',
        }, 5)
    } else {
      newBlogMutation.mutate({
        author: author,
        title: title,
        url: url,
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setVisibility(visibilityDispatch)
      setNotification(notificationDispatch,
        {
          message: `a new blog ${title} added`,
          type: 'success',
        }, 5)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            data-testid="title-input"
            id="title-input"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            data-testid="author-input"
            id="author-input"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid="url-input"
            id="url-input"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default AddNew
