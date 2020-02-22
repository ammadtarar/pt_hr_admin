import React, { Suspense } from 'react'
import Header from '../components/Header'
import { compteArticlesActifs } from '../functions/ComptesCommunication.js'
const CardCommunication = React.lazy(() => import('../components/CardCommunication'))
const data = require('../datas.json')

export class Communication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'data': data.communication,
      'countActivesPosts': ''
    }
    this.dataToChange = this.dataToChange.bind(this)
  }

  preventDragHandler = (e) => {
    e.preventDefault()
  }

  dataToChange(data) {
    const communication = this.state.data

    Object.keys(communication).push(data) //Remplacer ancienne key par nouvelle key
    this.setState({data: communication})
    this.compterArticles(communication)
    //Puis objet à renvoyer au serveur

  }

  compterArticles(communication) {
    this.setState({
      'countActivesPosts': compteArticlesActifs(communication)
    })
  }

  componentDidMount() {
    // fetch(data)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       'data': res
    //     })
    //   })
    const communication = this.state.data
    this.compterArticles(communication)
  }

  render() {
    const count = this.state.countActivesPosts
    const communication = this.state.data

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
                <div className="large-3 medium-6 columns">
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
                      <div className="large-3 medium-6 columns">
                        <CardCommunication data={communication[key]} dataToChange={this.dataToChange}/>
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
