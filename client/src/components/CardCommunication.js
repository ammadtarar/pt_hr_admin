import React, { useState } from 'react'
import Switch from 'react-switch'

function CardCommunication (props) {
  const [checked, setChecked] = useState(props.data.checked)
  const data = props.data

  const handleChange = e => {
    setChecked(!checked)
    data.checked = !checked
    props.dataToChange(data)
  }

  console.log(data.file.url)

  return (
    <div className="card-communication">
      <div>
        <div className="box-thumbnail" style={{backgroundImage: "url("+data.file.url+")" }}>
          <div className="box-views-small"><span>{data.views}</span></div>
        </div>
        <h4>{data.titre}</h4>
        <p className="react-switch">
        <Switch
          checked={checked}
          onChange={(e) => handleChange(e)}
          onColor="#155ac4"
          offColor="#c0c9d6"
          onHandleColor="#ffffff"
          offHandleColor="#ffffff"
          activeBoxShadow="0 0 0 0 transparent"
          handleDiameter={16}
          uncheckedIcon={false}
          checkedIcon={false}
          height={20}
          width={35}
          className="react-switch"
        />
        {checked === true ? 'Actif' : 'Inactif'}</p>
      </div>
    </div>
  )
}

export default CardCommunication
