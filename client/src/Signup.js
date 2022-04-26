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

const Signup = ({ user, register, classes, sideImage}) => {

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
    <Grid className={classes.screenWrapper}>
      {sideImage}
      <Box className={classes.rightSideWrapper}>
        <Grid className={classes.topButtonWrapper}>
          <Typography className={classes.topButton_tip}>
            Already have an account?
          </Typography>
          <Link href="/login" to="/login" className={classes.topButton_link}>
            <Button variant="text" className={classes.topButton_btn_login}>Login</Button>
          </Link>
        </Grid>
        <form onSubmit={handleRegister}>
          <Grid className={classes.registerWrapper}>
            <Grid className={classes.form_headingWrapper}>
            <Typography className={classes.form_heading}>
                Create an account.
              </Typography>
            </Grid>
            <Grid>
              <FormControl>
                <TextField
                  className={classes.form_textfield}
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  inputProps={{ classes:{root: classes.textboxInput}}}
                  InputLabelProps={{ classes:{root: classes.textboxLabels}}}
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <TextField
                  className={classes.form_textfield}
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  inputProps={{ classes:{root: classes.textboxInput}}}
                  InputLabelProps={{ classes:{root: classes.textboxLabels}}}
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword}>
                <TextField
                  className={classes.form_textfield}
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength:6, classes:{root: classes.textboxInput}}}
                  InputLabelProps={{ classes:{root: classes.textboxLabels}}}
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
                  className={classes.form_textfield}
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength:6, classes:{root: classes.textboxInput}}}
                  InputLabelProps={{ classes:{root: classes.textboxLabels}}}
                  name="confirmPassword"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid>
              <Button className={classes.form_submitBtn} type="submit">
              Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

export default Signup;
