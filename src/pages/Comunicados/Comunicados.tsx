import { useState } from 'react';
import './Comunicados.css';
import QuizCard from '../../components/quiz-card/QuizCard';

const comunicados = [
  { 
    id: 1, 
    nome: "Nova Política de Home Office", 
    data: "28/08/2026", 
    tipo: "RH", 
    status: "Pendente", 
    marcador: "URGENTE", 
    texto: "Atualizamos as diretrizes para o trabalho remoto. Por favor, acessem a intranet para assinar o novo termo aditivo até sexta-feira." 
  },
  { 
    id: 2, 
    nome: "Manutenção do Sistema", 
    data: "01/09/2026", 
    tipo: "TI", 
    status: "Pendente", 
    marcador: "INFORMATIVO", 
    texto: "O sistema passará por uma manutenção preventiva hoje às 22h. O serviço poderá ficar instável por até 30 minutos." 
  },
  { 
    id: 3, 
    nome: "Gympass e Novos Benefícios", 
    data: "05/09/2026", 
    tipo: "RH", 
    status: "Pendente", 
    marcador: "BENEFÍCIO", 
    texto: "Agora temos parceria com o Gympass! Verifique os planos disponíveis para você e seus dependentes no portal do colaborador." 
  }
];

const getMarcadorColor = (marcador: string) => {
  switch (marcador?.toUpperCase()) {
    case 'URGENTE':
      return 'bg-danger text-white';
    case 'BENEFÍCIO':
    case 'BENEFICIO':
      return 'bg-success text-white';
    case 'ATENÇÃO':
    case 'ATENCAO':
      return 'bg-warning text-dark';
    case 'INFORMATIVO':
      return 'bg-primary text-white';
    default:
      return 'bg-secondary text-white';
  }
};

function Comunicados() {
  const [abertoId, setAbertoId] = useState(null);
  const [comunicadoStatus, setComunicadoStatus] = useState(() => {
    return JSON.parse(sessionStorage.getItem('comunicadoStatus') || '[]');
  });
  const [quizAberto, setQuizAberto] = useState(false);
  const [quizSelector, setQuizSelector] = useState(0);

  const toggleComunicado = (id: any) => {
    setAbertoId(abertoId === id ? null : id);
  };

  function enviarStatus(status: any) {
    sessionStorage.setItem('comunicadoStatus', JSON.stringify(status));
  }

  return (
    <div id="content">
      <div className="container mt-5">
        
        {/* Cabeçalho da Tabela/Barrinha */}
        <div className="border border-bottom m-0 row bg-white text-black p-3 fw-bold rounded-top text-center text-md-start d-none d-md-flex">
          <div className="col-md-3">Nome</div>
          <div className="col-md-2">Data</div>
          <div className="col-md-2">Tipo</div>
          <div className="col-md-3">Marcador</div>
          <div className="col-md-2">Status</div>
        </div>

        {/* Lista de Itens */}
        {comunicados.map((item, index: any) => {
          const estaAberto = abertoId === item.id;
          
          // Garante que se o status não existir no sessionStorage ainda, ele assume "Pendente"
          const statusAtual = comunicadoStatus[index] || "Pendente";

          return (
            <div key={item.id} className="border-start border-end border-bottom m-0 border-top m-0">
              
              {/* Linha clicável */}
              <div 
                className="row p-3 align-items-center m-0 text-center text-md-start" 
                onClick={() => toggleComunicado(item.id)} 
                style={{ cursor: 'pointer', transition: 'background 0.2s', backgroundColor: estaAberto ? '#f8f9fa' : '#fff' }}
              >
                <div className="col-12 col-md-3 fw-semibold mb-2 mb-md-0 text-start text-md-start">
                  {estaAberto ? '▽ ' : '▷ '} {item.nome}
                </div>

                <div className="col-6 col-md-2 text-muted mb-2 mb-md-0 text-start text-md-start">
                  <span className="d-md-none fw-bold text-dark">Data: </span>{item.data}
                </div>

                <div className="col-6 col-md-2 mb-2 mb-md-0 text-end text-md-start">
                  <span className="d-md-none fw-bold text-dark me-1">Tipo: </span>
                  <span className="badge bg-secondary">{item.tipo}</span>
                </div>

                <div className="col-6 col-md-3 mb-2 mb-md-0 text-start text-md-start">
                  <span className={`badge ${getMarcadorColor(item.marcador)}`}>{item.marcador}</span>
                </div>

                {/* Status com Fallback para evitar ficar em branco */}
                <div className="col-6 col-md-2 text-end text-md-start mt-0 mt-md-0">
                  <span className={`badge w-100 w-md-auto ${statusAtual === 'Pendente' ? 'bg-danger' : 'bg-success'}`}>
                    {statusAtual}
                  </span>
                </div>
              </div>

              {/* Caixa expandida */}
              {estaAberto && (
                <div className="p-4 bg-light border-top animate__animated animate__fadeIn">
                  <span style={{ fontWeight: "bold" }}>Detalhes do Comunicado:</span>
                  <p className="mb-0 text-secondary" style={{ whiteSpace: 'pre-line' }}>
                    {item.texto}
                  </p>
                  
                  <button 
                    id="button-quiz-comunicado" 
                    style={{ backgroundColor: statusAtual === 'Pendente' ? 'rgba(25, 25, 25, 0.1)' : 'rgba(0, 128, 0, 0.3)' }} 
                    onClick={() => {
                      if (statusAtual === 'Pendente') {
                        setQuizAberto(true);
                        setQuizSelector(item.id);
                        
                        const novosStatus = [...comunicadoStatus];
                        novosStatus[index] = "Lido";
                        
                        setComunicadoStatus(novosStatus);
                        enviarStatus(novosStatus);
                      }
                    }}
                  >
                    {statusAtual === 'Pendente' ? 'Responder Questionário' : 'Questionário Concluído'}
                  </button>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {quizAberto && <QuizCard id={quizSelector} onClose={() => setQuizAberto(false)} />}
    </div>
  );
}

export default Comunicados;
