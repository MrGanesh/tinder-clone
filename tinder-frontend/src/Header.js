import React from 'react'
import './Header.css'
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton'
import ForumIcon from '@material-ui/icons/Forum';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, useHistory } from 'react-router-dom'
import { useDataLayerValue } from './DataLayer'
function Header({ backButton, backButtonUser }) {
    const history = useHistory();
    const [{ user }, dispatch] = useDataLayerValue()
    const logOut = () => {
        dispatch({
            type: 'REMOVE_USER',
            user: null
        })
    }
    return (
        <div className="header">
            {backButton ? (
                <IconButton onClick={() => history.replace(backButton)}>
                    <ArrowBackIosIcon fontSize="large" className="header_icon" />
                </IconButton>
            ) : (
                <Link to='/user'>
                    <IconButton>
                        <PersonIcon fontSize="large" className="header_icon" />
                    </IconButton>
                </Link>
            )}

            <Link to="/">
                <img
                    className="header_logo"
                    src="https://1000logos.net/wp-content/uploads/2018/07/Tinder-logo.png"
                    alt=""
                />
            </Link>
            {/* <Link to="/chat">
                <IconButton >
                    <ForumIcon fontSize="large" className="header_icon" />
                </IconButton>
            </Link> */}

            {!backButtonUser ? (
                <Link to={`/chats/${user.name}`}>
                    <IconButton >
                        <ForumIcon fontSize="large" className="header_icon" />
                    </IconButton>
                </Link>
            ) : (
                <Link to='/user'>

                    <button className="submitBtn" onClick={logOut}>Log Out</button>

                </Link>
            )}


        </div>
    )
}

export default Header

