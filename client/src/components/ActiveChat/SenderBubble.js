import {React, useState, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const SenderBubble = ({ time, text, images }) => {
  const [width, setWidth] = useState(null);
  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      margin:'1em'
    },
    date: {
      fontSize: 11,
      color: '#BECCE2',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    text: {
      fontSize: 14,
      color: '#91A3C0',
      letterSpacing: -0.2,
      padding: 10,
      fontWeight: 'bold',
    },
    textImageWrapper:{
      display:'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      maxWidth: '960px'
    },
    bubble_single: {
      background: '#F4F6FA',
      borderRadius: '0 0 0 10px',
      minWidth:'150px',
      width:"fit-content",
      textAlign:'right',
      marginTop:'-35px'
    },
    bubble_multiple: {
      background: '#F4F6FA',
      borderRadius: '10px 10px 0 10px',
      marginBottom: 6
    },
    bubble_noImage: {
      background: '#F4F6FA',
      borderRadius: '10px 10px 0 10px'
    },
    textImage_single:{
      minHeight:'112px',
      minWidth:'150px',
      width: width,
      height: width,
      maxWidth:'30vw',
      maxHeight:'30vw',
      borderRadius: '10px 10px 0 10px',
    },
    textImage_multiple:{
      width:'100px',
      height:'70px',
      margin:6,
      borderRadius: '10px 10px 0 10px'
    },
    textImage_noText:{
      width:'150px',
      height:'150px',
      marginLeft:6,
      borderRadius: '10px 10px 0 10px'
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
        {!(text.length > 0 && imageClass===classes.textImage_multiple) &&
          <Typography className={classes.date}>{time}</Typography>
        }
        {text.length > 0 && imageClass===classes.textImage_multiple &&
          <Box className={textClass} ref={ref}>
            <Typography className={classes.text}>{text}</Typography>
          </Box>
        }
        {images.length > 0 &&
          <Box className={classes.textImageWrapper}>
            {images.map((images) => { 
              return <img key={images} alt="textImage" className={imageClass} src={[images]}/>}
            )}
          </Box>
        }
        {text.length > 0 && imageClass!==classes.textImage_multiple &&
          <Box className={textClass} ref={ref}>
            <Typography className={classes.text}>{text}</Typography>
          </Box>
        }
        {text.length > 0 && imageClass===classes.textImage_multiple &&
          <Typography className={classes.date}>{time}</Typography>
        }
    </Box>
  );
};

export default SenderBubble;
