import React from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  const selector = (images, text, classes) => {
    let imageClass=null;
    let textClass=null;
    
    if (images.length>1) {
      if (text.length>0) {
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
    return [imageClass, textClass];
  }

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');
        return message.senderId === userId ? (
          <SenderBubble key={message.id}
          text={message.text}
          time={time}
          images={message.attachments}
          selector={selector}/>
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            images={message.attachments}
            selector={selector}/>
        );
      })}
    </Box>
  );
};

export default Messages;
