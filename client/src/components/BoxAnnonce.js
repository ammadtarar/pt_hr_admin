import React, { useState } from 'react'
import Switch from 'react-switch'
import { date } from '../functions/Date.js'

function BoxRecompense(props) {
  const [checked, setChecked] = useState(props.data.is_active)
  const data = props.data
  console.log("INSIDE BOX_ANNOUNCE");
  console.log(props);
  const dateToFormat = data.createdAt

  const handleChange = e => {
    setChecked(!checked)
    data.checked = !checked
    props.dataToChange(data)
  }

  return (
    <div className="box-annonce">
      <ul className="titre">
        <li><h4>{data.title}</h4></li>
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
            activeBoxShadow="0px 0px 0px 3px rgba(192, 201, 214,.7)"
            handleDiameter={16}
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={35}
            className="react-switch"
            tabIndex={props.tab + 9}
          />
          {checked === true ? 'Actif' : 'Inactif'}</p>
        </li>
        <li className="star"><p><span>{data.referral_success_reward_value}</span>{data.referral_success_reward_type === 'cash' ? ' €' : data.referral_success_reward_type === 'points' ? ' points' : ''}</p></li>
        <li className="localisation"><p>{data.location}</p></li>
      </ul>
      <ul className="infos">
        {checked === true ? <li className="box-candidats-cooptes"><span>{data.referrals.length}</span> {data.referrals.length === 1 ? 'candidat coopté' : 'candidats cooptés'}</li> : ''}
        <li className="box-views-small"><span>{data.view_count}</span></li>
      </ul>
    </div>
  )
}

export default BoxRecompense
