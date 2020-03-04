import React, { useState } from 'react'
import { date } from '../functions/Date.js'

function CardCandidat(props) {
  const [hover, setHover] = useState('')
  const data = props.data
  const dateToFormat = props.data.date

  const popup = (e,data) => {
    props.popup(data)
  }

  const rejeter = (e,data) => {
    props.rejeter(data)
  }

  return (
    <div className="box-encart" onMouseOver={(e) => setHover(data.id)} onMouseOut={(e) => setHover(false)}>
      <div className={`icon ${data.archive === true ? 'athens-gray': ''}`}>{data.prenom.charAt(0) + data.nom.charAt(0)}</div>
      <p className="nom">{data.prenom + ' ' + data.nom}</p>
      <p className="titre">{data.titre}</p>
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
        <img onClick={(e) => popup(e,data)} type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
        {hover === data.id ? <button onClick={(e) => rejeter(e,data)} className="btn-third">Rejeter la candidature</button> : ''}
      </div> : <br/>}
    </div>
  )
}

export default CardCandidat
