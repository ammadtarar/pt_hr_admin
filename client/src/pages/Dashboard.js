import React from 'react'
import Header from '../components/Header'

export class Dashboard extends React.Component {
  componentDidMount() {
  }

  preventDragHandler = (e) => {
    e.preventDefault()
  }

  render() {
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
                    <p><span>89</span> /<span>123</span></p>
                  </div>
                  <hr/>
                  <div className="icon iceberg"><img src="/icons/points.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Points gagnés par les ambassadeurs</p>
                    <p><span>56,890</span></p>
                  </div>
                  <hr/>
                  <div className="icon iceberg"><img src="/icons/recompenses.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Demandes de récompenses</p>
                    <p><span>3</span></p>
                    <button className="btn-primary">Voir</button>
                  </div>
                </div>
              </div>
              <div className="large-4 columns">
                <div className="box-item cooptation">
                  <h4>Cooptation</h4>
                  <button className="btn-primary">Voir</button>
                  <div className="box-views">
                    <div>
                      <p>2,986</p>
                      <p>visiteurs sur les annonces</p>
                    </div>
                  </div>
                  <div className="icon half-spanish-white"><img src="/icons/annonces-actives.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Annonces actives</p>
                    <p><span>6</span> /<span>15</span></p>
                  </div>
                  <hr/>
                  <div className="icon half-spanish-white"><img src="/icons/nouveaux-candidats.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Candidats cooptés</p>
                    <p><span>23</span></p>
                  </div>
                  <hr/>
                  <div className="icon half-spanish-white"><img src="/icons/profils-identifies.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Porfils identifiés</p>
                    <p><span>126</span></p>
                  </div>
                </div>
              </div>
              <div className="large-4 columns">
                <div className="box-item communication">
                  <h4>Communication</h4>
                  <button className="btn-primary">Voir</button>
                  <div className="box-views">
                    <div>
                      <p>8,908</p>
                      <p>visiteurs sur les annonces</p>
                    </div>
                  </div>
                  <div className="icon link-water"><img src="/icons/contenus-actifs.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Contenus actifs</p>
                    <p><span>6</span> /<span>78</span></p>
                  </div>
                </div>
                <div className="box-item communication">
                  <h4>Micro-formation</h4>
                  <div className="icon iron"><img src="/icons/micro-formation.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Micro-formations disponibles</p>
                    <p><span>7</span></p>
                  </div>
                  <hr/>
                  <div className="icon iron"><img src="/icons/score.svg" alt=""/></div>
                  <div className="box-text">
                    <p>Taux moyen de bonne réponse</p>
                    <p><span>78%</span></p>
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
