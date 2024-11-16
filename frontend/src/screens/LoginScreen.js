import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import LoginWithGoogle from "../components/LoginWithGoogle";
import "../StylesUI.css";
import DividerWithText from "../components/DividerWithText";
import { Grid } from "@mui/material";
import LoginWithFb from "../components/LoginWithFb";
import { Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import Colors from "../components/Colors";

const LoginScreen = () => {
  // const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("lg"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState();
  const [formErrors, setFormErrors] = useState({}); //error

  let errorStatus = false;
  const [loginfailure, setloginfailure] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    setloginfailure(false);

    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    validate(data);
    if (!errorStatus) {
      dispatch(login(email, password));
    }
  };

  const validate = (data) => {
    const errors = {};
    const email_regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if (!data.email) {
      errors.email = "Email is required";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    setFormErrors(errors);
    console.log(errors);
    // console.log(Object.entries(errors).length);
    if (Object.entries(errors).length > 0) errorStatus = true;
    console.log(errorStatus);
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
        Sign In
      </Typography>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Form.Group controlId="email" style={{ marginBottom: "1.5em" }}>
          <Form.Label style={{ color: Colors.white }}>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              borderRadius: "25px",
              padding: "0.8em 1.2em"
            }}
          />
          {formErrors?.email && (
            <div style={{ color: "red" }}>{formErrors.email}</div>
          )}
        </Form.Group>

        <Form.Group controlId="password" style={{ marginBottom: "1.5em" }}>
          <Form.Label style={{ color: Colors.white }}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              borderRadius: "25px",
              padding: "0.8em 1.2em"
            }}
          />
          {formErrors?.password && (
            <div style={{ color: "red" }}>{formErrors.password}</div>
          )}
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          style={{
            width: "100%",
            padding: "0.8em",
            backgroundColor: Colors.orange,
            border: "none",
            borderRadius: "25px",
            marginBottom: "2em"
          }}
        >
          Sign In
        </Button>
      </Form>

      <div style={{ textAlign: "center", maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "1em" }}>
          <Link
            style={{ color: Colors.SubWhite, textDecoration: "none" }}
            to={redirect ? `/reset-password?redirect=${redirect}` : "/reset-password"}
          >
            Forgot password?
          </Link>
        </div>
        
        <div style={{ marginBottom: "2em" }}>
          <span style={{ color: Colors.SubWhite }}>
            New Customer?{" "}
            <Link
              style={{ color: Colors.SubWhite, textDecoration: "none", fontWeight: "bold" }}
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
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
  );
};

export default LoginScreen;
