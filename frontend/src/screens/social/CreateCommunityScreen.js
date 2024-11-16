import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Button, TextField, Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { createCommunity } from '../../actions/socialActions'
import Message from '../../components/Message'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import GroupAddIcon from '@mui/icons-material/GroupAdd'

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 186, 96, 0.4)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFBA60',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#868686',
  },
  '& .MuiOutlinedInput-input': {
    color: '#FFFFFF',
  },
})

const CreateCommunityScreen = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [userInfo, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createCommunity({ name, description }))
    navigate('/communities')
  }

  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Card sx={{
          bgcolor: 'rgba(45, 45, 45, 0.95)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
        }}>
          <Box sx={{
            background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
            p: 4,
          }}>
            <Button
              component={Link}
              to="/communities"
              startIcon={<ArrowBackIcon />}
              sx={{
                color: 'white',
                mb: 3,
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              Back to Communities
            </Button>
            <Typography
              variant="h3"
              sx={{
                color: 'white',
                fontWeight: 800,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              Create Community
              <GroupAddIcon sx={{ fontSize: 40 }} />
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 400,
                maxWidth: '600px',
              }}
            >
              Start a new automotive community and connect with enthusiasts who share your passion
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={submitHandler} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <StyledTextField
                label="Community Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                variant="outlined"
                placeholder="Enter a unique name for your community"
              />

              <StyledTextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="Describe what your community is about"
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#FFBA60',
                  color: '#121212',
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  alignSelf: 'flex-end',
                  '&:hover': {
                    bgcolor: '#ffa726',
                    transform: 'scale(1.02)',
                    boxShadow: '0 6px 20px rgba(255, 186, 96, 0.3)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Create Community
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default CreateCommunityScreen