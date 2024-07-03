import React from 'react';
import './SidebarChat.css';

import { Avatar } from '@mui/material'
import { useEffect, useState } from 'react';

function SidebarChat(id, name, addNewChat) {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random()*10000));
  }, []);

 
  return (
    <div className="sidebarChat">
     

      <Avatar src= {`https://api.dicebear.com/8.x/avataaars/svg?seed=${seed}`}/>
      <div className="sidebarChat_info">
        <h2>Room name</h2>
        <p>Last message...</p>
      </div>
    </div>
  );
  
}

export default SidebarChat;
