import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from '@material-ui/core';

const Signup = ({ user, register }) => {

  const history = useHistory();

  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const email = formElements.email.value;
    const password = formElements.password.value;
    const confirmPassword = formElements.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: 'Passwords must match' });
      return;
    }
    await register({ username, email, password });
  };

  useEffect(() => {
    if (user && user.id) history.push('/home');
  }, [user, history]);

  return (
    <Grid className='screen-wrapper' container>
      <Box className='side-image' >
        <img src={require("./images/bubble.svg").default} alt="bubble"/>
        <Typography
          className='side-image-text'
          style={{
            "fontSize": "calc(16vw/10)",
            "width":"calc(200vw/10)"
          }}>
          Converse with anyone with any language
        </Typography>
      </Box>

      <Box className='right-side-wrapper'>
        <Grid className='top-button-wrapper'>
          <Typography
            className='top-tip'
            style={{
            "fontSize": "max(14px,calc(14vw/10))",
            }}
          >
            Already have an account?
          </Typography>
          <Link href="/login" to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="text" className='top-button' style={{fontSize: "max(16px,calc(14vw/10))"}}>Login</Button>
          </Link>
        </Grid>
        <form onSubmit={handleRegister}>
          <Grid className='register-wrapper'>
            <Grid style={{"alignSelf":"flex-start"}}>
              <Typography
                className='form-text'
                style={{
                  "fontSize": "max(20px,calc(20vw/10))",
                  "textAlign": "left",
                }}
                >Create an account.
              </Typography>
            </Grid>
            <Grid>
              <FormControl>
                <TextField
                  className='form-textfield'
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  inputProps={{ style: {fontSize: "max(16px,calc(12vw/10))"} }}
                  InputLabelProps={{style: {fontSize: "max(16px,calc(12vw/10))"}}}
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <TextField
                  className='form-textfield'
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  inputProps={{ style: {fontSize: "max(16px,calc(12vw/10))"} }}
                  InputLabelProps={{style: {fontSize: "max(16px,calc(12vw/10))"}}}
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  className='form-textfield'
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength:6, style: {fontSize: "max(16px,calc(12vw/10))"} }}
                  InputLabelProps={{style: {fontSize: "max(16px,calc(12vw/10))"}}}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  className='form-textfield'
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength:6, style: {fontSize: "max(16px,calc(12vw/10))"} }}
                  InputLabelProps={{style: {fontSize: "max(16px,calc(12vw/10))"}}}
                  name="confirmPassword"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Button
              className='form-submit-button'
              type="submit"
              style={{
                backgroundColor: "#3A8DFF",
                color: "white",
                fontSize: "max(16px,calc(14vw/10))",
                marginTop: "max(25px,calc(14vw/10))"
               }}
            >
            Create
            </Button>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

export default Signup;
