import { useState } from 'react';
import './QuizCard.css'
import { Button, Card, CloseButton, Col, Container, ProgressBar, Row } from 'react-bootstrap';

const perguntas = [
    {
        id: 1,
        perguntas: [
            {
                id: 1,
                enunciado: "Até quando deve ser assinado o novo termo aditivo da política de Home Office?",
                opcoes: ["Até sexta-feira", "Até segunda-feira", "Até o final do mês", "Não é necessário assinar"],
                correta: "Até sexta-feira"
            }
        ]
    },
    {
    id: 2,
    perguntas: [
        {
            id: 1,
            enunciado: "Por quanto tempo o sistema poderá ficar instável durante a manutenção preventiva?",
            opcoes: ["Até 15 minutos", "Até 30 minutos", "Até 1 hora", "Até 2 horas"],
            correta: "Até 30 minutos"
        },
        {
            id: 2,
            enunciado: "Qual será o horário da manutenção preventiva do sistema?",
            opcoes: ["22h", "23h", "00h", "01h"],
            correta: "22h"
        }
    ]
  }
]

interface QuizCardProps {
    id: number;
    onClose: () => void;
}

function QuizCard({ id, onClose }: QuizCardProps) {
    const [indicePergunta, setIndicePergunta] = useState(0);
    const [pontuacao, setPontuacao] = useState(0);
    const [mostrarResultado, setMostrarResultado] = useState(false);

    id = id-1   

    const responder = (opcaoSelecionada: any) => {
        if (opcaoSelecionada === perguntas[id].perguntas[indicePergunta].correta) {
        setPontuacao(pontuacao + 1);
        }

        const proximoIndice = indicePergunta + 1;
        if (proximoIndice < perguntas[id].perguntas.length) {
        setIndicePergunta(proximoIndice);
        } else {
        setMostrarResultado(true);
        }  
    }

    const reiniciarQuiz = () => {
        setIndicePergunta(0);
        setPontuacao(0);
        setMostrarResultado(false);
    };

    const progresso = ((indicePergunta) / perguntas[id].perguntas.length) * 100;

    return (
        // d-flex e min-vh-100 garantem o alinhamento vertical e horizontal na tela inteira
        <Container id="quiz-container" className="d-flex align-items-center justify-content-center min-vh-100">
            
            <Row className="w-100 justify-content-center">
                {/* Define larguras dinâmicas para diferentes tamanhos de tela */}
                <Col xs={12} sm={10} md={8} lg={6}>
                
                <Card className="shadow-lg border-0 rounded-4">
                    <CloseButton 
                        className="position-absolute top-0 end-0 m-3" 
                        onClick={onClose}
                        aria-label="Fechar quiz"
                    />
                    
                    <Card.Body id="quiz-body" className="p-4 p-md-5">
                    
                    {mostrarResultado ? (
                        <div className="text-center">
                        <h2 className="mb-4 fw-bold">Quiz Concluído! 🎉</h2>
                        <p className="fs-5">Você acertou <strong>{pontuacao}</strong> de <strong>{perguntas[id].perguntas.length}</strong> perguntas.</p>
                        <Button variant="primary" size="lg" className="mt-3 w-100 rounded-pill" onClick={reiniciarQuiz}>
                            Tentar Novamente
                        </Button>
                        </div>
                    ) : (
                        <div>
                            {/* Cabeçalho da Janela */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted fw-semibold">
                                Pergunta {indicePergunta + 1} de {perguntas[id].perguntas.length}
                                </span>
                                <span 
                                    id="pontuacao-badge"
                                    className="badge bg-primary px-3 py-2 rounded-pill">
                                    Pontos: {pontuacao}
                                </span>
                            </div>

                            {/* Barra de Progresso */}
                            <ProgressBar now={progresso} variant="success" className="mb-4" style={{ height: '8px' }} />

                            {/* Pergunta */}
                            <h3 className="fs-4 mb-4 fw-bold text-dark">
                                {perguntas[id].perguntas[indicePergunta].enunciado}
                            </h3>

                            {/* Opções de Resposta */}
                            <div className="d-flex flex-column gap-3">
                                {perguntas[id].perguntas[indicePergunta].opcoes.map((opcao, index) => (
                                <Button 
                                    key={index} 
                                    variant="outline-secondary" 
                                    size="lg"
                                    className="text-start py-3 px-4 border-2 rounded-3 option-btn"
                                    onClick={() => responder(opcao)}
                                >
                                    {opcao}
                                </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    </Card.Body>
                </Card>

                </Col>
            </Row>
        </Container>
    )
}

export default QuizCard