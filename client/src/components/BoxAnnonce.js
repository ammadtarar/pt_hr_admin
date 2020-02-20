import React, { useState, useEffect } from 'react'
import Switch from 'react-switch'
import { date } from '../functions/Date.js'

function BoxRecompense(props) {
    const [checked, setChecked] = useState(props.data.checked)
    const [data, setData] = useState(props.data)
    const dateToFormat = data.date

    const handleChange = (e) => {
      setChecked(!checked)
    }

    return (
      <div className="box-annonce">
        <ul className="titre">
          <li><h4>{data.titre}</h4></li>
          <li className="date"><p>Créé le <span>{date(dateToFormat)}</span></p></li>
        </ul>
        <ul className="details">
          <li>
            <p className="react-switch">
            <Switch
              checked={checked}
              onChange={(e) => handleChange(e)}
              onColor="#155ac4"
              offColor="#c0c9d6"
              onHandleColor="#ffffff"
              offHandleColor="#ffffff"
              activeBoxShadow="0 0 0 0 transparent"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={35}
              className="react-switch"
            />
            {checked === true ? 'Actif' : 'Inactif'}</p>
          </li>
          <li className="star"><p><span>{data.points}</span>€</p></li>
          <li className="localisation"><p>{data.lieu}</p></li>
        </ul>
        <ul className="infos">
          {checked === true ? <li className="box-candidats-cooptes"><span>{data.cooptations}</span> {data.cooptations === 1 ? 'candidat coopté' : 'candidats cooptés'}</li> : ''}
          <li className="box-views-small"><span>{data.views}</span></li>
        </ul>
      </div>
    )
  }

export default BoxRecompense
