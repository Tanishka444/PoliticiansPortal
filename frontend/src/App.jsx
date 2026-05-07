import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Auth from './pages/Auth'
import CreateProfile from './pages/CreateProfile'
import Search from './pages/Search'
import ProfileView from './pages/ProfileView'
import About from './pages/About'
import Downloads from './pages/Downloads'
import RTI from './pages/RTI'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/auth"            element={<Auth />} />
        <Route path="/create-profile"  element={<CreateProfile />} />
        <Route path="/search"          element={<Search />} />
        <Route path="/politician/:id"  element={<ProfileView />} />
        <Route path="/about"           element={<About />} />
        <Route path="/downloads"       element={<Downloads />} />
        <Route path="/rti"             element={<RTI />} />
        <Route path="/contact"         element={<Contact />} />
        <Route path="*"                element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App