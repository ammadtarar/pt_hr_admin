import React, { useState } from 'react'

function BoxDemande(props) {
  const popup = (e) => {
    props.popup()
  }

  return (
    <div className="box-demande">
      <ul className="titre">
        <li><h4>Shawn Black</h4></li>
        <li><p><span>Abonnement de 6 mois à Netflix</span></p></li>
      </ul>
      <ul className="infos">
        <li><button onClick={(e) => popup(e)} className="btn-primary">Traiter</button></li>
      </ul>
    </div>
  )
}

export default BoxDemande
