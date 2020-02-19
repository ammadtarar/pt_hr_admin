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
              {Object.keys(candidats)
                .sort((a, b) => {
                  return new Date(candidats[a].date) < new Date(candidats[b].date) ? 1 : (new Date(candidats[a].date) > new Date(candidats[b].date) ? -1 : 0)
                })
                .map((key) => (
                candidats[key].archive === true ?
                  <div className="columns large-3">
                    <CardCandidat data={candidats[key]}/>
                  </div>
                : ''
              ))}
            </Suspense>

          </div>
        </div>
      </div>
    )
  }
}

export default CandidatsArchives
