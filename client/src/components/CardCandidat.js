import React from 'react'
import { date } from '../functions/Date.js'

function CardCandidat(props) {
  const data = props.data
  const dateToFormat = props.data.date

  const popup = (e,data) => {
    props.popup(data)
  }

  return (
    <div className="box-encart">
      <div className={`icon ${data.archive === true ? 'athens-gray': ''}`}>{data.prenom.charAt(0) + data.nom.charAt(0)}</div>
      <p className="nom">{data.prenom + ' ' + data.nom}</p>
      <p className="titre">{data.titre}</p>
      <p className="cooptes-par">{Object.keys(data.cooptations).length > 0 ? 'Coopté par' : ''}
        {Object.keys(data.cooptations).map((key, i) => {
          const nbrCooptes = Object.keys(data.cooptations).length
          const coopte = data.cooptations[key]
          return (
            <span className={i === 0 ? 'first' : ''}>{coopte.prenom + ' ' + coopte.nom}
              {nbrCooptes > 1 ? <span className={(i + 1) === nbrCooptes ? 'last comma' : 'comma'}>, </span> : ''}
            </span>
          )
        })}
      </p>
      {props.data.date ? <p className="date">Le {date(dateToFormat)}</p> : ''}
      <hr/>
      <p className="email"><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">{data.email}</a></p>
      {data.archive === false ? <div className="box-rejeter">
        <hr/>
        <img onClick={(e) => popup(e,data)} type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
      </div> : <br/>}
    </div>
  )
}

export default CardCandidat
