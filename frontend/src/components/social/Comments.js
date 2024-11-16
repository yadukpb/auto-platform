import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../actions/socialActions'
import CommentCard from './CommentCard'

const Comments = ({ postId, comments }) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createComment(postId, { content }))
    setContent('')
  }

  return (
    <div className='comments-section'>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3'>
          <Form.Control
            as='textarea'
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Write a comment...'
          />
        </Form.Group>
        <Button type='submit' variant='primary'>
          Comment
        </Button>
      </Form>
      <div className='comments-list mt-4'>
        {comments.map(comment => (
          <CommentCard key={comment._id} comment={comment} postId={postId} />
        ))}
      </div>
    </div>
  )
}

export default Comments