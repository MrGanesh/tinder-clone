import React, { useState } from 'react'
import './chatScreen.css'
import Avatar from "@material-ui/core/Avatar"
import { useDataLayerValue } from './DataLayer'
import axios from './axios'
import { useParams } from 'react-router'
function ChatScreen() {
    const params = useParams();
    const [input, setInput] = useState('');
    // const [messages, setMessages] = useState([
    //     {
    //         name: "Amruta",
    //         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK1K8lWDxj4LRucyFDVwPzU7PMdY4rph2jISF6RspWWq46u-s&s",
    //         Message: "Hello Dear"
    //     },
    //     {
    //         name: "Ganesh",
    //         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqXE12xoJtXUabIxuTTFOk3TKmYX7TkANuPEqF1vpFnamYyjQ&s",
    //         Message: "Hows it going"
    //     },
    //     {
    //         Message: "Going Good!!"
    //     },
    // ])

    const [{ user, messages }, dispatch] = useDataLayerValue()
    console.log(params.person)
    console.log(messages.map(message => message.name))
    const handleSend = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            name: user.name, //sender
            message: input,
            timeStamp: new Date().toLocaleString(),
            received: false,
            imgUrl: user.imgUrl,
            receiverName: params.person
        })

        setInput("")
    }

    return (
        <div className="chatScreen">

            <p className="chatScreen_timestamp"> You Matched with {params.person} on 21/2/2021</p>

            {messages?.map((message) => (

                message.name === params.person ? (
                    <div className="chatScreen_message">
                        <Avatar className="chatScreen_image" alt={message.name} src={message.imgUrl} />
                        <div className="chatScreen_text">
                            <p><strong>{message.name}</strong></p>
                            <p >{message.message}</p>
                        </div>

                    </div>
                ) :
                    message.received === false && params.person === message.receiverName ? (
                        <div className="chatScreen_message">

                            <p className="chatScreen_textUser">{message.message}</p>
                        </div>
                    ) : (<> </>)


            ))}
            <div >
                <form className="chatScreen_input">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)} className="chatScreen_inputField" type="text" placeholder="type a messsage" />
                    <button type="submit" onClick={handleSend} className="chatScreen_inputButton">SEND</button>


                </form>
            </div>
        </div>
    )
}

export default ChatScreen
