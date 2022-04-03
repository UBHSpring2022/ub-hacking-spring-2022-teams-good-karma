import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import bgImage from '../resources/signin-bg.jpeg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const LoginPage = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate()

    const handleUserNameChange = (event) => {
        setUserName(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const loginUser = () => {
        Cookies.set('auth', 'user1')
        navigate('/home')
    }

    return (
        <div className="login-wrapper flex flex-row h-screen w-screen">
            <div className="w-50">
                <img src={bgImage} className="img-wrapper" alt="bg" />
            </div>
            <div className="w-50 login-fields flex flex-col h-full justify-center">
                <div className="welcome-back-txt">Welcome back</div>
                <div className="login-txt mt-5">Login to your account</div>
                <div className="mt-5 input-width">
                    <TextField
                        label="Username"
                        value={userName}
                        onChange={handleUserNameChange}
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="mt-5 input-width">
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        autoComplete="current-password"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div>
                    <div className="mt-5">
                        <Button
                            variant="outlined"
                            onClick={() => loginUser()}
                            className="input-width"
                        >
                            Sign-in
                        </Button>
                    </div>
                    <div className="signup-txt mt-5 input-width flex justify-center">
                        Dont have an account?{' '}
                        <Link to="/signup" className="subtxt ml-1">
                            Join free today
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
