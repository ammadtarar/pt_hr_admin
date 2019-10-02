import React from 'react';

class BarMontantEncaissement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: this.props.montant
    };
  }

  render() {
    var width = {
      width: (this.props.width + 5) + "%"
    }

    return (
      <div className="progress-bars">
        <div className="shell">
          <div className="montant"><p className="s-size">+{ this.state.progress }€ dans X jours</p></div>
          <div className="bar" style={ width }></div>
        </div>
      </div>
    )
  }
}

export default BarMontantEncaissement;
