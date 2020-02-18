import React from 'react'

import BoxCandidat from '../../components/BoxCandidat'
const data = require('../../datas.json')

export class Candidats extends React.Component {
  state = {
    'data': data
  }


  render() {
    const data = this.state.data.candidats[0]

    return (
      <div className="wrapper">

        <main className="cooptation candidats">
          <div className="container">

            <input type="text" name="search" className="search" value="Rechercher" />
            <div className="row-fluid">
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="light">Candidats cooptés</h4>
                  <div className="container-scroll">
                    <BoxCandidat data={data}/>
                    <BoxCandidat data={data}/>
                  </div>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="light">Candidatures reçues</h4>
                  <div className="container-scroll">
                    <BoxCandidat data={data}/>
                    <BoxCandidat data={data}/>
                    <BoxCandidat data={data}/>
                    <BoxCandidat data={data}/>
                  </div>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="light">Entretiens en cours</h4>
                  <div className="container-scroll">
                    <BoxCandidat data={data}/>
                    <BoxCandidat data={data}/>
                  </div>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item denim">
                  <h4 className="light">Candidats sélectionnés</h4>
                  <div className="container-scroll">
                    <BoxCandidat data={data}/>
                    <BoxCandidat data={data}/>
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
