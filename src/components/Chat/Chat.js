import React, { useEffect, useState, useRef } from 'react';
import './Chat.css';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectPlanId, selectPlanName } from '../../features/appSlice';
import { db } from '../../firebase/firebase';

import Message from './Message';
import SendIcon from '@material-ui/icons/Send';

function Chat() {
    const user = useSelector(selectUser);
    const planId = useSelector(selectPlanId);
    const planName = useSelector(selectPlanName);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const msgEndRef = useRef(null); // for auto scroll
    
    // Update the chat messages
    useEffect(() => {
        if(planId) {
            db.collection('plans')
            .doc(planId)
            .collection("messages")
            .orderBy("timestamp")
            .onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) => 
                    doc.data())
                )
            );
        }
    }, [planId]);

    const sendMessage = (e) => {
        e.preventDefault();

        // Store sent message to database
        db.collection('plans')
            .doc(planId)
            .collection("messages")
            .add({
                user: user,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
            });
        setInput("");
    }

    useEffect(() => {
        msgEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className="chat">
            <h4>{planName} Chat</h4>
            <div className="chat__messages">
                {messages === null ? ("") : ( 
                <>
                    {messages.map((message) => (
                        <Message 
                        key={message.timestamp}
                        user={message.user}
                        timestamp={message.timestamp}
                        message={message.message}
                        />
                    ))}
                    </>
                )
                }

                <div ref={msgEndRef} />
            </div>

            <div className="chat__input">
                <form>
                    <input value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={!planId}
                    placeholder={`Aa`}
                    />
                    <button
                        disabled={!planId}
                        className="chat__inputButton"
                        type="submit"
                        onClick={sendMessage}
                    >
                        <SendIcon className="chat__sendIcon"fontSize="small" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Chat;
