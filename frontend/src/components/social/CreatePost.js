import React, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../actions/socialActions'

const CreatePost = ({ communityId }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createPost({
      title,
      content,
      community: communityId
    }))
    setTitle('')
    setContent('')
  }

  return (
    <Card className='mb-4'>
      <Card.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Post Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='What are your thoughts?'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Button type='submit' variant='primary'>
            Post
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default CreatePost