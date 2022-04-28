import {React, useState, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Avatar } from '@material-ui/core';



const OtherUserBubble = ({ text, time, otherUser, images }) => {
  const [width, setWidth] = useState(null);
  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      margin:'1em'
    },
    avatar: {
      height: 30,
      width: 30,
      marginRight: 11,
      marginTop: 6,
    },
    usernameDate: {
      fontSize: 11,
      color: '#BECCE2',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    text: {
      fontSize: 14,
      color: '#FFFFFF',
      letterSpacing: -0.2,
      padding: 10,
      fontWeight: 'bold',
    },
    textImageWrapper:{
      display:'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      maxWidth: '960px'
    },
    bubble_single: {
      backgroundImage: 'linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)',
      borderRadius: '0 0 10px 10px',
      width:"fit-content",
      minWidth:'150px',
      marginTop:'-37px',
      zIndex:1
    },
    bubble_multiple: {
      backgroundImage: 'linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)',
      borderRadius: '0 10px 10px 10px',
      width:'fit-content',
      marginBottom: 6
    },
    bubble_noImage: {
      backgroundImage: 'linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)',
      borderRadius: '0 10px 10px 10px',
      width:'fit-content'
    },
    textImage_single:{
      minHeight:'112px',
      minWidth:'150px',
      width: width,
      height: width,
      maxWidth:'30vw',
      maxHeight:'30vw',
      borderRadius: '0 10px 10px 10px',
      zIndex:-1
    },
    textImage_multiple:{
      width:'100px',
      height:'70px',
      margin:6,
      borderRadius: '0 10px 10px 10px'
    },
    textImage_noText:{
      width:'150px',
      height:'150px',
      marginRight:6,
      borderRadius: '0 10px 10px 10px'
    }
  }));

  const classes = useStyles();
  const ref = useCallback(textfield => {
    if (textfield !== null){
        setWidth(textfield.getBoundingClientRect().width);
    }
  }, []);
  let imageClass=null;
  let textClass=null;

  if (images.length>1){
    if (text.length>0){
      imageClass=classes.textImage_multiple;
      textClass=classes.bubble_multiple;
    }
    else{
      imageClass=classes.textImage_noText;
    }
  }
  else if (images.length===1){
    if (text.length>0){
      imageClass=classes.textImage_single;
      textClass=classes.bubble_single;
    }
    else{
      imageClass=classes.textImage_noText;
    }
  }
  else {
    if (text.length>0){
      textClass=classes.bubble_noImage;
    }
  }

  return (
    <Box className={classes.root}>
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}
      />
      <Box>
        {!(text.length > 0 && imageClass===classes.textImage_multiple) &&
          <Typography className={classes.usernameDate}>
            {otherUser.username} {time}
          </Typography>
        }
        {text.length > 0 && imageClass===classes.textImage_multiple &&
          <Box className={textClass} ref={ref}>
            <Typography className={classes.text}>{text}</Typography>
          </Box>
        }
        <Box className={classes.textImageWrapper}>
          {images.map((images) => { 
            return <img key={images} alt="textImage" className={imageClass} src={[images]}/>}
          )}
        </Box>
        {text.length > 0 && imageClass!==classes.textImage_multiple &&
          <Box className={textClass} ref={ref}>
            <Typography className={classes.text}>{text}</Typography>
          </Box>
        }
        {text.length > 0 && imageClass===classes.textImage_multiple &&
          <Typography className={classes.usernameDate}>
            {otherUser.username} {time}
          </Typography>
        }
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
