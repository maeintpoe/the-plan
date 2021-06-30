import React from 'react';
import './Message.css';
import { Avatar } from '@material-ui/core';

function Message( { user, timestamp, message }) {
    
    return (
        <div className="message">
            <Avatar className="message__avatar" src={user.profilePic}/>

            <div className="message__info">
                <p>{user.username}
                    <span className="message__timestamp">
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
                <p className="message__message">{message}</p>
            </div>


        </div>
    )
}

export default Message;
