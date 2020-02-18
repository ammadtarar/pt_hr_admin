import React from 'react'

export class BoxDemande extends React.Component {
  traiterDemande(e) {
    this.props.traiterDemande()
  }

  render() {
    return (
      <div className="box-demande">
        <ul className="titre">
          <li><h4>Shawn Black</h4></li>
          <li><p><span>Abonnement de 6 mois à Netflix</span></p></li>
        </ul>
        <ul className="infos">
          <li><button onClick={(e) => this.traiterDemande(e)} className="btn-primary">Traiter</button></li>
        </ul>
      </div>
    )
  }
}

export default BoxDemande;
