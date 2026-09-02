import './Home.css'
import df from '../../assets/data-fake.json'
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import PostModel from '../../components/post-model/PostModel';
import { useNavigate } from 'react-router-dom';
import { playersOrdenados } from '../Ranking/Ranking';

const EVENTOS_MOCK = [
    { id: 1, data: "2026-08-18", hora: "14:00", titulo: "Reunião de Alinhamento" },
    { id: 2, data: "2026-08-18", hora: "16:30", titulo: "Café com Cliente" },
    { id: 3, data: "2026-08-19", hora: "09:00", titulo: "Daily Scrum" },
    { id: 4, data: "2026-08-22", hora: "10:00", titulo: "Mentoria React" },
  ];

const PostButtons = [
  { label: "Foto", fill: "#a6cfb7", path: "M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z"},
  { label: "Vídeo", fill: "#6484d4", path: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" },
  { label: "Evento", fill: "#F0C5AB", path: "M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" },
  { label: "Em branco", fill: "#E4B0BC", path: "M280-280h84l240-238-86-86-238 238v86Zm352-266 42-44q6-6 6-14t-6-14l-56-56q-6-6-14-6t-14 6l-44 42 86 86ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm301.5-598.5Q510-807 510-820t-8.5-21.5Q493-850 480-850t-21.5 8.5Q450-833 450-820t8.5 21.5Q467-790 480-790t21.5-8.5ZM200-200v-560 560Z" }
]

function Seta({ onClick }: any) {
  const seta = <button 
                onClick={onClick} 
                style={{
                  position: 'absolute', 
                  bottom: '.5rem', 
                  right: '1rem', 
                  backgroundColor: 'transparent', 
                  border: 'none'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#0139C2"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                </button>

  return seta
}

function Home() {
  const hora = new Date().toLocaleTimeString();
  let greeting = '';
  const token = sessionStorage.getItem("token")
  const validarToken = df.users.find((user) => user.token === token)
  const userName = validarToken ? validarToken.nome : 'User'

  if(hora >= '06:00:00' && hora < '12:00:00') {
    greeting = `Bom dia, ${userName}!`;
  } else if(hora >= '12:00:00' && hora < '18:00:00') {
    greeting = `Boa tarde, ${userName}!`;
  } else {
    greeting = `Boa noite, ${userName}!`;
  }

  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  // Formata a data do calendário para o padrão YYYY-MM-DD (compatível com o Mock)
  const formatarDataIso = (date: Date) => {
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const dataFormatada = formatarDataIso(dataSelecionada);

  // Filtra os eventos do dia clicado
  const eventosDoDia = EVENTOS_MOCK.filter(
    (evento) => evento.data === dataFormatada
  );

  const lidarComMudancaData = (valor: any) => {
  if (valor instanceof Date) {
    setDataSelecionada(valor);
  }
}

const [texto, setTexto] = useState('')
// Conta quantas quebras de linha existem e define as rows (mínimo 1, máximo 5)
const quebrasDeLinha = texto.split('\n').length;
const numRows = Math.min(Math.max(quebrasDeLinha, 1), 5);

// Estado para armazenar o status dos comunicados
const [status, setStatus] = useState(JSON.parse(sessionStorage.getItem('comunicadoStatus') || '[]'))
const [lidos, setLidos] = useState(0);
const [pendentes, setPendentes] = useState(0);
useEffect(() => {
  const storedStatus = sessionStorage.getItem('comunicadoStatus');
  if (storedStatus) {
    setStatus(JSON.parse(storedStatus));
  }

  if(status) {
    setLidos(0);
    setPendentes(0);
    status.forEach((s: string) => {
      if(s === "Lido") {
        setLidos(prev => prev + 1);
      } else if(s === "Pendente") {
        setPendentes(prev => prev + 1);
      }
    });
  }
}, []);

const navigate = useNavigate();

  return (
    <article id="home">
      <div id="greetings">
        <span>{greeting}</span>
        <div id="bom-trabalho">
          <span>Bom trabalho!</span>
        </div>
      </div>

      <div id="comms-ranking-agenda-box">
        <div id="left">  
          <div id="comunicados">
            <span>Comunicados</span>
            <div>
              <div id="pendentes">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#F7D347"><path d="M160-160v-440h160v440H160Zm0-480v-160h160v160H160Zm240 480v-320h160v320H400Zm0-360v-160h160v160H400Zm240 360v-200h160v200H640Zm0-240v-160h160v160H640Z"/></svg>
                <span>Comunicados Pendentes</span>
                <span className='comunicados-num' style={{color: "#F7D347"}}>{pendentes}</span>
              </div>

              <div id="line"></div>

              <div id="lidos">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0139C2"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                <span>Comunicados Lidos</span>
                <span className='comunicados-num' style={{color: "#0139C2"}}>{lidos}</span>
              </div>
            </div>

            <Seta onClick={ () => navigate('/comunicados') }/>
          </div>

          <div id="ranking">
            <span>Ranking</span>

            <div>
              <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="#0139C2"><path d="M160-200h160v-320H160v320Zm240 0h160v-560H400v560Zm240 0h160v-240H640v240ZM80-120v-480h240v-240h320v320h240v400H80Z"/></svg>

              <div>
                <span>Sua Posição</span>
                <span style={{color: "#0139C2", fontSize: "20pt", fontWeight: "bold"}}>#{ playersOrdenados.findIndex((user) => user.nome === validarToken?.nome) + 1 }</span>
              </div>
            </div>

            <Seta onClick={ () => navigate('/ranking') }/>
          </div>
        </div>

        <div id="right">
            <div id="agenda" className="custom-calendar-container">
              <Calendar 
                calendarType="gregory"
                onChange={lidarComMudancaData} 
                value={dataSelecionada}
                prev2Label={null}
                next2Label={null} 
              />

              <div id="eventos">
                <h3>Eventos para {dataSelecionada.toLocaleDateString("pt-BR")}:</h3>
                
                {eventosDoDia.length > 0 ? (
                  <ul>
                    {eventosDoDia.map((evento) => (
                      <li key={evento.id} >
                        <strong>{evento.hora}</strong> - {evento.titulo}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: "#666", fontSize: "14px", padding: "1rem" }}>Nenhum evento para este dia.</p>
                )}

                <button id="add-evento">
                  <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#fff"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

      <div id='make-post'>
        <textarea 
          rows={numRows}
          placeholder='Criar Post...'
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          id="textarea-make-post">
        </textarea>
        <hr />
        <div id='post-types'>
          {PostButtons.map((item, index) => (
            <button key={index}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={item.fill}><path d={item.path}/></svg>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <PostModel 
        nome="Beatriz Cavalcanti"
        cargo="Gerente de Projetos"
        conteudo={`Design is not just what it looks and feels like. Design is how it work.`}
        profilePhoto="users_photo_cover/Beatriz Cavalcanti.jpeg"
        image="https://dheegital.com/wp-content/uploads/2019/03/post-os-8-tipos-de-design-grafico.jpg"
      />
    </article>
  )
}

export default Home