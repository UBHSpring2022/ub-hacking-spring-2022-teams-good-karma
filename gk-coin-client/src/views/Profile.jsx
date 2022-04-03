
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import React from 'react'
import HomeIcon2 from '../resources/Home.svg'


const Profile = () => {
    return (
            <div className="gk-sidebar flex flex-col items-center">
                
                <div className="title-txt mt-10">GK Coin</div>
                
                <div className="mt-10 flex flex-col sidebar-items">
                    <div className="sidebar-item active-item">
                    <img src={HomeIcon2} /> <div className="ml-5">Home</div>
                    </div>
                    <div className="sidebar-item">
                       <PermIdentityIcon /> <div className="ml-5">Profile</div>
                    </div>
                </div>
            </div>
    )
}



export default Profile