import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Switch, withRouter } from "react-router-dom";
import Signup from "./Signup.js";
import Login from "./Login.js";

import { SnackbarError, Home } from "./components";
import { SocketContext, socket } from "./context/socket";

import bgImage from "./images/bg-img.png";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  screenWrapper:{
    display:'flex',
    width: '100vw',
    height: '100vh',
    fontFamily: 'Open Sans',
    letterSpacing: 0,
    textAlign: 'center',
    fontStyle: 'normal'
  },
  sideImage:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    width: '41vw',
    height: '100vh',
    backgroundImage: `linear-gradient(rgba(58,141,255,0.85), rgba(134,185,255,0.85)),url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    [theme.breakpoints.down(600)]: {
      display: 'none'
    }
  },
  sideImage_text: {
    fontSize: "min(26px,calc(26vw/10))",
    width:"min(269px,calc(269vw/10))"
  },
  sideImage_img:{
    width:'min(160px,calc(67vw/10))',
    height:'min(160px,calc(67vw/10))',
    marginTop: '-60px',
    marginBottom: 'calc(35vw/10)'
  },
  rightSideWrapper:{
    display:'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topButtonWrapper:{
    display: 'flex',
    position: 'absolute',
    right: 'calc(35vw/10)',
    top: 'calc(25vw/10)',
    width: 'fit-content',
    height: 'max(54px,calc(54vw/10))',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topButton_tip:{
    lineHeight: '19px',
    color:'#B0B0B0',
    fontSize: 'max(14px,calc(14vw/10))'
  },
  topButton_link:{
    textDecoration: 'none'
  },
  topButton_btn:{
    height: 'max(50px,calc(54vw/10))',
    padding: '2em',
    marginLeft:'2em',
    background: '#FFFFFF',
    boxShadow: `0 calc(2vw / 10) calc(12vw / 10) rgba(74, 106, 149, 0.2)`,
    fontSize: 'max(14px,calc(14vw/10))',
    color: '#3A8DFF',
    textDecoration: 'none'
  },
  formWrapper:{
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'fit-content',
    margin: 'auto',
    marginBottom:'calc(172vw/70)'
  },
  form_headingWrapper:{
    alignSelf:'flex-start'
  },
  form_heading:{
    fontSize: 'clamp(23px,calc(26vw/10),32px)',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  form_textfield:{
    width: 'max(200px,calc(300vw/10))',
    height: 'max(50px,calc(45vw/10))',
    fontSize: 'max(16px,calc(12vw/10))'
  },
  form_submitBtn:{
    width: 'clamp(100px,calc(160vw/10),250px)',
    height: 'clamp(40px,calc(56vw/10),76px)',
    borderRadius: 'calc(3vw/10)',
    backgroundColor: "#3A8DFF",
    color: "white",
    fontSize: "max(14px,calc(16vw/10))",
    marginTop: "max(12px,calc(14vw/10))",
    '&:hover': {
      backgroundColor: "#076fff"
    }
  },
  textboxLabels:{
    fontSize: "max(16px,calc(14vw/10))"
  }
}));

const Routes = (props) => {
  const [user, setUser] = useState({
    isFetching: true,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const classes=useStyles();
  const login = async (credentials) => {
    try {
      const { data } = await axios.post("/auth/login", credentials);
      await localStorage.setItem("messenger-token", data.token);
      setUser(data);
      socket.emit("go-online", data.id);
    } catch (error) {
      console.error(error);
      setUser({ error: error.response.data.error || "Server Error" });
    }
  };

  const register = async (credentials) => {
    try {
      const { data } = await axios.post("/auth/register", credentials);
      await localStorage.setItem("messenger-token", data.token);
      setUser(data);
      socket.emit("go-online", data.id);
    } catch (error) {
      console.error(error);
      setUser({ error: error.response.data.error || "Server Error" });
    }
  };

  const logout = async (id) => {
    try {
      await axios.delete("/auth/logout");
      await localStorage.removeItem("messenger-token");
      setUser({});
      socket.emit("logout", id);
    } catch (error) {
      console.error(error);
    }
  };

  // Lifecycle

  useEffect(() => {
    const fetchUser = async () => {
      setUser((prev) => ({ ...prev, isFetching: true }));
      try {
        const { data } = await axios.get("/auth/user");
        setUser(data);
        if (data.id) {
          socket.emit("go-online", data.id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setUser((prev) => ({ ...prev, isFetching: false }));
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.error) {
      // check to make sure error is what we expect, in case we get an unexpected server error object
      if (typeof user.error === "string") {
        setErrorMessage(user.error);
      } else {
        setErrorMessage("Internal Server Error. Please try again");
      }
      setSnackBarOpen(true);
    }
  }, [user?.error]);

  if (user?.isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <SocketContext.Provider value={socket}>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Switch>
        <Route
          path="/login"
          render={() => <Login user={user} login={login} classes={classes}/>}
        />
        <Route
          path="/register"
          render={() => <Signup user={user} register={register} classes={classes}/>}
        />
        <Route
          exact
          path="/"
          render={(props) =>
            user?.id ? (
              <Home user={user} logout={logout} />
            ) : (
              <Signup user={user} register={register} classes={classes}/>
            )
          }
        />
        <Route
          path="/home"
          render={() => <Home user={user} logout={logout} />}
        />
      </Switch>
    </SocketContext.Provider>
  );
};

export default withRouter(Routes);
