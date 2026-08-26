import './PostModel.css'
import df from "../../assets/data-fake.json"
import { useState } from 'react';

interface PostModelProps {
    nome: string;
    cargo: string;
    conteudo: string;
    profilePhoto: string;
    image: string;
}

const Actions = [
    { nome: "Like", path: "M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" },
    { nome: "Comentar", path: "M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" },
    { nome: "Compartilhar", path: "M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm508.5-291.5Q720-743 720-760t-11.5-28.5Q697-800 680-800t-28.5 11.5Q640-777 640-760t11.5 28.5Q663-720 680-720t28.5-11.5ZM680-200ZM200-480Zm480-280Z" },
    { nome: "Enviar", path: "M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" }
]

function PostModel({ nome, cargo, conteudo, profilePhoto, image }: PostModelProps) {
    const token = sessionStorage.getItem("token")
    const validarToken = df.users.find((user) => user.token === token)
    const userPhoto = validarToken ? validarToken.foto : ""
    const [texto, setTexto] = useState('')
    // Conta quantas quebras de linha existem e define as rows (mínimo 1, máximo 5)
    const quebrasDeLinha = texto.split('\n').length;
    const numRows = Math.min(Math.max(quebrasDeLinha, 1), 5);

    return(
        <div id='post-box'>
            <header>
                <img src={ profilePhoto } alt="foto de perfil" />
                <div>
                    <span style={{ fontWeight: "bold", fontSize: "12pt" }}>{ nome }</span>
                    <span style={{ fontSize: "10pt", color: "gray" }}>{ cargo }</span>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#808080"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
            </header>

            <hr />

            <article>
                <p>{ conteudo }</p>
                <img src={ image } alt="imagem do post" />
            </article>

            <hr />

            <footer>
                {Actions.map((item, index) => (
                    <div key={index}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a7a7a7"><path d={ item.path }/></svg>
                        <span style={{ color: "#a7a7a7" }}>{ item.nome }</span>
                    </div>
                ))}
            </footer>

            <hr />
            
            <div id='comentarios'>
                <img src={ userPhoto } alt="Foto do usuário" />
                <textarea
                    rows={numRows}
                    placeholder='Adicionar um comentário...'
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    id="textarea-comentario">
                </textarea>
            </div>
        </div>
    )
}

export default PostModel