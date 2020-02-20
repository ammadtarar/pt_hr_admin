import React, { Suspense } from 'react'
const BoxDemande = React.lazy(() => import('../../components/BoxDemande'))
const data = require('../../datas.json')

export class Demandes extends React.Component {
  state = { data: data, popupOpen: false }

  popup = (data) => {
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

        <div className={`wrapper-popup ${this.state.popupOpen === true ? 'open' : ''}`}>
          <div className={`popup center ${this.state.popupOpen === true ? 'open' : ''}`}>
            <h4 className="text-center">Etes-vous sûr de vouloir accepter la demande de récompenses de <span>Shawn Black</span> ?</h4>
            <p className="text-center">Cette action est irréversible et notifiera automatiquement le collaborateur.</p>
            <button className="btn-primary">Confirmer</button>
            <button onClick={(e) => this.setState({popupOpen: false})} className="btn-secondary">Annuler</button>
          </div>
        </div>
        {/* End popup */}

        <div className="tab-demandes container">
          <Suspense fallback={<div className="text-center">Loading ...</div>}>
            {Object.keys(demandes).length > 0 ?

                Object.keys(demandes).map((key, item, i) => {
                  return (
                    <BoxDemande data={demandes[key]} popup={this.popup}/>
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
