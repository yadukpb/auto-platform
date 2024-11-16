import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CommunityCard = ({ community }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/community/${community._id}`}>
        <Card.Body>
          <Card.Title as='h4'>{community.name}</Card.Title>
          <Card.Text>
            {community.description}
          </Card.Text>
          <Card.Text>
            <small className='text-muted'>
              {community.members.length} members · {community.posts.length} posts
            </small>
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  )
}

export default CommunityCard