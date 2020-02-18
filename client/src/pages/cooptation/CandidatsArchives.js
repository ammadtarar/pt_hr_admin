import React, { Suspense } from 'react'
import Header from '../../components/Header'
import NavCooptation from '../../components/NavCooptation'
const BoxCandidat = React.lazy(() => import('../../components/BoxCandidat'))
const data = require('../../datas.json')

export class CandidatsArchives extends React.Component {
  constructor() {
    super()
    this.state = {
      data: data
    }
  }

  preventDragHandler = (e) => {
    e.preventDefault()
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
    const candidats = this.state.data.candidats

    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <Header/>
        <main className="cooptation canditas-archives">
          <div className="container">
            <NavCooptation/>
            <div className="row-fluid">

              <Suspense fallback={<div className="text-center">Loading ...</div>}>
                {Object.keys(candidats).map((key, item, i) => {
                  if (candidats[key].archive === true) {
                    return (
                      <div className="columns large-3">
                        <BoxCandidat data={candidats[key]}/>
                      </div>
                    )
                  }
                })}
              </Suspense>

            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default CandidatsArchives;
