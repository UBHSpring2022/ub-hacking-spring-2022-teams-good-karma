import './styles/common-styles.scss'
import './styles/page-styles.scss'
import './styles/helpers.scss'
import './App.css'
import LoginPage from './views/LoginPage'
import SignupPage from './views/SignupPage'
import Play from './views/Play'
import { Route, Routes } from 'react-router-dom'
function App() {
    return (
        <div className="App w-screen h-screen">
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/play" element={<Play />} />
            </Routes>
        </div>
    )
}

export default App
