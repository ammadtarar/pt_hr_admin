import React, { Suspense } from 'react'
const CardCandidat = React.lazy(() => import('../../components/CardCandidat'))
const data = require('../../datas.json')

export class CandidatsArchives extends React.Component {
  state = {
    data: data
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
      <div className="wrapper">
        <div className="tab-candidats-archives container">
          <div className="row-fluid">

            <Suspense fallback={<div className="text-center">Loading ...</div>}>
              {Object.keys(candidats).length > 0 ?

                Object.keys(candidats)
                  .sort((a, b) => {
                    return new Date(candidats[a].date) < new Date(candidats[b].date) ? 1 : (new Date(candidats[a].date) > new Date(candidats[b].date) ? -1 : 0)
                  })
                  .map((key) => (
                  candidats[key].archive === true ?
                    <div className="columns large-3 medium-6">
                      <CardCandidat data={candidats[key]}/>
                    </div>
                  : ''
                ))
              :
                <div className="container empty">
                  <img type="image/svg+xml" className="icon" src="/icons/archives.svg" alt=""/>
                  <p className="text-center">Aucun candidat archivé</p>
                  <p className="text-center">Vous n’avez pas encore archivé de candidat.</p>
                </div>
              }
            </Suspense>

          </div>
        </div>
      </div>
    )
  }
}

export default CandidatsArchives
