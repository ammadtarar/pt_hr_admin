import React, { useState } from "react";
import Switch from "react-switch";

function CardCommunication(props) {
  const [checked, setChecked] = useState(props.data.is_active);
  const data = props.data;
  const handleChange = (e) => {
    setChecked(!checked);
    props.dataToChange(data);
  };

  return (
    <div className="card-communication">
      <div>
        <div
          className="box-thumbnail"
          // style={{ backgroundImage: "url(" + data.thumb_url + ")" }}
        >
          <img
            style={{resizeMode: 'contain'}}
            className="box-thumbnail"
            src={data.thumb_url}
            alt=''
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/png;base64,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';
            }}
          />
          <div className="box-views-small">
            <span>{data.view_count}</span>
          </div>
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
          {checked === true ? "Actif" : "Inactif"}
        </p>
      </div>
    </div>
  );
}

export default CardCommunication;
