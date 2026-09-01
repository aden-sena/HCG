import { useState } from 'react';
import './Comunicados.css'

const comunicados = [
  {
    id: 1,
    nome: "Manutenção do Sistema",
    data: "01/09/2026",
    tipo: "TI",
    status: "Pendente",
    texto: "O sistema passará por uma manutenção preventiva hoje às 22h. O serviço poderá ficar instável por até 30 minutos."
  },
  {
    id: 2,
    nome: "Nova Política de Home Office",
    data: "28/08/2026",
    tipo: "RH",
    status: "Lido",
    texto: "Atualizamos as diretrizes para o trabalho remoto. Por favor, acessem a intranet para assinar o novo termo aditivo até sexta-feira."
  }
];

function Comunicados() {
  // Guarda o ID da linha que está aberta. Se for null, todas estão fechadas.
  const [abertoId, setAbertoId] = useState(null);

  const toggleComunicado = (id: any) => {
    // Se clicar no que já está aberto, fecha. Se não, abre o novo.
    setAbertoId(abertoId === id ? null : id);
  };

  return (
    <div id="content">
      <div className="container mt-4">
        {/* Cabeçalho da Tabela/Barrinha - Oculto em telas pequenas (d-none d-md-flex) */}
        <div className="border border-bottom m-0 row bg-white text-black p-3 fw-bold rounded-top text-center text-md-start d-none d-md-flex">
          <div className="col-md-4">Nome</div>
          <div className="col-md-3">Data</div>
          <div className="col-md-3">Tipo</div>
          <div className="col-md-2">Status</div>
        </div>

        {/* Lista de Itens */}
        {comunicados.map((item: any) => {
          const estaAberto = abertoId === item.id;
          return (
            <div key={item.id} className="border-start border-end border-bottom m-0 border-top m-0">
              {/* Linha clicável (Barrinha) */}
              <div
                className="row p-3 align-items-center m-0 text-center text-md-start"
                onClick={() => toggleComunicado(item.id)}
                style={{
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  backgroundColor: estaAberto ? '#f8f9fa' : '#fff'
                }}
              >
                {/* Nome - Ocupa linha inteira no mobile, alinha à esquerda no desktop */}
                <div className="col-12 col-md-4 fw-semibold mb-2 mb-md-0 text-start text-md-start">
                  {estaAberto ? '▽ ' : '▷ '} {item.nome}
                </div>

                {/* Data - Ocupa metade da linha no mobile */}
                <div className="col-6 col-md-3 text-muted mb-2 mb-md-0 text-start text-md-start">
                  <span className="d-md-none fw-bold text-dark">Data: </span>{item.data}
                </div>

                {/* Tipo - Ocupa metade da linha no mobile */}
                <div className="col-6 col-md-3 mb-2 mb-md-0 text-end text-md-start">
                  <span className="d-md-none fw-bold text-dark me-1">Tipo: </span>
                  <span className="badge bg-secondary">{item.tipo}</span>
                </div>

                {/* Status - Centralizado embaixo no mobile */}
                <div className="col-12 col-md-2 text-center text-md-start mt-2 mt-md-0">
                  <span className={`badge w-100 w-md-auto ${item.status === 'Pendente' ? 'bg-danger' : 'bg-success'}`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Caixa vazia que se expande */}
              {estaAberto && (
                <div className="p-4 bg-light border-top animate__animated animate__fadeIn">
                  <span style={{ fontWeight: "bold" }}>Detalhes do Comunicado:</span>
                  <p className="mb-0 text-secondary" style={{ whiteSpace: 'pre-line' }}>
                    {item.texto}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>

  )
}

export default Comunicados