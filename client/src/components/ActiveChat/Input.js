import React, { useState } from 'react';
import { FormControl, FilledInput, IconButton, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

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
    let data=[];
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      let file = images[i];
      formData.append("file", file);
      formData.append("upload_preset", "r6j17w9i");
      const response = await fetch("https://api.cloudinary.com/v1_1/dtbvvi5fx/image/upload", {
        method: "POST",
        body: formData
      })
      const result = await response.json();
      data.push(result.url);
    }
    return data;
	};

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
    <div>
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
    </div>
  );
};

export default Input;
