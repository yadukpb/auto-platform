import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Box, Container, Typography, Button, TextField, Card, CardContent, Avatar, IconButton, Divider, Paper, Menu, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import RepeatIcon from '@mui/icons-material/Repeat'
import VerifiedIcon from '@mui/icons-material/Verified'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import { getCommunityDetails, createPost } from '../../actions/socialActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import axios from 'axios'

const StyledCard = styled(Card)(({ theme }) => ({
  border: '1px solid rgba(0, 0, 0, 0.06)',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.2s ease-in-out',
  marginBottom: theme.spacing(2),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
  },
}))

const PostButton = styled(Button)({
  background: 'linear-gradient(45deg, #FF3366 30%, #FF6B6B 90%)',
  borderRadius: '28px',
  textTransform: 'none',
  padding: '10px 32px',
  fontWeight: '600',
  color: 'white',
  boxShadow: '0 3px 12px rgba(255, 51, 102, 0.3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF1F4F 30%, #FF5252 90%)',
  },
})

const PostInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF3366',
    },
  },
})

const HeaderContainer = styled(Paper)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(12px)',
  borderRadius: '0 0 24px 24px',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
}))

const HeaderCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  color: 'white',
  marginBottom: theme.spacing(3),
}))

const PostCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  marginBottom: theme.spacing(2),
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  '&:hover': {
    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
  },
}))

const CommunityDetailScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const communityDetails = useSelector((state) => state.communityDetails)
  const { loading, error, community } = communityDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const postCreate = useSelector((state) => state.postCreate)
  const { success: successPostCreate } = postCreate

  useEffect(() => {
    dispatch(getCommunityDetails(id))
    if (successPostCreate) {
      setContent('')
    }
  }, [dispatch, id, successPostCreate])

  const submitPostHandler = (e) => {
    e.preventDefault()
    dispatch(createPost({
      title: content.split('\n')[0],
      content: content,
      community: id
    }))
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteCommunity = async () => {
    if (window.confirm('Are you sure you want to delete this community?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        await axios.delete(`/api/communities/${id}`, config)
        navigate('/communities')
      } catch (error) {
        console.error('Error deleting community:', error)
      }
    }
    handleMenuClose()
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          <HeaderCard>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Box>
                <IconButton 
                  component={Link} 
                  to="/communities" 
                  sx={{ 
                    color: 'white', 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    mb: 2,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h3" fontWeight="800" sx={{ mb: 1 }}>
                  {community?.name}
                  <VerifiedIcon sx={{ ml: 2, fontSize: 32 }} />
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                  {community?.description || 'Welcome to our community'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                  <Typography variant="subtitle1">
                    {community?.memberCount || 0} Members
                  </Typography>
                  <Typography variant="subtitle1">
                    {community?.posts?.length || 0} Posts
                  </Typography>
                </Box>
              </Box>
              {userInfo?.isAdmin && (
                <Box>
                  <IconButton
                    onClick={handleMenuOpen}
                    sx={{
                      color: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        bgcolor: '#2d2d2d',
                        color: 'white',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        '& .MuiMenuItem-root': {
                          fontSize: '0.9rem',
                          py: 1.5,
                          px: 2,
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.1)'
                          }
                        }
                      }
                    }}
                  >
                    <MenuItem onClick={handleDeleteCommunity} sx={{ color: '#ff4d4d' }}>
                      <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
                      Delete Community
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Box>
          </HeaderCard>

          {userInfo && (
            <PostCard sx={{ mb: 4 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: 48, 
                      height: 48,
                      background: 'linear-gradient(45deg, #1a2a6c, #b21f1f)',
                    }}
                  >
                    {userInfo.name?.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <PostInput
                      fullWidth
                      placeholder="Share your thoughts with the community..."
                      multiline
                      rows={3}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      variant="outlined"
                      sx={{
                        backgroundColor: '#f8f9fa',
                        borderRadius: '12px',
                        mb: 2
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        onClick={submitPostHandler}
                        sx={{
                          background: 'linear-gradient(45deg, #1a2a6c, #b21f1f)',
                          borderRadius: '12px',
                          px: 4,
                          py: 1,
                          textTransform: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #152354, #961a1a)',
                          }
                        }}
                      >
                        Share Post
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </PostCard>
          )}

          {community?.posts?.length === 0 ? (
            <Box sx={{ 
              p: 6, 
              textAlign: 'center', 
              bgcolor: '#f8f9fa',
              borderRadius: '16px'
            }}>
              <Typography variant="h6" color="text.secondary">No posts yet</Typography>
              <Typography color="text.secondary">Be the first to share something!</Typography>
            </Box>
          ) : (
            community?.posts?.map((post) => (
              <PostCard key={post._id}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 48, 
                        height: 48,
                        background: 'linear-gradient(45deg, #1a2a6c, #b21f1f)',
                      }}
                    >
                      {post.user?.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {post.user?.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          @{post.user?.name.toLowerCase().replace(' ', '')}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          · {new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mb: 2,
                          color: 'text.primary',
                          fontSize: '1rem',
                          lineHeight: 1.5,
                          fontWeight: 400,
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word'
                        }}
                      >
                        {post.content}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 3,
                        mt: 2,
                        borderTop: '1px solid #eee',
                        pt: 2
                      }}>
                        <IconButton size="small" sx={{ 
                          color: 'text.secondary',
                          '&:hover': { color: '#1a2a6c' }
                        }}>
                          <ChatBubbleOutlineIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ 
                          color: 'text.secondary',
                          '&:hover': { color: '#b21f1f' }
                        }}>
                          <RepeatIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ 
                          color: 'text.secondary',
                          '&:hover': { color: '#fdbb2d' }
                        }}>
                          <FavoriteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </PostCard>
            ))
          )}
        </>
      )}
    </Container>
  )
}

export default CommunityDetailScreen