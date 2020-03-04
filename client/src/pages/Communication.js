import React, { useState, useEffect, Suspense } from 'react'
import Header from '../components/Header'
import { compteArticlesActifs } from '../functions/ComptesCommunication.js'
const CardCommunication = React.lazy(() => import('../components/CardCommunication'))
const datas = require('../datas.json')

function Communication() {
  const [data, setData] = useState([])
  const [countActivesPosts, setCountActivesPosts] = useState('')
  const communication = data

  const preventDragHandler = e => {
    e.preventDefault()
  }

  const dataToChange = data => {
    Object.keys(communication).push(data) //Ajouter nouvelle data aux anciennes data
    setData(communication)
    compterArticles(communication)
    //Puis objet à renvoyer au serveur

  }

  const compterArticles = communication => {
    setCountActivesPosts(compteArticlesActifs(communication))
  }

  // async function getData() {
  //   const response = await fetch(url)
  //   // const data = await response.json()
  //   setData(data)
  // }
  //
  useEffect(() => {
    // getData()
    setData(datas.communication)
    compterArticles(datas.communication)
  }, [])


  return (
    <div className="wrapper" onDragStart={(e) => preventDragHandler(e)}>
      <Header/>
      <main className="communication">
        <div className="container">
          <ul className="headline">
            <li><h3>Communication</h3></li>
            <li><p><span>{countActivesPosts}</span> contenus actifs</p></li>
          </ul>
          <div className="row-fluid">

            <Suspense fallback={
              <div className="container-suspense">
                <div className="loader" id="loader">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>}>

              {Object.keys(communication).length > 0 ?
              <div className="large-3 medium-6 columns">
                <div className="box-note">
                  <p>Consultez et gérez les<br/> <span>contenus de marque<br/> employeur</span> visibles par vos<br/> <span>collaborateurs</span>.</p>
                  <p className="sub-note">Ils pourront les consulter et les partager auprès de leur réseau.</p>
                </div>
              </div> : ''}

              {Object.keys(communication).length > 0 ?
                Object.keys(communication)
                  .sort((a, b) => {
                    return new Date(communication[a].publishedDate) < new Date(communication[b].publishedDate) ? 1 : (new Date(communication[a].publishedDate) > new Date(communication[b].publishedDate) ? -1 : 0)
                  })
                  .map((key, item, i) => {
                  return (
                    <div key={communication[key].id} className="large-3 medium-6 columns">
                      <CardCommunication data={communication[key]} dataToChange={(e) => dataToChange()}/>
                    </div>
                  )
                })
                :
                Object.keys(communication).length === 0 ?
                setTimeout(() => {
                  return (
                    <div className="container empty">
                      <img type="image/svg+xml" className="icon" src="/icons/communication-b.svg" alt=""/>
                      <p className="text-center">Aucune communication disponible</p>
                      <p className="text-center">Il semblerait qu’il n’y ait pas de communication à afficher ici.</p>
                    </div>
                  )
                }, 500) : ''
              }
            </Suspense>

          </div>
        </div>
      </main>
    </div>
  )
}

export default Communication
