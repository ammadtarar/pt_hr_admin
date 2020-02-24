import React, { useState, userEffect, Suspense } from 'react'
const BoxAnnonce = React.lazy(() => import('../../components/BoxAnnonce'))
const datas = require('../../datas.json')

function Annonces(props) {
  const [data, setData] = useState(datas.annonces)
  const annonces = data

  // async function getData() {
  //   const response = await fetch(datas.candidats)
  //   const data = await response.json()
  //   setData(data)
  // }
  //
  // useEffect(() => {
  //   getData()
  // }, [])

  const dataToChange = (data,e) => {
    //Mises à jour des annoncesavec celle passée sur Actif/Inactif
    Object.keys(annonces).push(data)
    setData(annonces)
    //Puis data à renvoyer au serveur

  }

  return (
    <div className="wrapper">
      <div className="tab-annonces container">
        <Suspense fallback={<div className="container-suspense"><p className="text-center">Loading ...</p></div>}>
          {Object.keys(annonces).length > 0 ?

            Object.keys(annonces)
              .sort((a, b) => {
                return new Date(annonces[a].date) < new Date(annonces[b].date) ? 1 : (new Date(annonces[a].date) > new Date(annonces[b].date) ? -1 : 0)
              })
              .map((key, item, i) => {
              return (
                <BoxAnnonce key={annonces[key].id} data={annonces[key]} dataToChange={(e) => dataToChange(e)}/>
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

export default Annonces
