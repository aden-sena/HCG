import { NavLink, useLocation } from 'react-router-dom'
import './Menu.css'
import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

interface MenuItem {
    path: string
    label: string
}

const menuItems: MenuItem[] = [
    { path: '/', label: 'Página Inicial' },
    { path: '/comunicados', label: 'Comunicados' },
    { path: '/ranking', label: 'Ranking' }
]

function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleSwipe = useSwipeable({
        onSwipedLeft: () => setIsMenuOpen(false),
        onSwipedRight: () => setIsMenuOpen(true)
    })

    useEffect(() => {
        // Passa a janela global (document) para a referência do useSwipeable
        handleSwipe.ref(document.body);
        
        // Limpa os ouvintes de evento quando o componente for desmontado
        return () => handleSwipe.ref(null);
    }, [handleSwipe]);

    const [topIndicator, setTopIndicator] = useState("0px")

    // Atualiza a posição do indicador no /comunicados quando a página é carregada
    const location = useLocation();

    useEffect(() => {
        // 1. Encontra o índice do item do menu que corresponde ao path atual
        const activeIndex = menuItems.findIndex(item => item.path === location.pathname);

        // 2. Se encontrar a rota (index diferente de -1)
        if (activeIndex !== -1) {
            const itemHeight = 60; // Altura (em pixels) de cada item do menu
            
            // 3. Calcula a posição baseado no índice (Ex: index 1 * 60px = 60px)
            setTopIndicator(`${activeIndex * itemHeight}px`);
        }
    }, [location.pathname])
        

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

            { window.innerWidth <= 1200 && isMenuOpen ? <div id="menu-void" onClick={ () => setIsMenuOpen(false) }></div> : "" }
        </>
    )
}

export default Menu
