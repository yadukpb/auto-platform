import React, { useState, useEffect } from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import { Typography } from '@mui/material'
import Colors from '../components/Colors'
import LoginWithGoogle from '../components/LoginWithGoogle'
import DividerWithText from '../components/DividerWithText'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();

  const [errors, setErrors] = useState();
  const [formErrors, setFormErrors] = useState({}); //error

  let errorStatus = false;
  const [loginfailure, setloginfailure] = useState(false);

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    setloginfailure(false);
    e.preventDefault()
    let data = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      confirmPassword: confirmPassword
    };
    validate(data);
    if (!errorStatus) {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match')
      } else {
        dispatch(register(name, email, phone, password))
      }
    }
  }

  const validate = (data) => {
    const errors = {};
    const email_regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const phone_regex = /^[0-9]{10}$/;

    if (!data.name) {
      errors.name = "Name is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    }
    if (!data.phone) {
      errors.phone = "Phone number is required";
    } else if (!phone_regex.test(data.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Password does not match";
    }
    setFormErrors(errors);
    if (Object.entries(errors).length > 0) errorStatus = true;
    return errors;
  };

  return (
    <FormContainer>
      <Typography 
        variant="h4" 
        style={{ 
          marginBottom: "2em",
          textAlign: "center",
          color: Colors.white 
        }}
      >
        Sign Up
      </Typography>

      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Form.Group controlId='name' style={{ marginBottom: "1.5em" }}>
          <Form.Label style={{ color: Colors.white }}>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ 
              borderRadius: "25px",
              padding: "0.8em 1.2em"
            }}
          />
          {formErrors?.name && (
            <div style={{color:'red'}}>{formErrors.name}</div>
          )}
        </Form.Group>

        <Form.Group controlId='email' style={{ marginBottom: "1.5em" }}>
          <Form.Label style={{ color: Colors.white }}>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              borderRadius: "25px",
              padding: "0.8em 1.2em"
            }}
          />
          {formErrors?.email && (
            <div style={{color:'red'}}>{formErrors.email}</div>
          )}
        </Form.Group>

        <Form.Group controlId='phone' style={{ marginBottom: "1.5em" }}>
          <Form.Label style={{ color: Colors.white }}>Phone Number</Form.Label>
          <Form.Control
            type='tel'
            placeholder='Enter phone number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ 
              borderRadius: "25px",
              padding: "0.8em 1.2em"
            }}
          />
          {formErrors?.phone && (
            <div style={{color:'red'}}>{formErrors.phone}</div>
          )}
        </Form.Group>

        <Form.Group controlId='password' style={{ marginBottom: "1.5em" }}>
          <Form.Label style={{ color: Colors.white }}>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              borderRadius: "25px",
              padding: "0.8em 1.2em"
            }}
          />
          {formErrors?.password && (
            <div style={{color:'red'}}>{formErrors.password}</div>
          )}
        </Form.Group>

        <Form.Group controlId='confirmPassword' style={{ marginBottom: "1.5em" }}>
          <Form.Label style={{ color: Colors.white }}>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ 
              borderRadius: "25px",
              padding: "0.8em 1.2em"
            }}
          />
          {formErrors?.confirmPassword && (
            <div style={{color:'red'}}>{formErrors.confirmPassword}</div>
          )}
        </Form.Group>

        <Button 
          type='submit' 
          variant='primary' 
          style={{
            width: "100%",
            padding: "0.8em",
            backgroundColor: Colors.orange,
            border: "none",
            borderRadius: "25px",
            marginBottom: "2em"
          }}
        >
          Register
        </Button>
      </Form>

      <div style={{ textAlign: "center", maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2em" }}>
          <span style={{ color: Colors.SubWhite }}>
            Have an Account?{' '}
            <Link 
              style={{ color: Colors.SubWhite, textDecoration: "none", fontWeight: "bold" }}
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
            >
              Login
            </Link>
          </span>
        </div>

        <DividerWithText>OR</DividerWithText>

        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          marginTop: "2em" 
        }}>
          <LoginWithGoogle />
        </div>
      </div>
    </FormContainer>
  )
}

export default RegisterScreen