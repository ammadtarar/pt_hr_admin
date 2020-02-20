import React, { Suspense } from 'react'
import Header from '../components/Header'
const CardCommunication = React.lazy(() => import('../components/CardCommunication'))
const data = require('../datas.json')

export class Communication extends React.Component {
  state = {
    'data': data,
    'countActivesPosts': ''
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

    //Obtenir nombres de posts actifs
    const communication = this.state.data.communication
    const triCandidaturesRecues = Object.keys(communication).reduce((item, e) => {
      if ([true].includes(communication[e].checked)) item[e] = communication[e]
      return item
    }, {})

    this.setState({
      'countActivesPosts': Object.keys(triCandidaturesRecues).length
    })
  }

  render() {
    const count = this.state.countActivesPosts
    const communication = this.state.data.communication

    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <Header/>
        <main className="communication">
          <div className="container">
            <ul className="headline">
              <li><h3>Communication</h3></li>
              <li><p><span>{count}</span> contenus actifs</p></li>
            </ul>
            <div className="row-fluid">

              <Suspense fallback={<div className="text-center">Loading ...</div>}>

                {count > 0 ?
                <div className="large-3 columns">
                  <div className="box-note">
                    <p>Consultez et gérez les<br/> <span>contenus de marque<br/> employeur</span> visibles par vos<br/> <span>collaborateurs</span>.</p>
                    <p className="sub-note">Ils pourront les consulter et les partager auprès de leur réseau.</p>
                  </div>
                </div> : ''}

                {count > 0 ?
                  Object.keys(communication)
                    .sort((a, b) => {
                      return new Date(communication[a].publishedDate) < new Date(communication[b].publishedDate) ? 1 : (new Date(communication[a].publishedDate) > new Date(communication[b].publishedDate) ? -1 : 0)
                    })
                    .map((key, item, i) => {
                    return (
                      <div className="large-3 columns">
                        <CardCommunication data={communication[key]}/>
                      </div>
                    )
                  })
                  :
                  <div className="container empty">
                    <img type="image/svg+xml" className="icon" src="/icons/communication-b.svg" alt=""/>
                    <p className="text-center">Aucune communication disponible</p>
                    <p className="text-center">Il semblerait qu’il n’y ait pas de communication à afficher ici.</p>
                  </div>
                }
              </Suspense>

            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Communication
