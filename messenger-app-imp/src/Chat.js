import React, { useState, useEffect } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import './Chat.css';
import axios from './axios';

function Chat({ messages }) {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random()*10000));
      }, []);
    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post("/messages/new",
        {
            message: input,
            name: "Dhanya S",
            timestamp: "2023",
            received: true
        }
    );

    setInput("");
    };
  return (
    <div className="chat">
        <div className="chat_header">
            <Avatar src= {`https://api.dicebear.com/8.x/avataaars/svg?seed=${seed}`}/>
            <div className="chat_headerInfo">
                <h3>Room Name</h3>
                <p>Last seen at ...</p>
            </div>
            <div className="chat_headerRight">
            
            <IconButton>
            <MoreVertIcon />
            </IconButton> 
            <IconButton>
            <AttachFileIcon />
            </IconButton>
      
            </div>
        </div>
        <div className="chat_body">
            {messages.map((message) => (
                <p className={`chat_message ${message.received && "chat_receiver"}`}> 
                <span className="chat_name">{message.name}</span>
                {message.message}
                <span className="chat_timestamp">
                    { message.timestamp }
                </span>
            </p>
            )) }
            
            
            
        </div>
        <div className="chat_footer">
            <InsertEmoticonIcon />
            <form>
                <input value={input} onChange={ (e) => setInput(e.target.value)} placeholder="Type a message" type="text" />
                <button onClick={sendMessage}
                type="submit">Send a message</button>
                
            </form>
            <MicIcon />
            <IconButton onClick={sendMessage} type="button">
                <SendIcon />
            </IconButton>

        </div>
    </div>
  );
}

export default Chat;
