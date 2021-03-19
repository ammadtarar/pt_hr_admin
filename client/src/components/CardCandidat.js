import React, { useState } from 'react'
import { date } from '../functions/Date.js'

function CardCandidat(props) {
  const [hover, setHover] = useState('')
  const data = props.data
  const dateToFormat = props.data.createdAt

  const popupArchive = (e,data) => {
    props.popupArchive(data)
  }

  return (
    <div className="box-encart" onMouseOver={(e) => setHover(data.id)} onMouseOut={(e) => setHover(false)}>
      <div className="row-fluid box-nom-titre">
        <div className="large-2 columns">
          <div className={`icon ${data.archive === true ? 'athens-gray': ''}`}>{data.candidate ? (data.candidate.first_name.charAt(0) + data.candidate.last_name.charAt(0)) : '' }</div>
        </div>
        <div className="large-10 columns">
          <p className="nom">{data.candidate ? (data.candidate.first_name + ' ' + data.candidate.last_name) : ''}</p>
          <p className="titre">{data.job ? data.job.title : ''}</p>
        </div>
      </div>

      <p className="cooptes-par">Coopté par&nbsp;
            <span>{data.employee ? (data.employee.first_name + ' ' + data.employee.last_name) : ''}</span>
      </p>
      <p className="date">Le {date(dateToFormat)}</p>
      <hr/>

      
      <p className="email"><a href={`mailto:${data.candidate.email}`} rel="noopener noreferrer" title="">{data.candidate ? (data.candidate.email) : ''}</a></p>
      {data.archive === false ? <div className="box-rejeter">
        <hr/>
        <img onClick={(e) => popupArchive(e,data)} type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
        <button onClick={(e) => popupArchive(e,data)} className={`btn-third ${hover === data.id ? 'display' : ''}`}>Rejeter la candidature</button>
      </div> : <br/>}
    </div>
  )
}

export default CardCandidat
