import {React, useState, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const SenderBubble = ({ time, text, images, selector }) => {
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
    bubbleSingle: {
      background: '#F4F6FA',
      borderRadius: '0 0 0 10px',
      minWidth:'150px',
      width:"fit-content",
      textAlign:'right',
      marginTop:'-35px'
    },
    bubbleMultiple: {
      background: '#F4F6FA',
      borderRadius: '10px 10px 0 10px',
      marginBottom: 6
    },
    bubbleNoImage: {
      background: '#F4F6FA',
      borderRadius: '10px 10px 0 10px'
    },
    textImageSingle:{
      minHeight:'112px',
      minWidth:'150px',
      width: width,
      height: width,
      maxWidth:'30vw',
      maxHeight:'30vw',
      borderRadius: '10px 10px 0 10px',
    },
    textImageMultiple:{
      width:'100px',
      height:'70px',
      margin:6,
      borderRadius: '10px 10px 0 10px'
    },
    textImageNoText:{
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
        {!(text.length > 0 && imageClass===classes.textImageMultiple) &&
          <Typography className={classes.date}>{time}</Typography>
        }

        {text.length > 0 && imageClass===classes.textImageMultiple &&
          <TextBubble/>
        }

        {images.length > 0 &&
          <Box className={classes.textImageWrapper}>
            {images.map((images) => { 
              return <img key={images} alt="textImage" className={imageClass} src={[images]}/>}
            )}
          </Box>
        }

        {text.length > 0 && imageClass!==classes.textImageMultiple &&
          <TextBubble/>
        }

        {text.length > 0 && imageClass===classes.textImageMultiple &&
          <Typography className={classes.date}>{time}</Typography>
        }
    </Box>
  );
};

export default SenderBubble;
