import React, { Suspense } from 'react'
const BoxAnnonce = React.lazy(() => import('../../components/BoxAnnonce'))
const data = require('../../datas.json')

export class Annonces extends React.Component {
  state = {
    'data': data
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
    const annonces = this.state.data.annonces

    return (
      <div className="wrapper">
        <div className="tab-annonces container">
          <Suspense fallback={<div className="text-center">Loading ...</div>}>
            {Object.keys(annonces).map((key, item, i) => {
              return (
                <BoxAnnonce data={annonces[key]}/>
              )
            })}
          </Suspense>
        </div>
      </div>
    )
  }
}

export default Annonces;
