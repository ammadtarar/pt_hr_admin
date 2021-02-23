import React from 'react'

function BoxDemande(props) {
  const data = props.data

  const popup = e => {
    props.popup(data)
  }

  return (
    <div className="box-demande">
      <ul className="titre">
        <li><h4>{data.employee ? (data.employee.first_name + ' ' + data.employee.last_name) : ''}</h4></li>
        <li><p><span>{data.reward ? data.reward.title : ''}</span></p></li>
      </ul>
      <ul className="infos">
        {data.status === "requested" ? <li><button onClick={(e) => popup(e)} className="btn-primary" tabIndex={props.tab + 9}><div>Traiter</div></button></li>
      : <li className="check"><p>Traîtée</p></li>}
      </ul>
    </div>
  )
}

export default BoxDemande
