const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })

  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.title || !blog.url) {
    response.status(400).end()
  } else {
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    const newBlog = await Blog
      .findById(result._id)
      .populate('user', { username: 1, name: 1})
    response.status(201).json(newBlog)
  }
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const user = request.user

    if (!blog) {
      response.status(400).end()
    }

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    }
  }
)

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const blog = {
    ...body,
    likes: body.likes,
  }

  const findBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', { name: 1, username: 1 })
  response.status(200).json(findBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body.comment
  const blog =  await Blog.findById(request.params.id)

  const blogHelper= blog.toJSON()

  blogHelper.comments.push(comment) 

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogHelper, {
    new: true,
  }).populate('user', { name: 1, username: 1 })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
