import React, { useState, useEffect, Suspense } from 'react'
import { compteDemandesRecompenses } from '../../functions/CompteDemandes.js'
const BoxDemande = React.lazy(() => import('../../components/BoxDemande'))
const datas = require('../../datas.json')

function Demandes(props) {
  const [recompenses, setRecompenses] = useState([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupData, setPopupData] = useState([])
  const demandes = recompenses

  const popup = (data,e) => {
    setPopupOpen(true)
    setPopupData(data)
  }

  // async function getData() {
  //   const response = await fetch(url)
  //   const data = await response.json()
  //   setData(data)
  // }
  //
  useEffect(() => {
    // getData()
    setRecompenses(compteDemandesRecompenses(datas.recompenses))
  }, [])

  const traiterDemande = e => {
    popupData.traite = true
    Object.keys(demandes).push(popupData)
    setPopupOpen(false)
    setRecompenses(demandes)
    //Demander au composant parent de re-ajuster le nombre de demandes en attente
    props.compteDemandesAttente(demandes)
  }

  return (
    <div className="wrapper">

      {/* Popup */}
      <div onClick={(e) => setPopupOpen(false)} className={`overlay-popup ${popupOpen === true ? 'open' : ''}`}/>

      <div className={`wrapper-popup ${popupOpen === true ? 'open' : ''}`}>
        <div className={`popup center ${popupOpen === true ? 'open' : ''}`}>
          <h4 className="text-center">Etes-vous sûr de vouloir accepter la demande de récompenses de <span>{popupData.prenom + ' ' + popupData.nom}</span> ?</h4>
          <p className="text-center">Cette action est irréversible et notifiera automatiquement le collaborateur.</p>
          <button onClick={(e) => traiterDemande(e)} className="btn-primary">Confirmer</button>
          <button onClick={(e) => setPopupOpen(false)} className="btn-secondary">Annuler</button>
        </div>
      </div>
      {/* End popup */}

      <div className="tab-demandes container">
        <Suspense fallback={
          <div className="container-suspense">
            <div className="loader" id="loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>}>

          {Object.keys(demandes).length > 0 ?

              Object.keys(demandes).map((key) => {
                return (
                  <BoxDemande key={demandes[key].id} data={demandes[key]} popup={(e) => popup(e)}/>
                )
              })
            :
            Object.keys(demandes).length === 0 ?
            setTimeout(() => {
              return (
                <div className="container empty">
                  <img type="image/svg+xml" className="icon" src="/icons/demandes.svg" alt=""/>
                  <p className="text-center">Aucune demande en attente</p>
                  <p className="text-center">Il semblerait qu’il n’y ait pas de demande de récompense en attente.</p>
                </div>
              )
            }, 500) : ''
          }
        </Suspense>
      </div>
    </div>
  )
}

export default Demandes
