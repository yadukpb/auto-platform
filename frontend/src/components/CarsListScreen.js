import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Grid, Paper, Slider, FormControl, FormGroup, FormControlLabel, Checkbox, Typography, Box, Card, CardMedia, CardContent, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Colors from './ui/Color'
import Loader from './Loader'
import Message from './Message'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    background: '#1a1a1a'
  },
  filterSection: {
    padding: '20px',
    backgroundColor: '#2a2a2a',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  carGrid: {
    padding: '20px'
  },
  carCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    backgroundColor: '#2a2a2a',
    '&:hover': {
      transform: 'scale(1.02)',
      cursor: 'pointer'
    }
  },
  carImage: {
    height: 200,
    objectFit: 'cover'
  },
  filterTitle: {
    color: Colors.white,
    borderBottom: `2px solid ${Colors.orange}`,
    paddingBottom: '10px',
    marginBottom: '20px'
  },
  priceRange: {
    marginTop: '20px',
    marginBottom: '20px',
    color: Colors.white
  }
}))

const CarsListScreen = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  
  const initialFilters = {
    priceRange: [0, 1000000],
    mileage: [0, 100],
    yearRange: [2000, 2024],
    kmRange: [0, 200000],
    ownership: [],
    brands: [],
    seatingCapacity: [],
    fuelType: [],
    transmission: []
  }

  const [filters, setFilters] = useState(initialFilters)

  const clearFilters = () => {
    setFilters(initialFilters)
    setFilteredProducts(allProducts)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get('/api/products')
        setAllProducts(data.products)
        setFilteredProducts(data.products)
        setLoading(false)
      } catch (err) {
        setError(err.response?.data?.message || err.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const applyFilters = () => {
      let filtered = allProducts.filter(car => {
        const matchesPrice = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
        const matchesMileage = car.mileage >= filters.mileage[0] && car.mileage <= filters.mileage[1]
        const matchesYear = car.modelYear >= filters.yearRange[0] && car.modelYear <= filters.yearRange[1]
        
        const matchesBrand = filters.brands.length === 0 || filters.brands.includes(car.brand)
        const matchesFuelType = filters.fuelType.length === 0 || filters.fuelType.includes(car.fuelType)
        const matchesTransmission = filters.transmission.length === 0 || filters.transmission.includes(car.transmissionType)
        const matchesSeats = filters.seatingCapacity.length === 0 || filters.seatingCapacity.includes(car.seats.toString())
        const matchesOwnership = filters.ownership.length === 0 || filters.ownership.includes(car.ownership === 1 ? '1st' : car.ownership === 2 ? '2nd' : '3rd+')

        return matchesPrice && matchesMileage && matchesYear && matchesBrand && 
               matchesFuelType && matchesTransmission && matchesSeats && matchesOwnership
      })

      setFilteredProducts(filtered)
    }

    if (allProducts.length > 0) {
      applyFilters()
    }
  }, [filters, allProducts])

  // Format functions defined at the top
  const formatPrice = (value) => `₹${value.toLocaleString()}`
  const formatKm = (value) => `${value.toLocaleString()} km`
  const formatYear = (value) => `${value}`

  // Your existing handler functions
  const handlePriceChange = (event, newValue) => {
    setFilters({ ...filters, priceRange: newValue })
  }

  const handleMileageChange = (event, newValue) => {
    setFilters({ ...filters, mileage: newValue })
  }

  const handleYearChange = (event, newValue) => {
    setFilters({ ...filters, yearRange: newValue })
  }

  const handleKmRangeChange = (event, newValue) => {
    setFilters({ ...filters, kmRange: newValue })
  }

  const handleOwnershipChange = (event) => {
    const ownershipValue = event.target.name
    const updatedOwnership = event.target.checked
      ? [...filters.ownership, ownershipValue]
      : filters.ownership.filter(item => item !== ownershipValue)
    setFilters({ ...filters, ownership: updatedOwnership })
  }

  const handleBrandChange = (event) => {
    const brandValue = event.target.name
    const updatedBrands = event.target.checked
      ? [...filters.brands, brandValue]
      : filters.brands.filter(item => item !== brandValue)
    setFilters({ ...filters, brands: updatedBrands })
  }

  const handleSeatingChange = (event) => {
    const seatValue = event.target.name
    const updatedSeats = event.target.checked
      ? [...filters.seatingCapacity, seatValue]
      : filters.seatingCapacity.filter(item => item !== seatValue)
    setFilters({ ...filters, seatingCapacity: updatedSeats })
  }

  const handleFuelTypeChange = (event) => {
    const fuelValue = event.target.name
    const updatedFuel = event.target.checked
      ? [...filters.fuelType, fuelValue]
      : filters.fuelType.filter(item => item !== fuelValue)
    setFilters({ ...filters, fuelType: updatedFuel })
  }

  const handleTransmissionChange = (event) => {
    const transValue = event.target.name
    const updatedTrans = event.target.checked
      ? [...filters.transmission, transValue]
      : filters.transmission.filter(item => item !== transValue)
    setFilters({ ...filters, transmission: updatedTrans })
  }

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} md={3}>
        <Paper className={classes.filterSection}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" className={classes.filterTitle}>
              Filters
            </Typography>
            <Button 
              variant="contained" 
              onClick={clearFilters}
              sx={{ 
                backgroundColor: Colors.orange,
                '&:hover': {
                  backgroundColor: Colors.darkerOrange
                }
              }}
            >
              Clear Filters
            </Button>
          </Box>

          {/* Price Range Slider */}
          <Box className={classes.priceRange}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={filters.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000000}
              step={50000}
              valueLabelFormat={formatPrice}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography>{formatPrice(filters.priceRange[0])}</Typography>
              <Typography>{formatPrice(filters.priceRange[1])}</Typography>
            </Box>
          </Box>

          {/* Mileage Slider */}
          <Box className={classes.priceRange}>
            <Typography gutterBottom>Mileage (km/l)</Typography>
            <Slider
              value={filters.mileage}
              onChange={handleMileageChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              step={5}
            />
          </Box>

          {/* Year Slider */}
          <Box className={classes.priceRange}>
            <Typography gutterBottom>Year</Typography>
            <Slider
              value={filters.yearRange}
              onChange={handleYearChange}
              valueLabelDisplay="auto"
              min={2000}
              max={2024}
              step={1}
              valueLabelFormat={formatYear}
            />
          </Box>

          {/* KM Driven Slider */}
          <Box className={classes.priceRange}>
            <Typography gutterBottom>Kilometers Driven</Typography>
            <Slider
              value={filters.kmRange}
              onChange={handleKmRangeChange}
              valueLabelDisplay="auto"
              min={0}
              max={200000}
              step={5000}
              valueLabelFormat={formatKm}
            />
          </Box>

          {/* Seating Capacity Filter */}
          <FormControl component="fieldset">
            <Typography gutterBottom style={{ marginTop: '20px' }}>Seating Capacity</Typography>
            <FormGroup>
              {['4', '5', '6', '7', '8+'].map((seats) => (
                <FormControlLabel
                  key={seats}
                  control={<Checkbox checked={filters.seatingCapacity.includes(seats)} onChange={handleSeatingChange} name={seats} />}
                  label={`${seats} Seater`}
                />
              ))}
            </FormGroup>
          </FormControl>

          {/* Ownership Filter */}
          <FormControl component="fieldset">
            <Typography gutterBottom style={{ marginTop: '20px' }}>Ownership</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={filters.ownership.includes('1st')} onChange={handleOwnershipChange} name="1st" />}
                label="1st Owner"
              />
              <FormControlLabel
                control={<Checkbox checked={filters.ownership.includes('2nd')} onChange={handleOwnershipChange} name="2nd" />}
                label="2nd Owner"
              />
              <FormControlLabel
                control={<Checkbox checked={filters.ownership.includes('3rd+')} onChange={handleOwnershipChange} name="3rd+" />}
                label="3rd Owner or more"
              />
            </FormGroup>
          </FormControl>

          {/* Fuel Type Filter */}
          <FormControl component="fieldset">
            <Typography gutterBottom style={{ marginTop: '20px' }}>Fuel Type</Typography>
            <FormGroup>
              {['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'].map((fuel) => (
                <FormControlLabel
                  key={fuel}
                  control={<Checkbox checked={filters.fuelType.includes(fuel)} onChange={handleFuelTypeChange} name={fuel} />}
                  label={fuel}
                />
              ))}
            </FormGroup>
          </FormControl>

          {/* Transmission Type Filter */}
          <FormControl component="fieldset">
            <Typography gutterBottom style={{ marginTop: '20px' }}>Transmission</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={filters.transmission.includes('Automatic')} onChange={handleTransmissionChange} name="Automatic" />}
                label="Automatic"
              />
              <FormControlLabel
                control={<Checkbox checked={filters.transmission.includes('Manual')} onChange={handleTransmissionChange} name="Manual" />}
                label="Manual"
              />
            </FormGroup>
          </FormControl>

          {/* Brands Filter */}
          <FormControl component="fieldset">
            <Typography gutterBottom style={{ marginTop: '20px' }}>Brands</Typography>
            <FormGroup>
              {['BMW', 'Mercedes', 'Audi', 'Tesla', 'Ferrari', 'Lamborghini'].map((brand) => (
                <FormControlLabel
                  key={brand}
                  control={<Checkbox checked={filters.brands.includes(brand)} onChange={handleBrandChange} name={brand} />}
                  label={brand}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Paper>
      </Grid>

      <Grid item xs={12} md={9}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : (
          <Grid container spacing={3} className={classes.carGrid}>
            {filteredProducts.map((car) => (
              <Grid item xs={12} sm={6} md={4} key={car._id}>
                <Card className={classes.carCard} onClick={() => navigate(`/product/${car._id}`)}>
                  <CardMedia
                    className={classes.carImage}
                    image={car.image}
                    title={car.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" sx={{ color: Colors.white, fontSize: '1.2rem', fontWeight: 'bold' }}>
                      {car.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: Colors.white }}>
                      {car.brand}
                    </Typography>
                    {car.modelYear && (
                      <Typography variant="body2" sx={{ color: Colors.white }}>
                        Year: {car.modelYear}
                      </Typography>
                    )}
                    {car.mileage && (
                      <Typography variant="body2" sx={{ color: Colors.white }}>
                        Mileage: {car.mileage} km/l
                      </Typography>
                    )}
                    {car.fuelType && (
                      <Typography variant="body2" sx={{ color: Colors.white }}>
                        Fuel: {car.fuelType}
                      </Typography>
                    )}
                    {car.transmissionType && (
                      <Typography variant="body2" sx={{ color: Colors.white }}>
                        Transmission: {car.transmissionType}
                      </Typography>
                    )}
                    <Typography variant="h6" sx={{ color: Colors.orange, marginTop: '10px' }}>
                      ₹{car.price?.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default CarsListScreen