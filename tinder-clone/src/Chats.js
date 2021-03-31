import React, { useEffect, useState } from 'react'
import './Chats.css';
import Chat from './Chat'
import Pusher from 'pusher-js'
import axios from './axios'
import { useDataLayerValue } from './DataLayer';
import { useParams } from 'react-router'
function Chats() {
    const [{ user, messages }, dispatch] = useDataLayerValue()
    const params = useParams();
    useEffect(() => {
        axios.get('/messages/sync')
            .then(res => {
                console.log(res)
                dispatch({
                    type: 'SET_MESSAGES',
                    messages: res.data
                })

            })
    }, [])

    useEffect(() => {
        const pusher = new Pusher('af6db6e1fbc26b9813d7', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function (newMessage) {
            alert(JSON.stringify(newMessage));
            dispatch({
                type: 'SET_MESSAGES',
                messages: [...messages, newMessage]
            })
            // setMessages([...messages, newMessage])
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages])

    console.log(messages)
    console.log("in chats name>>> " + params.person)
    return (

        <div className="chats">
            {messages?.map((message) =>
                message.name !== params.person ? (
                    <Chat
                        name={message.name}
                        Message={message.message}
                        timeStamp={message.timeStamp}
                        profilePic={message.imgUrl}
                    />) :
                    (<> </>)

            )}

            {/* <Chat
                name="Amruta"
                Message="Hi Dear"
                timeStamp="1 hour ago"
                profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK1K8lWDxj4LRucyFDVwPzU7PMdY4rph2jISF6RspWWq46u-s&s"
            />
            <Chat
                name="Ganesh"
                Message="Hello MySelf"
                timeStamp="1.5 hour ago"
                profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-9x0K7jPGKhZD9OTTcVUU7O9bwj7a03sWwjFVbh6MX8XaYps&s"
            />
            <Chat
                name="Shekhar"
                Message="Hey Dude"
                timeStamp="2 Hour ago"
                profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-9x0K7jPGKhZD9OTTcVUU7O9bwj7a03sWwjFVbh6MX8XaYps&s"
            /> */}
        </div>

    )
}

export default Chats
