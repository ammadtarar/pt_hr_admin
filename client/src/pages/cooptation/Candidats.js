import React from 'react'
import Header from '../../components/Header'
import NavCooptation from '../../components/NavCooptation'
import BoxCandidat from '../../components/BoxCandidat'

export class Candidats extends React.Component {
  componentDidMount() {
  }

  preventDragHandler = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <Header/>
        <main className="cooptation candidats">
          <div className="container">
            <NavCooptation/>
            <input type="text" name="search" className="search" value="Rechercher" />
            <div className="row-fluid">
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="light">Candidats cooptés</h4>
                  <div className="container-scroll">
                    <BoxCandidat/>
                    <BoxCandidat/>
                  </div>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="light">Candidatures reçues</h4>
                  <div className="container-scroll">
                    <BoxCandidat/>
                    <BoxCandidat/>
                    <BoxCandidat/>
                    <BoxCandidat/>
                  </div>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="light">Entretiens en cours</h4>
                  <div className="container-scroll">
                    <BoxCandidat/>
                    <BoxCandidat/>
                  </div>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item denim">
                  <h4 className="light">Candidats sélectionnés</h4>
                  <div className="container-scroll">
                    <BoxCandidat/>
                    <BoxCandidat/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Candidats;
