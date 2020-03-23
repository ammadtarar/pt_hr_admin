import React, { useState } from 'react'
import { date } from '../functions/Date.js'

function CardCandidat(props) {
  const [hover, setHover] = useState('')
  const data = props.data
  const dateToFormat = props.data.date

  const popupArchive = (e,data) => {
    props.popupArchive(data)
  }

  return (
    <div className="box-encart" onMouseOver={(e) => setHover(data.id)} onMouseOut={(e) => setHover(false)}>
      <div className="row-fluid box-nom-titre">
        <div className="large-2 columns">
          <div className={`icon ${data.archive === true ? 'athens-gray': ''}`}>{data.prenom.charAt(0) + data.nom.charAt(0)}</div>
        </div>
        <div className="large-10 columns">
          <p className="nom">{data.prenom + ' ' + data.nom}</p>
          <p className="titre">{data.titre}</p>
        </div>
      </div>

      <p className="cooptes-par">Coopté par&nbsp;
        {Object.keys(data.cooptations).map((key, i) => {
          const nbrCooptes = Object.keys(data.cooptations).length
          const coopte = data.cooptations[key]
          return (
            <span>{coopte.prenom + ' ' + coopte.nom}
              {nbrCooptes > 1 ? <span className={(i + 1) === nbrCooptes ? 'last comma' : 'comma'}>, </span> : ''}
            </span>
          )
        })}
      </p>
      <p className="date">Le {date(dateToFormat)}</p>
      <hr/>
      <p className="email"><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">{data.email}</a></p>
      {data.archive === false ? <div className="box-rejeter">
        <hr/>
        <img onClick={(e) => popupArchive(e,data)} type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
        <button onClick={(e) => popupArchive(e,data)} className={`btn-third ${hover === data.id ? 'display' : ''}`}>Rejeter la candidature</button>
      </div> : <br/>}
    </div>
  )
}

export default CardCandidat
