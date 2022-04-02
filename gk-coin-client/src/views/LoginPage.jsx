import React from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import bgImage from '../resources/signin-bg.jpeg'
import { Link } from 'react-router-dom'
const LoginPage = () => {
    return (
        <div className="login-wrapper flex flex-row h-screen w-screen">
            <div className="w-50">
                <img src={bgImage} className="img-wrapper" alt="bg" />
            </div>
            <div className="w-50 login-fields flex flex-col h-full justify-center">
                <div className="welcome-back-txt">Welcome back</div>
                <div className="login-txt mt-5">Login to your account</div>
                <div className="mt-5 input-width">
                    <TextField label="Username" variant="outlined" fullWidth />
                </div>
                <div className="mt-5 input-width">
                    <TextField
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div>
                    <div className="mt-5">
                        <Button variant="outlined" className="input-width">
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
