import React, { useState } from 'react'
import Switch from 'react-switch'

function BoxRecompense (props) {
  const [checked, setChecked] = useState(props.data.checked)
  const data = props.data

  const handleChange = e => {
    setChecked(!checked)
    data.checked = !checked
    props.dataToChange(data)
  }

  return (
    <div className="box-recompense">
      <ul className="titre">
        <li><h4>{data.titre}</h4></li>
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
      </ul>
      <ul className="infos">
        <li className="box-points"><span>{data.points}</span> points</li>
      </ul>
    </div>
  )
}

export default BoxRecompense
