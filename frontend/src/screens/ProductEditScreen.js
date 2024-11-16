import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductsDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import Colors from "../components/Colors";
import { Typography } from "@mui/material";
import { ArrowBack, Upload, Description, Category, Inventory, AttachMoney, DriveEta, Collections } from '@mui/icons-material';
import { Container, Paper, IconButton } from '@mui/material';

const ProductEditScreen = () => {
  const params = useParams();
  const navigation = useNavigate();
  const productId = params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileObj] = useState([]);
  const [fileArray] = useState([]);
  const [mileage, setMileage] = useState(0);
  const [seats, setSeats] = useState(0);
  const [ownership, setOwnership] = useState(1);
  const [fuelType, setFuelType] = useState('');
  const [modelYear, setModelYear] = useState(new Date().getFullYear());
  const [transmissionType, setTransmissionType] = useState('');
  const [sellerName, setSellerName] = useState("");
  const [sellerContact, setSellerContact] = useState("");
  const [sellerLocation, setSellerLocation] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    // uploadMultiImageFileHandler()
    // console.log("hhhhhhhhhhhhhhhh",images)
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigation("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductsDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setImages(product.images);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
        setMileage(product.mileage);
        setSeats(product.seats);
        setOwnership(product.ownership);
        setFuelType(product.fuelType);
        setModelYear(product.modelYear);
        setTransmissionType(product.transmissionType);
        setSellerName(product.sellerName);
        setSellerContact(product.sellerContact);
        setSellerLocation(product.sellerLocation);
      }
    }
  }, [dispatch, navigation, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault()
    
    const productData = {
      _id: productId,
      name,
      price,
      image,
      images,
      brand,
      category,
      description,
      mileage,
      seats,
      ownership,
      fuelType: fuelType || 'Petrol',
      modelYear: modelYear || new Date().getFullYear(),
      transmissionType: transmissionType || 'Manual',
      sellerName,
      sellerContact,
      sellerLocation
    }
    
    console.log('Submitting product data:', productData)
    
    dispatch(updateProduct(productData))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      setUploading(true);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data.url);
      setUploading(false);
    } catch (error) {
      console.error('Upload error:', error);
      setUploading(false);
    }
  };

  const uploadMultipleFileHandler = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    
    try {
      const uploadPromises = files.map(file => {
        const formData = new FormData();
        formData.append('image', file);
        return axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      });

      const responses = await Promise.all(uploadPromises);
      const urls = responses.map(response => response.data.url);
      
      setImages(prevImages => {
        const currentImages = prevImages ? prevImages.split(',') : [];
        return [...currentImages, ...urls].join(',');
      });
      
      setUploading(false);
    } catch (error) {
      console.error('Upload error:', error);
      setUploading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Link
        to="/admin/productlist"
        className="btn"
        style={{
          backgroundColor: Colors.orange,
          color: Colors.white,
          fontWeight: "bold",
          borderRadius: "25px",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          marginBottom: "2em",
          textDecoration: "none",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <ArrowBack /> Go Back
      </Link>

      <Paper 
        elevation={3} 
        sx={{
          p: 4,
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Typography 
          variant="h4" 
          style={{ 
            marginBottom: "1.5em",
            textAlign: "center",
            color: Colors.orange,
            fontWeight: "bold"
          }}
        >
          Edit Product
        </Typography>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                <DriveEta sx={{ mr: 1, verticalAlign: "middle" }}/>
                Name
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px" }}
              />
            </Form.Group>

            <Form.Group controlId="price" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                <AttachMoney sx={{ mr: 1, verticalAlign: "middle" }}/>
                Price
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px" }}
              />
            </Form.Group>

            <Form.Group controlId="image" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                <Collections sx={{ mr: 1, verticalAlign: "middle" }}/>
                Main Image
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px", marginBottom: "10px" }}
              />
              <Form.Control
                type="file"
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
                style={{ borderRadius: "10px" }}
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="images" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                <Collections sx={{ mr: 1, verticalAlign: "middle" }}/>
                Additional Images
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter images url"
                value={images}
                onChange={(e) => setImages(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px", marginBottom: "10px" }}
              />
              <Form.Control
                type="file"
                multiple
                id="images-file"
                label="Choose Files"
                custom
                onChange={uploadMultipleFileHandler}
                style={{ borderRadius: "10px" }}
              />
            </Form.Group>

            <Form.Group controlId="brand" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                <DriveEta sx={{ mr: 1, verticalAlign: "middle" }}/>
                Brand
              </Form.Label>
              <Form.Control
                as="select"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px" }}
              >
                <option value="">Select Brand...</option>
                <option value="BMW">BMW</option>
                <option value="Ferrari">Ferrari</option>
                <option value="Tesla">Tesla</option>
                <option value="Lamborghini">Lamborghini</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Bugatti">Bugatti</option>
                <option value="Jaguar">Jaguar</option>
                <option value="Landrover">Landrover</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="category" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                <Category sx={{ mr: 1, verticalAlign: "middle" }}/>
                Category
              </Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px" }}
              >
                <option value="">Select Category...</option>
                <option value="Cars">Cars</option>
                <option value="Accessories">Accessories</option>
                
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="description" style={{ marginBottom: "2em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                <Description sx={{ mr: 1, verticalAlign: "middle" }}/>
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px" }}
              />
            </Form.Group>

            <Form.Group controlId="mileage" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                <DriveEta sx={{ mr: 1, verticalAlign: "middle" }}/>
                Mileage (km)
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter mileage"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px" }}
              />
            </Form.Group>

            <Form.Group controlId="seats" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                Number of Seats
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of seats"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px" }}
              />
            </Form.Group>

            <Form.Group controlId="ownership" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                Ownership Number
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ownership number"
                value={ownership}
                onChange={(e) => setOwnership(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px" }}
              />
            </Form.Group>

            <Form.Group controlId="fuelType" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                Fuel Type
              </Form.Label>
              <Form.Control
                as="select"
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px" }}
              >
                <option value="">Select Fuel Type...</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="CNG">CNG</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="modelYear" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                Model Year
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter model year"
                value={modelYear}
                onChange={(e) => setModelYear(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px" }}
              />
            </Form.Group>

            <Form.Group controlId="transmissionType" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                Transmission Type
              </Form.Label>
              <Form.Control
                as="select"
                value={transmissionType}
                onChange={(e) => setTransmissionType(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px" }}
              >
                <option value="">Select Transmission Type...</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="sellerName" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                Seller Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter seller name"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px" }}
              />
            </Form.Group>

            <Form.Group controlId="sellerContact" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                Seller Contact
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter seller contact number"
                value={sellerContact}
                onChange={(e) => setSellerContact(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px" }}
              />
            </Form.Group>

            <Form.Group controlId="sellerLocation" style={{ marginBottom: "1.5em" }}>
              <Form.Label style={{ color: Colors.orange, fontWeight: "500" }}>
                Seller Location
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter seller location"
                value={sellerLocation}
                onChange={(e) => setSellerLocation(e.target.value)}
                style={{ borderRadius: "10px", padding: "12px" }}
              />
            </Form.Group>

            <Button
              disabled={uploading}
              type="submit"
              variant="contained"
              style={{
                backgroundColor: Colors.orange,
                borderRadius: "25px",
                padding: "10px 30px",
                fontSize: "1.1em",
                fontWeight: "bold",
                width: "100%",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              Update Product
            </Button>
          </Form>
        )}
      </Paper>
    </Container>
  );
};

export default ProductEditScreen;
