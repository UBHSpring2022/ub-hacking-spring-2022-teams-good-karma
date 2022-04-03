import React, { useState } from 'react'
import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material'
import Button from '@mui/material/Button'
import bgImage from '../resources/signin-bg.jpeg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const SignupPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate()
    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value)
    }
    const handleRoleChange = (event) => {
        setRole(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleUserNameChange = (event) => {
        setUserName(event.target.value)
    }
    const redirectToLogin = () => {
        navigate('/login')
    }
    return (
        <div className="login-wrapper flex flex-row h-screen w-screen">
            <div className="w-50">
                <img src={bgImage} className="img-wrapper" alt="bg" />
            </div>
            <div className="w-50 login-fields flex flex-col h-full justify-center">
                <div className="welcome-back-txt">Welcome!!</div>
                <div className="login-txt mt-5">Sign-up to your account</div>
                <div className="mt-5 input-width">
                    <TextField
                        value={name}
                        onChange={handleNameChange}
                        label="Name"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="mt-5 input-width">
                    <TextField
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        label="Phone number"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="mt-5 input-width">
                    <TextField
                        value={userName}
                        onChange={handleUserNameChange}
                        label="Username"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="mt-5 input-width">
                    <TextField
                        value={password}
                        onChange={handlePasswordChange}
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
                            <InputLabel id="age-simple-select-label">
                                Role
                            </InputLabel>

                            <Select
                                label="Role"
                                value={role}
                                onChange={handleRoleChange}
                                fullWidth
                                labelId="age-simple-select-label"
                                id="demo-simple-select-helper"
                            >
                                <MenuItem value={'Donor'}>Donor</MenuItem>
                                <MenuItem value={'Vendor'}>Vendor</MenuItem>
                                <MenuItem value={'Organization'}>
                                    Organization
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="mt-5">
                        <Button
                            variant="outlined"
                            onClick={redirectToLogin}
                            className="input-width"
                        >
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

export default SignupPage
