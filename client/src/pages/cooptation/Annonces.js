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
            {Object.keys(annonces).length > 0 ?

              Object.keys(annonces)
                .sort((a, b) => {
                  return new Date(annonces[a].date) < new Date(annonces[b].date) ? 1 : (new Date(annonces[a].date) > new Date(annonces[b].date) ? -1 : 0)
                })
                .map((key, item, i) => {
                return (
                  <BoxAnnonce data={annonces[key]}/>
                )
              })
              :
              <div className="container empty">
                <img type="image/svg+xml" className="icon" src="/icons/annonces.svg" alt=""/>
                <p className="text-center">Aucune annonce disponible</p>
                <p className="text-center">Il semblerait qu’il n’y ait pas d’annonce à afficher ici.</p>
              </div>
            }
          </Suspense>
        </div>
      </div>
    )
  }
}

export default Annonces
