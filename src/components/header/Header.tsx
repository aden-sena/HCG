import "./Header.css";
import users from "../../assets/data-fake.json"
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'

interface DropdownItem {
    icon: string
    label: string
    href?: string
    onClick?: () => void
}



function Header({ onLogout }: any) {
    const token = sessionStorage.getItem("token")
    const validarToken = users.users.find((user) => user.token === token)
    const userData = validarToken ? {
        nome: validarToken.nome,
        email: validarToken.email,
        foto: validarToken.foto,
        cargo: validarToken.cargo,
        setor: validarToken.setor,
        pontuacao: validarToken.pontuacao,
        xp: validarToken.xp
    } : {}

    const dropdownItems: DropdownItem[] = [
        { icon: "M287-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm96.5-143.5Q760-287 760-320t-23.5-56.5Q713-400 680-400t-56.5 23.5Q600-353 600-320t23.5 56.5Q647-240 680-240t56.5-23.5Zm-280-320Q480-607 480-640t-23.5-56.5Q433-720 400-720t-56.5 23.5Q320-673 320-640t23.5 56.5Q367-560 400-560t56.5-23.5ZM400-640Zm12 400Z", label: "Gerenciar conta", href: "#" },
        { icon: "M160-200h160v-320H160v320Zm240 0h160v-560H400v560Zm240 0h160v-240H640v240ZM80-120v-480h240v-240h320v320h240v400H80Z", label: "Ranking", href: "#" },
        { icon: "M200-120q-33 0-56.5-23.5T120-200v-160h80v160h560v-560H200v160h-80v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm220-160-56-58 102-102H120v-80h346L364-622l56-58 200 200-200 200Z", label: "Sair", onClick: () => {
            onLogout()
        } }
    ]

    const [nivel] = useState(calcularNivelPorXP(userData.pontuacao))

    function calcularNivelPorXP(xpAtual: any) {
        if (xpAtual < 100) return 1;
        
        // Aplica a fórmula matemática inversa
        let nivel = Math.floor((1 + Math.sqrt(1 + 0.08 * xpAtual)) / 2);
        
        return nivel;
    }

    return(
        <header id="header">
            <Dropdown id="dropdownUserInfo">
                <Dropdown.Toggle as="div" variant="success" id="dropdown-basic">
                    <div id="user-info">
                        <span id="nome">{ userData.nome }</span>
                        <br />
                        <span id="cargo">{ userData.cargo }</span>
                    </div>

                    <img id="user-photo" src={ userData.foto } alt={ userData.nome } />

                    <div id="user-button-menu">
                        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ marginTop: '1.5rem' }} popperConfig={{ modifiers: [{ name: 'preventOverflow', options: { boundary: 'viewport' } }] }}>
                    <Dropdown.Header style={{ color: '#3c3c3c' }}>
                        <img id="user-photo-dropdown" src={ userData.foto } alt={ userData.nome } />
                        <span> {userData.email} </span>
                        <div id="level">
                            <span> Lvl. { nivel }</span>
                            <progress id="progress-bar" value={ userData.xp } max={nivel*100}></progress>
                        </div>
                    </Dropdown.Header>

                    {dropdownItems.map((item, index) => (
                        <Dropdown.Item 
                            key={index}
                            href={item.href} 
                            className="d-flex align-items-center gap-2"
                            onClick={item.onClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3c3c3c"><path d={item.icon}/></svg>
                            {item.label}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            <div id="sino">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e3e3e3"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>
            </div>

            <div id="logo-cover">
                <img id="logo" src="hcg-sf.png" alt="Logo" />
            </div>
      </header>
    )
}

export default Header