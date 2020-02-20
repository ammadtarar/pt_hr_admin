import React from 'react'
import { date } from '../functions/Date.js'

function CardCandidat(props) {
  const data = props.data
  const dateToFormat = props.data.date

  const archiverCandidat = (e,nom) => {
    props.archiverCandidat(nom)
  }

  const nom = data.prenom + ' ' + data.nom

  return (
    <div className="box-encart">
      <div className={`icon ${data.archive === true ? 'athens-gray': ''}`}>{data.prenom.charAt(0) + data.nom.charAt(0)}</div>
      <p>{data.prenom + ' ' + data.nom}</p>
      <p>{data.titre}</p>
      <p>Coopté par <span>Samantha Leigh</span></p>
      <p className="date">Le {date(dateToFormat)}</p>
      <hr/>
      <p className="email"><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">{data.email}</a></p>
      {data.archive === false ? <div className="box-rejeter">
        <hr/>
        <img onClick={(e) => archiverCandidat(e,nom)} type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
      </div> : <br/>}
    </div>
  )
}

export default CardCandidat
