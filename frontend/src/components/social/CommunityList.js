import React, { useState } from 'react'
import { Box, Grid, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import ArticleIcon from '@mui/icons-material/Article'
import { Link, useNavigate } from 'react-router-dom'

const StyledCard = styled(Box)(({ theme }) => ({
  background: 'white',
  borderRadius: '16px',
  padding: theme.spacing(3),
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
    '&::before': {
      transform: 'translateX(0)',
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: 'linear-gradient(45deg, #1a2a6c, #b21f1f)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease'
  }
}))

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit'
})

const StatBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  color: '#666'
})

const CommunityList = ({ communities }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('userInfo')

  const handleCommunityClick = (e, communityId) => {
    e.preventDefault()
    if (!isLoggedIn) {
      setOpenDialog(true)
    } else {
      navigate(`/community/${communityId}`)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h3" 
        sx={{ 
          mb: 4, 
          fontWeight: 800,
          background: 'linear-gradient(45deg, #1a2a6c, #b21f1f)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Communities
      </Typography>
      <Grid container spacing={3}>
        {communities.map(community => (
          <Grid item xs={12} sm={6} md={4} key={community._id}>
            <StyledLink onClick={(e) => handleCommunityClick(e, community._id)}>
              <StyledCard>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                  {community.name}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3, 
                    color: '#666',
                    minHeight: '48px'
                  }}
                >
                  {community.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <StatBox>
                    <PeopleAltIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2">
                      {community.members.length} members
                    </Typography>
                  </StatBox>
                  <StatBox>
                    <ArticleIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2">
                      {community.posts.length} posts
                    </Typography>
                  </StatBox>
                </Box>
              </StyledCard>
            </StyledLink>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            minWidth: '320px'
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #1a2a6c, #b21f1f)',
          color: 'white',
          textAlign: 'center'
        }}>
          Join the Community
        </DialogTitle>
        <DialogContent sx={{ py: 3, px: 4 }}>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
            Sign in to join communities and chat with other members
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3, px: 4 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{
              background: 'linear-gradient(45deg, #1a2a6c, #b21f1f)',
              color: 'white',
              px: 4,
              '&:hover': {
                background: 'linear-gradient(45deg, #152252, #961a1a)'
              }
            }}
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenDialog(false)}
            sx={{ ml: 2 }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default CommunityList