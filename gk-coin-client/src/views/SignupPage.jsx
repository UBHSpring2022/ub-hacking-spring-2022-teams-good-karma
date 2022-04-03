import React from 'react'
import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material'
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
                <div className="welcome-back-txt">Welcome!!</div>
                <div className="login-txt mt-5">Sign-up to your account</div>
                <div className="mt-5 input-width">
                    <TextField label="Name" variant="outlined" fullWidth />
                </div>
                <div className="mt-5 input-width">
                    <TextField
                        label="Phone number"
                        variant="outlined"
                        fullWidth
                    />
                </div>
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
                    <div className="mt-5 input-width">
                    <FormControl className="input-width">
                    <InputLabel id="age-simple-select-label">Role</InputLabel>

                        <Select
                            label="Role"
                            fullWidth
                            labelId="age-simple-select-label"
                            id="demo-simple-select-helper"

                        >
                            <MenuItem value={10}>Donor</MenuItem>
                            <MenuItem value={20}>Vendor</MenuItem>
                            <MenuItem value={30}>Organization</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                    <div className="mt-5">
                        <Button variant="outlined" className="input-width">
                            Sign-up
                        </Button>
                    </div>
                    <div className="signup-txt mt-5 input-width flex justify-center">
                        Have an account?{' '}
                        <Link className="subtxt ml-1" to="/login">
                            Login now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
