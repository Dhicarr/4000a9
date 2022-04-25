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

const Login = ({ user, login, classes }) => {
  const history = useHistory();
  const imgsrc=require("./images/bubble.svg").default;
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
    <Grid container className={classes.screenWrapper}>
      <Box className={classes.sideImage} >
          <img src={imgsrc} className={classes.sideImage_img} alt="bubble"/>
          <Typography
            className={classes.sideImage_text}
          >
            Converse with anyone with any language
          </Typography>
      </Box>
      <Box className={classes.rightSideWrapper}>
        <Grid className={classes.topButtonWrapper}>
          <Typography className={classes.topButton_tip}>
            Don't have an account?
          </Typography>
          <Link href="/register" to="/register" className={classes.topButton_link}>
            <Button variant="text" className={classes.topButton_btn} style={{width: 'max(100px,calc(170vw/10))'}}>Create Account</Button>
          </Link>
        </Grid>
        <form onSubmit={handleLogin}>
          <Grid className={classes.formWrapper} style={{height: 'min(358px, 51vw)'}}>
            <Grid className={classes.form_headingWrapper}>
              <Typography className={classes.form_heading}>
                Welcome Back!
              </Typography>
            </Grid>
            <Grid>
              <FormControl margin="normal" required>
                <TextField
                  className={classes.form_textfield}
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  inputProps={{ classes:{root: classes.textboxLabels}}}
                  InputLabelProps={{ classes:{root: classes.textboxLabels}}}
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl margin="normal" required>
                <TextField
                  className={classes.form_textfield}
                  label="Password"
                  aria-label="password"
                  type="password"
                  inputProps={{ minLength:6, classes:{root: classes.textboxLabels}}}
                  InputLabelProps={{ classes:{root: classes.textboxLabels}}}
                  name="password"
                />
              </FormControl>
            </Grid>
            <Grid>
              <Button className={classes.form_submitBtn} type="submit">
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
