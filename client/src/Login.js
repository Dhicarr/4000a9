import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';

const Login = ({ user, login }) => {
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const password = formElements.password.value;

    await login({ username, password });
  };

  useEffect(() => {
    if (user && user.id) history.push('/home');
  }, [user, history]);

  return (
    <Grid container className='screen-wrapper'>
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
        Need to register?
        </Typography>
        <Link href="/register" to="/register" style={{ textDecoration: 'none' }}>
          <Button variant="text" className='top-button' style={{fontSize: "max(16px,calc(14vw/10))"}}>Register</Button>
        </Link>
        </Grid>
        <form onSubmit={handleLogin}>
          <Grid className='login-wrapper'>
            <Grid style={{"alignSelf":"flex-start"}}>
                <Typography
                  className='form-text'
                  style={{
                    "fontSize": "max(20px,calc(20vw/10))",
                    "textAlign": "left",
                  }}
                  >Welcome Back!
                </Typography>
              </Grid>
              <Grid>
              <FormControl margin="normal" required>
                <TextField
                  className='form-textfield'
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  inputProps={{ style: {fontSize: "max(16px,calc(12vw/10))"} }}
                  InputLabelProps={{style: {fontSize: "max(16px,calc(12vw/10))"}}}
                />
              </FormControl>
            </Grid>
            <FormControl margin="normal" required>
              <TextField
                className='form-textfield'
                label="Password"
                aria-label="password"
                type="password"
                inputProps={{ minLength: 6, style: {fontSize: "max(16px,calc(12vw/10))"} }}
                InputLabelProps={{style: {fontSize: "max(16px,calc(12vw/10))"}}}
                name="password"
              />
            </FormControl>
            <Grid>
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
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

export default Login;
