import React from 'react';

class ProgressBarPaiement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: this.props.joursRestantsPaiement,
      delaiPaiement: this.props.delaiPaiement,
      status: this.props.statuts
    };
  }

  render() {

    const joursEcoulement = this.state.progress - this.state.delaiPaiement;
    let barre;
    let jours;
    let progress;

    if (joursEcoulement < 0) {
      barre = 'bar'
      jours = Math.abs(joursEcoulement) + ' jours restants'
      progress = {width: (this.state.progress * 2.22222222222) + "%"}
    } else if (joursEcoulement === 0) {
      barre = 'bar'
      jours = '0 jours restants'
      progress = {width: (this.state.progress * 2.22222222222) + "%"}
    } else if (joursEcoulement > 0) {
      barre = 'bar impayée'
      jours = joursEcoulement + ' jours de retard'
      progress = {width: 105 + "%"}
    }

    return (
      <div className="progress-bars">
        <div className="shell">
          <div className="percent"><p className="lynch">{jours}</p></div>
          <div className={barre} style={progress}></div>
        </div>
      </div>
    )
  }
}

export default ProgressBarPaiement;
