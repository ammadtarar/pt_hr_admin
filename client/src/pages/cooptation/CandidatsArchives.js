import React, { useState, useEffect, Suspense } from 'react'
const CardCandidat = React.lazy(() => import('../../components/CardCandidat'))
const datas = require('../../datas.json')

function CandidatsArchives() {
  const [data, setData] = useState(datas.candidats)
  const candidats = data

  // async function getData() {
  //   const response = await fetch(datas.candidats)
  //   const data = await response.json()
  //   setData(data)
  // }
  //
  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <div className="wrapper">
      <div className="tab-candidats-archives container">
        <div className="row-fluid">

          <Suspense fallback={<div className="container-suspense"><p className="text-center">Loading ...</p></div>}>
            {Object.keys(candidats).length > 0 ?

              Object.keys(candidats)
                .sort((a, b) => {
                  return new Date(candidats[a].date) < new Date(candidats[b].date) ? 1 : (new Date(candidats[a].date) > new Date(candidats[b].date) ? -1 : 0)
                })
                .map((key) => (
                candidats[key].archive === true ?
                  <div key={candidats[key].id} className="columns large-3 medium-6">
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

export default CandidatsArchives
