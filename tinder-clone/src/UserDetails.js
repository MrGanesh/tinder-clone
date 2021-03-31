import React from 'react'
import './UserDetails.css'
import { useDataLayerValue } from './DataLayer'
function UserDetails() {
    const [{ user }, dispatch] = useDataLayerValue()

    return (
        <div className="userParent" >
            <h1 style={{ margin: "10px" }}>User Details</h1>
            <div className="user">

                <div className="userImage">
                    <img src={user.imgUrl} alt={user.name} />
                </div>
                <div className="userDetails">
                    <h1 style={{ margin: "10px" }}>{user.name}</h1>
                    <h4 style={{ margin: "10px" }}>{user.email}</h4>
                </div>
            </div>
        </div>
    )
}

export default UserDetails
