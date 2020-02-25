import React from 'react'

function BoxDemande(props) {
  const data = props.data

  const popup = e => {
    props.popup(data)
  }

  return (
    <div className="box-demande">
      <ul className="titre">
        <li><h4>{}</h4></li>
        <li><p><span>{data.titre}</span></p></li>
      </ul>
      <ul className="infos">
        {data.traite === false ? <li><button onClick={(e) => popup(e)} className="btn-primary">Traiter</button></li>
      : <li className="check"><p>Traité</p></li>}
      </ul>
    </div>
  )
}

export default BoxDemande
