import React from 'react'

function CardCandidat(props) {
  const data = props.data
  const dateToFormat = props.data.date

  const date = (dateToFormat) => {
    const date = new Date(dateToFormat)
    date.setDate(date.getDate())
    const mois = [
      "janvier", "février", "mars",
      "avril", "mai", "juin", "jullet",
      "août", "septembre", "octobre",
      "novembre", "décembre"
    ]
    const dateReformat = date.getDate() + ' ' + mois[date.getMonth()] + ' ' + date.getFullYear()
    return dateReformat
  }

  return (
    <div>
      <div className="icon">{data.prenom.charAt(0) + data.nom.charAt(0)}</div>
      <p>{data.prenom + ' ' + data.nom}</p>
      <p>{data.titre}</p>
      <p>Coopté par <span>Samantha Leigh</span></p>
      <p className="date">Le {date(dateToFormat)}</p>
      <hr/>
      <p className="email"><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">{data.email}</a></p>
      {data.archive === false ? <div>
        <hr/>
        <img type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
      </div> : <br/>}
    </div>
  )
}

export default CardCandidat
