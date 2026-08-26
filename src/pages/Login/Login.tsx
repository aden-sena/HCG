import './Login.css'
import {useEffect, useState} from 'react'
import users from "../../assets/data-fake.json"

interface LoginProps {
  onLogin: () => void
}

function Login({ onLogin }: LoginProps) {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState('');

  function eyeIcon(eye: string) {
    const eyeContainer = document.getElementById('eye') as HTMLDivElement;
    eyeContainer.innerHTML = eye;
  }

  function passwordVisibility() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    let eye: string
    if (passwordInput.type === 'password') {
      setPasswordVisible('text');
      eye = `
              <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#999999"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
            `
      eyeIcon(eye);
    } else {
      setPasswordVisible('password');
      eye = `
              <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#999999"><path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z"/></svg> 
            `
      eyeIcon(eye);
    }
  }

  useEffect(() => {
    passwordVisibility();
  }, []);

  function validarLogin() {
    const usuarioValido = users.users.find(
      (login) => (login.matricula === user || login.email === user) && login.senha === password
    )

    

    if(usuarioValido) {
      onLogin()
      sessionStorage.setItem("isLogged", "true")
      sessionStorage.setItem("token", usuarioValido.token)

    }else {
      alert("Credencial Incorreta") 
    }
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key == "Enter") {
      validarLogin()
    }
  }
 
  return (
    <div id="login">
      <aside>
        <h1>HCG</h1>
        <h2>Hub de Comunicação Gamificada</h2>
        <h3>Conectamos pessoas, impulsionamos <span>resultados</span>.</h3>

        <p>Bem-vindo ao Portal do Colaborador. Faça login para acessar os conteúdos e acompanhar o seu desenvolvimento e participar ativamente da nossa cultura.</p>

        <div id="protegido">
          <svg xmlns="http://www.w3.org/2000/svg" height="75px" viewBox="0 -960 960 960" width="75px" fill="#e3e3e3"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Zm-80 160h160q17 0 28.5-11.5T600-360v-120q0-17-11.5-28.5T560-520v-40q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560v40q-17 0-28.5 11.5T360-480v120q0 17 11.5 28.5T400-320Zm40-200v-40q0-17 11.5-28.5T480-600q17 0 28.5 11.5T520-560v40h-80Z"/></svg>
          <span>Seus dados estão seguros com a gente.</span>
        </div>
      </aside>

      <div id="login-box">
        <h1>Bem-vindo de volta!</h1>
        <h2>Acesse sua conta para continuar.</h2>

        <div id="user-box">
          <label htmlFor="user">Matrícula ou E-mail</label>
          <div className="input-group">
            <svg className="icon-input" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#999999"><path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z"/></svg>
            <input 
              type="text" 
              name="user" 
              id="user" 
              placeholder="Digite sua matricula ou e-mail"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onKeyDown={handleEnter}
            />
          </div>
        </div>

        <div id="password-box">
          <label htmlFor="password">Senha</label>
          <div className="input-group">
            <svg className="icon-input" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#999999"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
            <input 
              type={passwordVisible} 
              name="password" 
              id="password" 
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleEnter}
            />
            <div id="eye" onClick={passwordVisibility}></div>
          </div>
        </div>

        <div id="lembrar-esqueci">
          <div id="lembrar-box">
            <input 
              type="checkbox" 
              id="lembrar"
            />
            <label htmlFor="lembrar">Lembrar de mim</label>
          </div>

          <a href="#">Esqueci minha senha</a>
        </div>

        <button id="entrar" onClick={validarLogin}>
          Entrar
          <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="white"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
        </button>

        <div className="container-ou">
          <span className="texto-ou">ou</span>
        </div>

        <div id="outro-entrar">
          <button><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/3840px-Microsoft_logo.svg.png" alt="logo microsoft" /></button>

          <button><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png" alt="logo google" /></button>
        </div>

        <div id="ajuda">
          <p>Precisa de ajuda?</p>
          <a href="#">Fale com o RH</a>
        </div>
      </div>
    </div>
  )
}


export default Login
