import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import Meta from "../components/Meta";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductBrand from "../components/ProductBrand";
import { Typography } from "@mui/material";
import { WISHLIST_ADD_ITEM_RESET } from "../constants/wishlistConstants";
import { useAlert } from "react-alert";
import Colors from "../components/Colors";
import { getWishlists } from "../actions/WishlistAction";

const HomeScreen = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const params = useParams();
  const keyword = params.keyword;

  const pageNumber = params.pageNumber || 1;

  const wishlistAddItem = useSelector((state) => state.wishlistAddItem);
  const {
    error: addError,
    success: addSuccess,
  } = wishlistAddItem;

  useEffect(() => {
    if (addSuccess) {
      alert.success("Product Added To Wishlist ");
      dispatch(getWishlists());
      dispatch({ type: WISHLIST_ADD_ITEM_RESET });
    } else if (addError) {
      alert.error(addError);
      dispatch({ type: WISHLIST_ADD_ITEM_RESET });
    }
  }, [addSuccess, alert, dispatch, addError]);
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => state.productList);
  const {  error, products } = productList;

  const videoRef = React.useRef(null);

  React.useEffect(() => {
    // Debug video loading
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video play error:", error);
      });
    }
  }, []);

  return (
    <div>
      <Meta />
      {!keyword && (
        <div style={{ position: 'relative' }}>
          <video
            autoPlay
            loop
            muted
            style={{
              width: '100%',
              height: '90vh',
              objectFit: 'cover',
              marginBottom: '2rem'
            }}
          >
            <source src="/carback.mp4" type="video/mp4" />
          </video>
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '20px 40px',
            borderRadius: '10px',
            textAlign: 'center',
            color: 'white',
            zIndex: 1,
            width: 'auto',
            minWidth: '300px'
          }}>
            <Typography 
              variant="h3" 
              style={{
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              We Help You To Find Your Dream Car
            </Typography>
          </div>
        </div>
      )}

      {!keyword ? (
        <>
          <Typography variant="h4">Latest Products</Typography>
        </>
      ) : (
        <>
          <Link
            to="/"
            className="btn btn-light"
            style={{
              backgroundColor: Colors.orange,
              color: Colors.white,
              fontWeight: "bold",
            }}
          >
            Go Back
          </Link>
          <Typography variant="h4" style={{ marginTop: "3em" }}>
            Search Results
          </Typography>
        </>
      )}

      <ToastContainer />

      {products.length === 0 ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.slice(0, 8).map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {products.length !== 0 ? (
            <></>
          ) : (
            <Typography
              variant="h5"
              style={{
                textTransform: "none",
                color: Colors.orange,
              }}
            >
              We couldn't find any matches
            </Typography>
          )}
        </>
      )}
      {!keyword ? <ProductBrand /> : null}
    </div>
  );
};

export default HomeScreen;
