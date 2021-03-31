import React from 'react'
import './Chat.css'
import Avatar from "@material-ui/core/Avatar"
import { Link } from 'react-router-dom'
function Chat({ name, Message, profilePic, timeStamp }) {



    return (
        <Link to={`/chat/${name}`}>
            <div className="chat">
                <Avatar className="chat_image" alt="name" src={profilePic} />
                <div className="chat_details">
                    <h2>{name}</h2>
                    <p>{Message}</p>
                </div>
                <p clcassName="chat_timestamp">{timeStamp}</p>
            </div>
        </Link>

    )
}

export default Chat
