import React from 'react'
import Header from '../components/Header'
import { compteArticlesActifs, compteArticlesTotalViews } from '../functions/ComptesCommunication.js'
import { compteAnnoncesActives, compteAnnoncesTotalViews } from '../functions/ComptesCooptation.js'
const data = require('../datas.json')

export class Dashboard extends React.Component {
  state = {
    data: data,
    comptesCommuncation: [],
    comptesCooptation: []
  }

  preventDragHandler = (e) => {
    e.preventDefault()
  }

  componentDidMount() {
    // fetch(data)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       data: data
    //     })
    //   })
    this.setState({
      comptesCommuncation: {
        actifs: compteArticlesActifs(data.communication),
        total: Object.keys(data.communication).length,
        totalViews: compteArticlesTotalViews(data.communication).toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
      },
      comptesCooptation: {
        annoncesActives: compteAnnoncesActives(data.annonces),
        totalAnnonces: Object.keys(data.annonces).length,
        totalViewsAnnonces: compteAnnoncesTotalViews(data.annonces).toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ','),
        totalCandidats: Object.keys(data.candidats).length
      }
    })
  }

  render() {
    const comptesCommuncation = this.state.comptesCommuncation
    const comptesCooptation = this.state.comptesCooptation

    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <Header/>
        <main className="dashboard">
          <div className="container">
            <div className="row-fluid">
              <h3>Tableau de bord</h3>
              <div className="large-4 columns">
                <div className="box-note">
                  <p>Pilotez l’activité de <br/> votre <span>communauté<br/>  d’ambassadeurs</span></p>
                </div>
                <div className="box-item">
                  <h4>Engagement des ambassadeurs</h4>
                  <div className="icon iceberg"><img src="/icons/ambassadeurs.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Ambassadeurs actifs</p>
                    <p><span>XX</span> /<span>XXX</span></p>
                  </div>
                  <hr/>
                  <div className="icon iceberg"><img src="/icons/points.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Points gagnés par les ambassadeurs</p>
                    <p><span>XX.XXX</span></p>
                  </div>
                  <hr/>
                  <div className="icon iceberg"><img src="/icons/recompenses.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Demandes de récompenses</p>
                    <p><span>X</span></p>
                    <button onClick={(e) => this.props.history.push('/recompenses')} className="btn-primary">Voir</button>
                  </div>
                </div>
              </div>
              <div className="large-4 columns">
                <div className="box-item cooptation">
                  <h4>Cooptation</h4>
                  <button onClick={(e) => this.props.history.push('/cooptation')} className="btn-primary">Voir</button>
                  <div className="box-views">
                    {comptesCooptation.totalViewsAnnonces ?
                    <div>
                      <p>{comptesCooptation.totalViewsAnnonces}</p>
                      <p>visiteurs sur les annonces</p>
                    </div> : ''}
                  </div>
                  <div className="icon half-spanish-white"><img src="/icons/annonces-actives.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Annonces actives</p>
                    <p><span>{comptesCooptation.annoncesActives}</span> /<span>{comptesCooptation.totalAnnonces}</span></p>
                  </div>
                  <hr/>
                  <div className="icon half-spanish-white"><img src="/icons/nouveaux-candidats.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Candidats cooptés</p>
                    <p><span>XX</span></p>
                  </div>
                  <hr/>
                  <div className="icon half-spanish-white"><img src="/icons/profils-identifies.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Profils identifiés</p>
                    <p><span>{comptesCooptation.totalCandidats}</span></p>
                  </div>
                </div>
              </div>
              <div className="large-4 columns">
                <div className="box-item communication">
                  <h4>Communication</h4>
                  <button onClick={(e) => this.props.history.push('/communication')} className="btn-primary">Voir</button>
                  {comptesCommuncation.totalViews ?
                  <div className="box-views">
                    <div>
                      <p>{comptesCommuncation.totalViews}</p>
                      <p>visiteurs sur les contenus</p>
                    </div>
                  </div> : ''}
                  <div className="icon link-water"><img src="/icons/contenus-actifs.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Contenus actifs</p>
                    <p><span>{comptesCommuncation.actifs}</span> /<span>{comptesCommuncation.total}</span></p>
                  </div>
                </div>
                <div className="box-item communication">
                  <h4>Micro-formation</h4>
                  <div className="icon iron"><img src="/icons/micro-formation.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Micro-formations disponibles</p>
                    <p><span>X</span></p>
                  </div>
                  <hr/>
                  <div className="icon iron"><img src="/icons/score.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Taux moyen de bonne réponse</p>
                    <p><span>XX%</span></p>
                  </div>
                </div>
              </div>
              <div className="large-4 columns"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Dashboard;
