import PermIdentityIcon from '@mui/icons-material/PermIdentity'

import React from 'react'
import HomeIcon2 from '../resources/Home.svg'
import { Routes, Route } from 'react-router'
import Organizations from './Organizations'
import Profile from './Profile'
import { Link, useLocation } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import Logo from '../resources/logo.png'
const Home = () => {
    const location = useLocation()
    console.log(location.pathname)
    return (
        <>
            <div className="flex flex-row">
                <div className="gk-sidebar flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center w-full justify-between">
                        <div className="title-txt mt-10 flex flex-row items-center">
                            <img src={Logo} alt="Logo" className="logo-img" />
                            GK Coin
                        </div>

                        <div className="mt-10 flex flex-col sidebar-items">
                            <Link
                                to="/home"
                                className={[
                                    'sidebar-item',
                                    location.pathname === '/home' &&
                                        'active-item',
                                ].join(' ')}
                            >
                                <img
                                    src={HomeIcon2}
                                    className={[
                                        location.pathname !== '/home' &&
                                            'opacity-70',
                                    ]}
                                    alt="Home Icon"
                                />{' '}
                                <div to="/home" className="ml-5">
                                    Home
                                </div>
                            </Link>
                            <Link
                                to="/profile"
                                className={[
                                    'sidebar-item',
                                    location.pathname === '/profile' &&
                                        'active-item',
                                ].join(' ')}
                            >
                                <PermIdentityIcon />{' '}
                                <div className="ml-5">Profile</div>
                            </Link>
                        </div>
                    </div>
                    <div className={'sidebar-item active-item mb-5'}>
                        <LogoutIcon /> <div className="ml-5">Logout</div>
                    </div>
                </div>
                <Routes>
                    <Route path="/home" element={<Organizations />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                </Routes>
            </div>
        </>
    )
}

export default Home
