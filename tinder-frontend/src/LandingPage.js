import React, { useState, useEffect } from 'react'
import './LandingPage.css'
import { useHistory } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from './axios'
import { useDataLayerValue } from './DataLayer'
function LandingPage() {
    const history = useHistory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [url, setUrl] = useState('');
    const [{ user }, dispatch] = useDataLayerValue()


    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }


    const uploadFields = async () => {
        await axios.post('/tinder/card', {
            name: name,
            email: email,
            password: password,
            imgUrl: url
        })
        setName('')
        setEmail('')
        setPassword('')
        setUrl('')
        setIsLogin(true)
    }

    const login = async () => {
        await axios.post('/login', {
            email: email,
            password: password
        })
            .then(data => {

                console.log(data.data.user)
                dispatch({
                    type: 'SET_USER',
                    user: data.data.user
                })
                history.push('/')
            })
    }


    return (
        <div className="landingPage">
            <div className="tinder-logo">
                <div>
                    <img alt="svgImg" src="https://res.cloudinary.com/saaho-insta/image/upload/v1615702704/tinder-logo_epchxh.jpg" />

                </div>
                <div>
                    <button className="loginBtn" onClick={() => {
                        setIsLogin(true)
                        toggleModal()
                    }}
                    >Log In</button>
                </div>
            </div>
            <div className="tinder-body">
                <div className="body">

                    <h1>Start something epic.</h1>
                    <div>
                        <button className="registerBtn" onClick={() => {
                            setIsLogin(false)
                            toggleModal()
                        }}  >Create Account</button>
                    </div>
                </div>


                <Modal className="parentModal" isOpen={isModalOpen} toggle={toggleModal}>

                    <ModalHeader toggle={toggleModal}>{!isLogin ? 'Register' : 'Login'}</ModalHeader>
                    <ModalBody>

                        {!isLogin ? (
                            <>
                                <input className="input" type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
                                <input className="input" type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                                <input className="input" type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                                <input className="input" type="text" placeholder="Enter image url" value={url} onChange={e => setUrl(e.target.value)} />
                            </>
                        )
                            :
                            (
                                <>
                                    <input className="input" type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                                    <input className="input" type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                                </>
                            )
                        }

                    </ModalBody>
                    <ModalFooter>
                        <button className="submitBtn" onClick={() => !isLogin ? uploadFields() : login()}  >{!isLogin ? 'Submit' : 'Login'}</button>
                    </ModalFooter>
                </Modal>

            </div>
        </div>
    )
}

export default LandingPage
