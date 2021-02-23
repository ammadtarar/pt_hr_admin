import { HTTP, URLS } from "../network/http";
import React, { useState, useEffect, Suspense } from 'react'
import Header from '../components/Header'
const CardCommunication = React.lazy(() => import('../components/CardCommunication'))


function Communication() {
  const [data, setData] = useState([])
  const [countActivesPosts] = useState('')
  const communication = data

  const preventDragHandler = e => {
    e.preventDefault()
  }

  const dataToChange = item => {
    HTTP.patch(URLS.ARTICLE.BY_ID.replace(":id" , item.id) , {
      is_active : !item.is_active
    })
    .then((response) => {
      getArticles();
    })
    .catch((err) => {
      console.log("JOBS ERROR");
      console.log(err);
    });
  }

  async function getArticles() {
    HTTP.get(`${URLS.ARTICLE.LIST_ALL}`)
    .then((response) => {
      setData(response.data.rows)
    })
    .catch((err) => {
      console.log("JOBS ERROR");
      console.log(err);
    });
  };

  useEffect(() => {
      getArticles();
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
                  <p>Gérez les <span>contenus de communication</span> à destination de vos <span>ambassadeurs</span>.</p>
                  <p className="sub-note">Ils pourront les consulter et les partager sur leurs réseaux sociaux</p>
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
                      <CardCommunication data={communication[key]} tab={item} dataToChange={(e) => dataToChange(e)}/>
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
