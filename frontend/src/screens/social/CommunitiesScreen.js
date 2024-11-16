import React, { useEffect } from 'react'
import { Box, Container, Grid, Typography, Button, Card, CardContent, CardActionArea, Fab, Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { listCommunities } from '../../actions/socialActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import AddIcon from '@mui/icons-material/Add'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'

const CommunitiesScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const communityList = useSelector((state) => state.communityList)
  const { loading, error, communities } = communityList || { communities: [] }

  useEffect(() => {
    dispatch(listCommunities())
  }, [dispatch])

  const handleCommunityClick = (id) => {
    navigate(`/community/${id}`)
  }

  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              color: '#FFBA60',
              fontFamily: 'Poppins, sans-serif',
              mb: 2,
              letterSpacing: '0.5px'
            }}
          >
            Communities
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#868686',
              fontFamily: 'Inter, sans-serif',
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            Connect with fellow car enthusiasts, share your passion, and explore unique automotive communities. 
            Whether you're into classics, exotics, or custom builds - there's a place for everyone.
          </Typography>
          <Link to="/community/create" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: '#FFBA60',
                color: '#121212',
                '&:hover': { 
                  bgcolor: '#ffa726',
                  transform: 'scale(1.02)',
                  transition: 'all 0.2s ease-in-out'
                },
                borderRadius: 8,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(255, 186, 96, 0.2)'
              }}
            >
              Create Your Own Community
            </Button>
          </Link>
        </Box>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : (
          <Grid container spacing={4} sx={{ px: 2, py: 4 }}>
            {communities.map((community) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={community._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    bgcolor: 'rgba(45, 45, 45, 0.95)',
                    borderRadius: 4,
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(255, 186, 96, 0.3)'
                    }
                  }}
                >
                  <CardActionArea onClick={() => handleCommunityClick(community._id)}>
                    <Box sx={{ 
                      p: 4, 
                      bgcolor: 'rgba(54, 54, 54, 0.95)', 
                      borderBottom: '3px solid #FFBA60',
                      textAlign: 'center',
                      mb: 2
                    }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: '#FFBA60', 
                          color: '#121212', 
                          mb: 3.5,
                          width: 64,
                          height: 64,
                          margin: '0 auto'
                        }}
                      >
                        <PeopleAltIcon sx={{ fontSize: 36 }}/>
                      </Avatar>
                      <Typography 
                        variant="h5"
                        sx={{
                          color: '#FFFFFF',
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 600,
                          letterSpacing: '0.5px',
                          mb: 2.5
                        }}
                      >
                        {community.name}
                      </Typography>
                    </Box>
                    <CardContent sx={{ 
                      flexGrow: 1, 
                      p: 4,
                      pt: 2
                    }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#FFFFFF',
                          textAlign: 'center',
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          fontFamily: 'Inter, sans-serif',
                          mb: 2
                        }}
                      >
                        {community.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Fab
          aria-label="add"
          component={Link}
          to="/community/create"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: '#FFBA60',
            color: '#121212',
            '&:hover': { 
              bgcolor: '#ffa726',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease-in-out',
            width: 64,
            height: 64
          }}
        >
          <AddIcon sx={{ fontSize: 28 }}/>
        </Fab>
      </Container>
    </Box>
  )
}

export default CommunitiesScreen