import React, { useState } from 'react'
import Switch from 'react-switch'

function CardCommunication (props) {
  const [checked , setChecked] = useState(props.data.is_active)
  const data = props.data
  const handleChange = e => {
    setChecked(!checked)
    props.dataToChange(data)
  }

  return (
    <div className="card-communication">
      <div>
        <div className="box-thumbnail" style={{backgroundImage: "url("+data.thumb_url+")" }}>
          <div className="box-views-small"><span>{data.view_count}</span></div>
        </div>
        <h4>{data.title}</h4>
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
          tabIndex={props.tab + 6}
        />
        {checked === true ? 'Actif' : 'Inactif'}</p>
      </div>
    </div>
  )
}

export default CardCommunication
