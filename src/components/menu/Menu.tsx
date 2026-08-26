import { NavLink } from 'react-router-dom'
import './Menu.css'
import { useState } from 'react'

interface MenuItem {
    path: string
    label: string
}

const menuItems: MenuItem[] = [
    { path: '/', label: 'Página Inicial' },
    { path: '/comunicados', label: 'Comunicados' },
    { path: '/ranking', label: 'Ranking' },
    { path: '/quiz', label: 'Quiz' }
]

function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const [topIndicator, setTopIndicator] = useState("0px")
    const handleIndicatorPosition = (position: number) => {
        setTopIndicator(`${position * 54}px`)
    }

    return (
        <>
            <div id="menu-icon" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#dfdfdf"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
            </div>

            <nav className={`sidebar ${isMenuOpen ? 'open' : ''}`}>

                <ul id="menu-list">
                    {menuItems.map((item, index) => (
                        <NavLink 
                            key={index}
                            to={item.path} 
                            className={"menu-item"}
                            onClick={() => handleIndicatorPosition(index)}
                        >
                            <li>{item.label}</li>
                        </NavLink>
                    ))}

                    {/* Esse é o indicador que deslizar na lateral */}
                    <div 
                        id="menu-indicator"
                        style={{ top: topIndicator }}
                    ></div>
                </ul>
            </nav>
        </>
    )
}

export default Menu
