import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Select, MenuItem, Button, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Colors from '../components/ui/Color';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  videoBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    objectFit: 'cover'
  },
  container: {
    minHeight: '100vh',
    padding: '2rem',
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(34, 43, 69, 0.7)',
    backdropFilter: 'blur(10px)'
  },
  heading: {
    fontSize: '50px',
    color: Colors.white,
    textAlign: 'center',
    margin: '40px 0',
    padding: '20px',
    background: `linear-gradient(135deg, ${Colors.orange}, rgba(255,255,255,0.1))`,
    borderRadius: '20px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem'
  },
  selectionContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '3rem',
    flexWrap: 'wrap'
  },
  select: {
    minWidth: '300px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    '& .MuiSelect-select': {
      padding: '1rem',
      color: '#000000',
      fontWeight: 'bold'
    }
  },
  menuPaper: {
    backgroundColor: '#000000',
    color: '#ffffff',
    '& .MuiMenuItem-root': {
      color: '#ffffff',
      '&:hover': {
        backgroundColor: Colors.orange
      }
    }
  },
  compareButton: {
    backgroundColor: Colors.orange,
    color: Colors.white,
    padding: '1rem 3rem',
    fontSize: '1.2rem',
    borderRadius: '25px',
    marginTop: '2rem',
    '&:hover': {
      backgroundColor: Colors.white,
      color: Colors.orange
    }
  },
  comparisonContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '15px',
    padding: '2rem',
    backdropFilter: 'blur(10px)',
    marginTop: '2rem'
  },
  specRow: {
    padding: '1rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgba(255,255,255,0.05)'
    }
  },
  specLabel: {
    color: Colors.orange,
    fontWeight: 'bold'
  },
  specValue: {
    color: Colors.white
  }
}));

export default function CompareScreen() {
  const classes = useStyles();
  const [cars, setCars] = useState([]);
  const [selectedCar1, setSelectedCar1] = useState('');
  const [selectedCar2, setSelectedCar2] = useState('');
  const [comparisonData, setComparisonData] = useState(null);
  const videoRef = React.useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video play error:", error);
      });
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/api/cars');
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleCompare = () => {
    if (!selectedCar1 || !selectedCar2) {
      alert('Please select both cars to compare');
      return;
    }

    const car1 = cars.find(car => car._id === selectedCar1);
    const car2 = cars.find(car => car._id === selectedCar2);
    setComparisonData({ car1, car2 });
  };

  const specsList = [
    { key: 'price', label: 'Price' },
    { key: 'onRoadPrice', label: 'On Road Price' },
    { key: 'engine', label: 'Engine' },
    { key: 'engineType', label: 'Engine Type' },
    { key: 'displacement', label: 'Displacement' },
    { key: 'power', label: 'Power' },
    { key: 'fuelType', label: 'Fuel Type' },
    { key: 'mileage', label: 'Mileage' },
    { key: 'topSpeed', label: 'Top Speed' },
    { key: 'fuelTankCapacity', label: 'Fuel Tank Capacity' },
    { key: 'emissionNorm', label: 'Emission Norm' },
    { key: 'frontSuspension', label: 'Front Suspension' },
    { key: 'rearSuspension', label: 'Rear Suspension' },
    { key: 'steeringType', label: 'Steering Type' },
    { key: 'frontBrakeType', label: 'Front Brake Type' },
    { key: 'rearBrakeType', label: 'Rear Brake Type' },
    { key: 'tyreSize', label: 'Tyre Size' },
    { key: 'wheelSize', label: 'Wheel Size' }
  ];

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className={classes.videoBackground}
      >
        <source src="/carback.mp4" type="video/mp4" />
      </video>

      <Container className={classes.container}>
        <Typography variant="h1" className={classes.heading}>
          <CompareArrowsIcon fontSize="large" />
          Compare Cars
        </Typography>

        <div className={classes.selectionContainer}>
          <Select
            value={selectedCar1}
            onChange={(e) => setSelectedCar1(e.target.value)}
            className={classes.select}
            displayEmpty
            MenuProps={{ 
              classes: { paper: classes.menuPaper },
              PaperProps: {
                sx: { maxHeight: 300 }
              }
            }}
          >
            <MenuItem value="" disabled>Select First Car</MenuItem>
            {cars.map((car) => (
              <MenuItem key={car._id} value={car._id}>{car.name}</MenuItem>
            ))}
          </Select>

          <Select
            value={selectedCar2}
            onChange={(e) => setSelectedCar2(e.target.value)}
            className={classes.select}
            displayEmpty
            MenuProps={{ 
              classes: { paper: classes.menuPaper },
              PaperProps: {
                sx: { maxHeight: 300 }
              }
            }}
          >
            <MenuItem value="" disabled>Select Second Car</MenuItem>
            {cars.map((car) => (
              <MenuItem key={car._id} value={car._id}>{car.name}</MenuItem>
            ))}
          </Select>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button 
            className={classes.compareButton}
            onClick={handleCompare}
            startIcon={<CompareArrowsIcon />}
          >
            Compare Now
          </Button>
        </div>

        {comparisonData && (
          <Paper className={classes.comparisonContainer}>
            <Grid container spacing={3}>
              {specsList.map((spec) => (
                <Grid container item xs={12} className={classes.specRow} key={spec.key}>
                  <Grid item xs={4}>
                    <Typography className={classes.specLabel}>{spec.label}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.specValue}>
                      {comparisonData.car1[spec.key]}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.specValue}>
                      {comparisonData.car2[spec.key]}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
      </Container>
    </>
  );
}