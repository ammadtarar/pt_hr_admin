import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { compteDemandesRecompenses } from '../functions/CompteDemandes.js'
import { compteArticlesActifs, compteArticlesTotalViews } from '../functions/ComptesCommunication.js'
import { compteAnnoncesActives, compteAnnoncesTotalViews } from '../functions/ComptesCooptation.js'
import { Link } from 'react-router-dom'
const datas = require('../datas.json')

function Dashboard() {
  const [data, setData] = useState(datas)
  const [communication, setCommunication] = useState([])
  const [cooptation, setCooptation] = useState([])
  const [demandes, setDemandes] = useState([])

  const preventDragHandler = e => {
    e.preventDefault()
  }

  // async function getData() {
  //   const response = await fetch(url)
  //   // const data = await response.json()
  //   setData(data)
  // }
  //
  // useEffect(() => {
  //   getData()
  // }, [])

  useEffect(() => {
    setCommunication({
      actifs: compteArticlesActifs(data.communication),
      total: Object.keys(data.communication).length,
      totalViews: compteArticlesTotalViews(data.communication).toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
    })
    setCooptation({
      annoncesActives: compteAnnoncesActives(data.annonces),
      totalAnnonces: Object.keys(data.annonces).length,
      totalViewsAnnonces: compteAnnoncesTotalViews(data.annonces).toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ','),
      totalCandidats: Object.keys(data.candidats).length
    })
    setDemandes(compteDemandesRecompenses(datas.recompenses).length)
  }, [])

  return (
    <div className="wrapper" onDragStart={(e) => preventDragHandler(e)}>
      <Header/>
      <main className="dashboard">
        <div className="container">
          <div className="row-fluid">
            <h3>Tableau de bord</h3>
            <div className="columns">
              <div className="box-note">
                <p>Pilotez l’activité de <br/> votre <span>communauté<br/>  d’ambassadeurs</span></p>
              </div>
            </div>
            <div className="columns">
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
                  <p><span>XX</span></p>
                </div>
                <hr/>
                <div className="icon iceberg"><img src="/icons/recompenses.svg" alt=""/></div>
                <div className="box-text demandes-recompenses">
                  <p>Demandes de récompenses</p>
                  <p><span>{demandes}</span></p>
                </div>
                <Link to={{pathname: "/recompenses", checkedTab: 1}} className="btn-primary">Voir</Link>
              </div>
            </div>
            <div className="columns">
              <div className="box-item cooptation">
                <h4>Cooptation</h4>
                <Link to={{pathname: "/cooptation"}} className="btn-primary">Voir</Link>
                <div className="box-views">
                  {cooptation.totalViewsAnnonces ?
                  <div>
                    <p>{cooptation.totalViewsAnnonces}</p>
                    <p>visiteurs sur les annonces</p>
                  </div> : ''}
                </div>
                <div className="icon half-spanish-white"><img src="/icons/annonces-actives.svg" alt=""/></div>
                <div className="box-text">
                  <p>Annonces actives</p>
                  <p><span>{cooptation.annoncesActives}</span> /<span>{cooptation.totalAnnonces}</span></p>
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
                  <p><span>{cooptation.totalCandidats}</span></p>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="box-item communication">
                <h4>Communication</h4>
                <Link to={{pathname: "/communication"}} className="btn-primary">Voir</Link>
                {communication.totalViews ?
                <div className="box-views">
                  <div>
                    <p>{communication.totalViews}</p>
                    <p>visiteurs sur les contenus</p>
                  </div>
                </div> : ''}
                <div className="icon link-water"><img src="/icons/contenus-actifs.svg" alt=""/></div>
                <div className="box-text">
                  <p>Contenus actifs</p>
                  <p><span>{communication.actifs}</span> /<span>{communication.total}</span></p>
                </div>
              </div>
            </div>
            <div className="columns">
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
            <div className="columns"></div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
