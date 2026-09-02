import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Menu from './components/menu/Menu'
import Home from './pages/Home/Home'
import Comunicados from './pages/Comunicados/Comunicados'
import Ranking from './pages/Ranking/Ranking'
import Login from './pages/Login/Login'
import { useState } from 'react'
import Header from './components/header/Header'
import ScrollToTop from './components/scroll-to-top/ScrollToTop'

function App() {
  const [isLogged, setIsLogged] = useState(false)
  const autenticate = isLogged || sessionStorage.getItem("isLogged") == "true"
  const handleLogout = () => {
    sessionStorage.clear();
    setIsLogged(false);
    window.location.href = "/HCG/";
  }

  return (
    <>
      <HashRouter>
        <ScrollToTop />
        { autenticate ? <Menu /> : "" }
        { autenticate ? <Header onLogout={handleLogout}/> : "" }

        <Routes>
          <Route path="/" element={ autenticate ? <Home /> : <Login onLogin={() => setIsLogged(true)}/> } />
          <Route path="/comunicados" element={ autenticate ? <Comunicados /> : <Login onLogin={() => setIsLogged(true)}/> } />
          <Route path="/ranking" element={ autenticate ? <Ranking /> : <Login onLogin={() => setIsLogged(true)}/> } />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App