import React, { Suspense } from 'react'
const BoxRecompense = React.lazy(() => import('../../components/BoxRecompense'))
const data = require('../../datas.json')

export class Recompenses extends React.Component {
  state = {
    checked: false,
    popupOpen: false,
    data: data
  }
  
  handleChange(checked) {
    this.setState({ checked })
  }

  componentDidMount() {
    // fetch(data)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       'data': res
    //     })
    //   })
  }

  render() {
    const recompenses = this.state.data.recompenses

    return (
      <div className="wrapper">

        {/* Popup */}
        <div onClick={(e) => this.setState({popupOpen: false})} className={`overlay-popup ${this.state.popupOpen === true ? 'open' : ''}`}/>

        <div className={`popup ${this.state.popupOpen === true ? 'open' : ''}`}>
          <img onClick={(e) => this.setState({popupOpen: false})} type="image/svg+xml" className="close" src="/icons/fermer.svg" alt=""/>
          <h3>Créer une récompense</h3>
          <form>
            <label>Nom</label>
            <input type="text" value="Nom de la récompense"/>
            <label>Nombre de points</label>
            <input type="text" value="Nombre de points requis"/>
            <button className="btn-primary">Publier</button>
            <p className="note">Une fois publiée, cette récompense sera visible par tous les ambassadeurs.</p>
          </form>
        </div>
        {/* End popup */}

        <div className="tab-recompenses container">
          <button onClick={(e) => this.setState({popupOpen: true})} className="btn-primary">Créer</button>

          <Suspense fallback={<div className="text-center">Loading ...</div>}>
            {Object.keys(recompenses).map((key, item, i) => {
              return (
                <BoxRecompense data={recompenses[key]}/>
              )
            })}
          </Suspense>
        </div>
      </div>
    )
  }
}

export default Recompenses;
