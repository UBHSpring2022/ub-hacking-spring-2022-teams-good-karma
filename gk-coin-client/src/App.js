import './styles/common-styles.scss'
import './styles/page-styles.scss'
import './styles/helpers.scss'
import './App.css'
import LoginPage from './views/LoginPage'
import SignupPage from './views/SignupPage'
import Play from './views/Play'
import Home from './views/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import 'rsuite/dist/rsuite.min.css'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
function App() {
    const location = useLocation()
    let navigate = useNavigate()
    useEffect(() => {
        if (!Cookies.get('auth')) {
            navigate('/login')
        } else if (location.pathname === '/') {
            navigate('/home')
        }
    }, [])
    return (
        <div className="App w-screen h-screen">
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/play" element={<Play />} />
                <Route path="/*" element={<Home />} />
            </Routes>
        </div>
    )
}

export default App
