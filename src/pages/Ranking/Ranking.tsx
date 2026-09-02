import Podium from '../../components/podium/Podium'
import './Ranking.css'
import df from "../../assets/data-fake.json"

const players = df.users.map(user => ({
  photo: user.foto,
  nome: user.nome,
  pontos: user.pontuacao
}))

export const playersOrdenados = players.sort((a, b) => b.pontos - a.pontos)

const pessoas = [
  { photo: playersOrdenados[0].photo, nome: playersOrdenados[0].nome, pontos: playersOrdenados[0].pontos},
  { photo: playersOrdenados[1].photo, nome: playersOrdenados[1].nome, pontos: playersOrdenados[1].pontos},
  { photo: playersOrdenados[2].photo, nome: playersOrdenados[2].nome, pontos: playersOrdenados[2].pontos}
]

function Ranking() {

  return (
    <div id="content">
      <Podium 
        primeiro={pessoas[0]}
        segundo={pessoas[1]}
        terceiro={pessoas[2]}
      />

      <div id="classificacao">
        { playersOrdenados.map((p, index) => (
          <div className="player-card">
            <span>{ index + 1}</span>
            <img src={ p.photo } />
            <span>{ p.nome }</span>
            <span className="pontos-classificacao">{ p.pontos }</span>
        </div>
        )) }
      </div>
    </div>
  )
}

export default Ranking