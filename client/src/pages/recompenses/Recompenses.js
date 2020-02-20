import React, { Suspense } from 'react'
const BoxRecompense = React.lazy(() => import('../../components/BoxRecompense'))
const data = require('../../datas.json')

export class Recompenses extends React.Component {
  state = {
    checked: false,
    popupOpen: false,
    creerRecompense: {
      nom: '',
      points: '',
      checked: false
    },
    errors: {
      nom: '',
      points: ''
    },
    data: data
  }

  handleChange(checked) {
    this.setState({ checked })
  }

  handleChangeText (e,field) {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value

    const numeric = /^[0-9\b]+$/

    this.setState((prevState) => ({
      ...prevState,
        creerRecompense: {
          ...prevState.creerRecompense,
          [name]: value
        }
      }
    ))
  }

  publierRecompense = (e) => {
    e.preventDefault()

    switch (true) {
        case this.state.creerRecompense.nom === '' && this.state.creerRecompense.points === '':
            this.setState({
              errors: {nom: 'error', points: 'error'}
            })
            break
        case this.state.creerRecompense.nom === '':
            this.setState({
              errors: {nom: 'error'}
            })
            break
        case this.state.creerRecompense.points === '':
            this.setState({
              errors: {points: 'error'}
            })
            break
        default:
            this.setState({ popupOpen: false })
            // La nouvelle recompense est dans le state
            console.log(this.state.creerRecompense)
            // Puis vidage du state
            this.setState({
              creerRecompense: {
                nom: '',
                points: '',
                checked: false
              }
            })
    }
  }
  dataToChange(data) {
    //Data à renvoyer au serveur
    console.log(data)
    //Puis refresh du component
    // this.componentDidMount()
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
          <form onSubmit={this.publierRecompense}>
            <label>Nom</label>
            <input type="text" name="nom" className={this.state.errors.nom} onChange={(e) => this.handleChangeText(e)} value={this.state.creerRecompense.nom} placeholder="Nom de la récompense"/>
            <label>Nombre de points</label>
            <input type="number" name="points" className={this.state.errors.points} onChange={(e) => {const field = 'number'; this.handleChangeText(e,field)}} value={this.state.creerRecompense.points} placeholder="Nombre de points requis"/>
            <button className="btn-primary">Publier</button>
            <p className="note">Une fois publiée, cette récompense sera visible par tous les ambassadeurs.</p>
          </form>
        </div>
        {/* End popup */}

        <div className="tab-recompenses container">
          <div className="container">
            <div className="row-fluid">
              <div className="large-11 columns"></div>
              <div className="large-1 columns">
                <button onClick={(e) => this.setState({popupOpen: true})} className="btn-primary">Créer</button>
              </div>
            </div>
          </div>

          <Suspense fallback={<div className="text-center">Loading ...</div>}>
            {Object.keys(recompenses).length > 0 ?

                Object.keys(recompenses).map((key, item, i) => {
                  return (
                    <BoxRecompense data={recompenses[key]} dataToChange={this.dataToChange}/>
                  )
                })
              :
              <div className="container empty">
                <img type="image/svg+xml" className="icon" src="/icons/recompense.svg" alt=""/>
                <p className="text-center">Créez votre première récompense !</p>
                <p className="text-center">Vous pouvez dès à présent créer votre première récompense en cliquant sur le bouton “Créer” en haut à droite.</p>
              </div>
            }
          </Suspense>
        </div>
      </div>
    )
  }
}

export default Recompenses;
