import { createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'

const initialState = []

const compare = (a, b) => {
  if (a.likes < b.likes) {
    return 1
  } else if (a.likes > b.likes) {
    return -1
  }

  return 0
}

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    incrementLikes(state, action) {
      const id = action.payload.id
      const blogToUpdate = state.find(blog => blog.id === id)
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }
      const newState = state.map(
        blog => blog.id === id
          ? updatedBlog
          : blog
      )
      newState.sort(compare)
      return newState
    },
    deleteOneBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    updateComments(state, action) {
      const id = action.payload.id
      const blogToUpdate = state.find(blog => blog.id === id)

      const updatedBlog = {
        ...blogToUpdate,
        comments: blogToUpdate.comments.concat(action.payload.comment)
      }
      const newState = state.map(
        blog => blog.id === id
          ? updatedBlog
          : blog
      )

      return newState
    }
  }
})

export const { setBlogs, appendBlog, incrementLikes, deleteOneBlog, updateComments } = blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const allBlogs = await blogs.getAll()
    allBlogs.sort(compare)
    dispatch(setBlogs(allBlogs))
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const createdBlog = await blogs.create(newBlog)
    dispatch(appendBlog(createdBlog))
  }
}

export const likeBlog = (blogToUpdate) => {
  return async dispatch => {
    const updatedBlog = await blogs.update(blogToUpdate)
    dispatch(incrementLikes(updatedBlog))
  }
}

export const deleteBlog = (blogToDelete) => {
  return async dispatch => {
    await blogs.del(blogToDelete)
    dispatch(deleteOneBlog(blogToDelete.id))
  }
}

export const addComment = (payload) => {
  return async dispatch => {
    const updatedBlog = await blogs.addComment(payload)
    console.log(updatedBlog)
    dispatch(updateComments(payload))
  }
}

export default blogsSlice.reducer