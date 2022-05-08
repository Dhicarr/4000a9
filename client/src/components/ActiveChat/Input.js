import React, { useState } from 'react';
import { FormControl, FilledInput, IconButton, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import axios from "axios";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: 'flex-end',
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    marginBottom: 20,
  },
  UploadWrapper:{ 
    position:'absolute',
    bottom:30,
    right:10,
    zIndex:1
  },
  FileUploadIcon:{
    color: '#D1D9E6'
  }
}));

const Input = ({ otherUser, conversationId, user, postMessage }) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [images,setImages] = useState([]);
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const fileChangeHandler = async (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      setImages((prev) => [...prev, event.target.files[i]]);
    }
  };

  const fileSubmitHandler = async () => {
    const instance = axios.create();
    const promises = images.map(image => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
      return instance.post(
        'https://api.cloudinary.com/v1_1/dtbvvi5fx/image/upload',
        formData
      );
    });
    const results = await Promise.all(promises);
    return results.map(result => result.data.url);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const data = await fileSubmitHandler();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: formElements.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: data
    };
    await postMessage(reqBody);
    setText('');
    setImages([]);
  };

  return (
      <form className={classes.root} onSubmit={handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <Box className={classes.UploadWrapper}>
            <label>
              <input accept="image/*" type="file" onChange={fileChangeHandler} multiple style={{display:'none'}}/>
              <IconButton color="primary" aria-label="upload picture" component="span">
                <FileCopyOutlinedIcon className={classes.FileUploadIcon}/>
              </IconButton>
            </label>
          </Box>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={text}
            name="text"
            onChange={handleChange}
          />
        </FormControl>
      </form>
  );
};

export default Input;
