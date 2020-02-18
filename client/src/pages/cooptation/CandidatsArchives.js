import React, { Suspense } from 'react'
const CardCandidat = React.lazy(() => import('../../components/CardCandidat'))
const data = require('../../datas.json')

export class CandidatsArchives extends React.Component {
  constructor() {
    super()
    this.state = {
      data: data
    }
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
              {Object.keys(candidats).map((key) => {
                if (candidats[key].archive === true) {
                  return (
                    <div className="columns large-3">
                      <CardCandidat data={candidats[key]}/>
                    </div>
                  )
                }
              })}
          </Suspense>
          </div>

        </div>
      </div>
    )
  }
}

export default CandidatsArchives
