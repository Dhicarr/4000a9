import {React, useState, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Avatar } from '@material-ui/core';



const OtherUserBubble = ({ text, time, otherUser, images, selector }) => {
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
    bubbleSingle: {
      backgroundImage: 'linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)',
      borderRadius: '0 0 10px 10px',
      width:"fit-content",
      minWidth:'150px',
      marginTop:'-37px',
      zIndex:1
    },
    bubbleMultiple: {
      backgroundImage: 'linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)',
      borderRadius: '0 10px 10px 10px',
      width:'fit-content',
      marginBottom: 6
    },
    bubbleNoImage: {
      backgroundImage: 'linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)',
      borderRadius: '0 10px 10px 10px',
      width:'fit-content'
    },
    textImageSingle:{
      minHeight:'112px',
      minWidth:'150px',
      width: width,
      height: width,
      maxWidth:'30vw',
      maxHeight:'30vw',
      borderRadius: '0 10px 10px 10px',
      zIndex:-1
    },
    textImageMultiple:{
      width:'100px',
      height:'70px',
      margin:6,
      borderRadius: '0 10px 10px 10px'
    },
    textImageNoText:{
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

  let select=selector(images, text, classes);
  let imageClass=select[0];
  let textClass=select[1];

  const TextBubble=()=>{
    return (
      <Box className={textClass} ref={ref}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}
      />
      <Box>
        {!(text.length > 0 && imageClass===classes.textImageMultiple) &&
          <Typography className={classes.usernameDate}>
            {otherUser.username} {time}
          </Typography>
        }
        {text.length > 0 && imageClass===classes.textImageMultiple &&
          <TextBubble/>
        }
        <Box className={classes.textImageWrapper}>
          {images.map((images) => { 
            return <img key={images} alt="textImage" className={imageClass} src={[images]}/>}
          )}
        </Box>
        {text.length > 0 && imageClass!==classes.textImageMultiple &&
          <TextBubble/>
        }
        {text.length > 0 && imageClass===classes.textImageMultiple &&
          <Typography className={classes.usernameDate}>
            {otherUser.username} {time}
          </Typography>
        }
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
