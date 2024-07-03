import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageIcon from '@mui/icons-material/Message';
import { Avatar } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IconButton } from '@mui/material';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
function Sidebar() {
  return (
    <div className= "sidebar">
    <div className="sidebar_header">
    <Avatar src="https://api.dicebear.com/8.x/avataaars/svg?seed=Abby"/>
    <div className="sidebar_headerRight">
      <IconButton>
        <MessageIcon />
      </IconButton>
      <IconButton>
      <MoreVertIcon />
      </IconButton>
      
   
    </div>
    </div>
    <div className= "sidebar_search">
      <div className="sidebar_searchContainer">
      <SearchOutlinedIcon />
      <input placeholder="search" type="text"/>
    </div>
    </div>

    <div className= "sidebar_chats">
      
    <SidebarChat />
    <SidebarChat />
    <SidebarChat />
    <SidebarChat />

    </div>
    </div>
  );
}

export default Sidebar;
