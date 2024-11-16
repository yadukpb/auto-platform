import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'
import { Box, TextField, Autocomplete, Button, Chip } from '@mui/material'

const CarCompareScreen = () => {
  const [cars, setCars] = useState([])
  const [selectedCar1, setSelectedCar1] = useState(null)
  const [selectedCar2, setSelectedCar2] = useState(null)
  const [filters, setFilters] = useState({
    mileage: '',
    seats: '',
    fuelType: '',
    transmission: ''
  })

  const [filteredCars, setFilteredCars] = useState([])

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await axios.get('/api/products')
      setCars(data)
      setFilteredCars(data)
    }
    fetchCars()
  }, [])

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value }
    setFilters(newFilters)

    const filtered = cars.filter(car => {
      return Object.keys(newFilters).every(key => {
        if (!newFilters[key]) return true
        return car[key]?.toString().toLowerCase().includes(newFilters[key].toLowerCase())
      })
    })
    setFilteredCars(filtered)
  }

  const compareFeatures = [
    'price',
    'mileage',
    'seats',
    'fuelType',
    'transmission',
    'engineCapacity',
    'year'
  ]

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <h2>Compare Cars</h2>
        <Row className="mb-4">
          <Col md={6}>
            <Autocomplete
              value={selectedCar1}
              onChange={(event, newValue) => setSelectedCar1(newValue)}
              options={filteredCars}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="Select First Car" />}
            />
          </Col>
          <Col md={6}>
            <Autocomplete
              value={selectedCar2}
              onChange={(event, newValue) => setSelectedCar2(newValue)}
              options={filteredCars}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="Select Second Car" />}
            />
          </Col>
        </Row>

        <Box sx={{ mb: 4 }}>
          <h4>Filters</h4>
          <Row>
            <Col md={3}>
              <TextField
                label="Mileage"
                value={filters.mileage}
                onChange={(e) => handleFilterChange('mileage', e.target.value)}
                fullWidth
              />
            </Col>
            <Col md={3}>
              <TextField
                label="Seats"
                value={filters.seats}
                onChange={(e) => handleFilterChange('seats', e.target.value)}
                fullWidth
              />
            </Col>
            <Col md={3}>
              <TextField
                label="Fuel Type"
                value={filters.fuelType}
                onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                fullWidth
              />
            </Col>
            <Col md={3}>
              <TextField
                label="Transmission"
                value={filters.transmission}
                onChange={(e) => handleFilterChange('transmission', e.target.value)}
                fullWidth
              />
            </Col>
          </Row>
        </Box>

        {selectedCar1 && selectedCar2 && (
          <Card>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <h5>Features</h5>
                  {compareFeatures.map(feature => (
                    <Box key={feature} sx={{ py: 2, borderBottom: '1px solid #eee' }}>
                      {feature.charAt(0).toUpperCase() + feature.slice(1)}
                    </Box>
                  ))}
                </Col>
                <Col md={4}>
                  <h5>{selectedCar1.name}</h5>
                  {compareFeatures.map(feature => (
                    <Box key={feature} sx={{ py: 2, borderBottom: '1px solid #eee' }}>
                      {selectedCar1[feature]}
                    </Box>
                  ))}
                </Col>
                <Col md={4}>
                  <h5>{selectedCar2.name}</h5>
                  {compareFeatures.map(feature => (
                    <Box key={feature} sx={{ py: 2, borderBottom: '1px solid #eee' }}>
                      {selectedCar2[feature]}
                    </Box>
                  ))}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </Box>
    </Container>
  )
}

export default CarCompareScreen