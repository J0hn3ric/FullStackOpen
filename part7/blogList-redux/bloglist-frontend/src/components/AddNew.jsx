import { useField } from '../hooks'
import { useDispatch } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'
import { toggleVisibility } from '../reducers/toggleVisibilityReducer'
import { Button, Col, Form, Row } from 'react-bootstrap'

const AddNew = () => {
  const dispatch = useDispatch()
  const title = useField('Title', 'text', 'title-input')
  const author = useField('Author', 'text', 'author-input')
  const url = useField('Url', 'text', 'url-input')

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(toggleVisibility())

    if (!title.input.value || !author.input.value || !url.input.value) {
      dispatch(setNotification({
        message: 'a field is blank, please compile it',
        type: 'error'
      }, 5))
    } else {
      dispatch(createBlog({
        author: author.input.value,
        title: title.input.value,
        url: url.input.value
      }))
      title.submit()
      author.submit()
      url.submit()
      dispatch(setNotification({
        message: `a new blog ${title.input.value} added`,
        type: 'success'
      }, 5))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className='mb-1' controlId={title.testid}>
          <Form.Label column sm='1'>Title:</Form.Label>
          <Col sm='5'>
            <Form.Control
              placeholder='Blog Title'
              {...title.input}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-1' controlId={author.testid}>
          <Form.Label column sm='1'>Author:</Form.Label>
          <Col sm='5'>
            <Form.Control
              placeholder='Blog Author'
              {...author.input}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-1' controlId={url.testid}>
          <Form.Label column sm='1'>URL:</Form.Label>
          <Col sm='5'>
            <Form.Control
              placeholder='Blog URL'
              {...url.input}
            />
          </Col>
        </Form.Group>
        <Button variant='success' size='sm' style={{ marginBottom: 1 }} id="create-button" type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

export default AddNew
