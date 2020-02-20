import React, { Suspense } from 'react'
const BoxDemande = React.lazy(() => import('../../components/BoxDemande'))
const data = require('../../datas.json')

export class Demandes extends React.Component {
  state = { data: data, popupOpen: false }

  traiterDemande = () => {
    this.setState({
      popupOpen: true
    })
  }

  render() {
    const demandes = this.state.data.annonces

    return (
      <div className="wrapper">

        {/* Popup */}
        <div onClick={(e) => this.setState({popupOpen: false})} className={`overlay-popup ${this.state.popupOpen === true ? 'open' : ''}`}/>

        <div className={`popup center ${this.state.popupOpen === true ? 'open' : ''}`}>
          <h4 className="text-center">Etes-vous sûr de vouloir changer le statut de candidature de <span>Debra Mccoy</span> de <span>Entretiens en cours</span> à <span>Sélectionné</span>, pour l’offre de <span>Customer success manager</span> ?</h4>
          <p className="text-center">Cette action est irréversible et notifiera automatiquement le collaborateur l’ayant coopté.</p>
          <div className="box-note-popup">
            <p><strong>Conseil </strong><br/>Pensez à archiver les candidats non sélectionnés pour cette offre !</p>
          </div>
          <button className="btn-primary">Oui, changer</button>
          <button onClick={(e) => this.setState({popupOpen: false})} className="btn-secondary">Annuler</button>
        </div>
       {/* End popup */}

        <div className="tab-demandes container">
          <Suspense fallback={<div className="text-center">Loading ...</div>}>
            {Object.keys(demandes).length > 0 ?

                Object.keys(demandes).map((key, item, i) => {
                  return (
                    <BoxDemande data={demandes[key]} traiterDemande={this.traiterDemande}/>
                  )
                })
              :
              <div className="container empty">
                <img type="image/svg+xml" className="icon" src="/icons/demandes.svg" alt=""/>
                <p className="text-center">Aucune demande en attente</p>
                <p className="text-center">Il semblerait qu’il n’y ait pas de demande de récompense en attente.</p>
              </div>
            }
          </Suspense>
        </div>
      </div>
    )
  }
}

export default Demandes
