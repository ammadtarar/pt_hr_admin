import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Recompenses from './recompenses/Recompenses'
import Demandes from './recompenses/Demandes'
import { compteDemandesRecompenses } from '../functions/CompteDemandes.js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
const datas = require('../datas.json')

function PageRecompenses(props) {
  const [data, setData] = useState(datas.recompenses)

  const preventDragHandler = e => {
    e.preventDefault()
  }

  // async function getData() {
  //   const response = await fetch(url)
  //   // const data = await response.json()
  //   setData(data)
  // }
  //
  // useEffect(() => {
  //   getData()
  // }, [])

  //Compter nombre de demandes non-traités (les demandes en attente)
  const demandes = compteDemandesRecompenses(datas.recompenses)
  const demandesAttente = Object.keys(demandes).reduce((item, e) => {
    let value = [false]
    if (value.includes(demandes[e].traite)) item[e] = demandes[e]
    return item
  }, {})

  const compteDemandesAttente = (e) => {
    setData(demandesAttente)
    //Puis mettre à jour serveur avec nouvelles demandes traités

  }

  return (
    <div className="wrapper" onDragStart={(e) => preventDragHandler(e)}>
      <Header/>

      <main className="recompenses">
        <Tabs>
          <TabList>
            <Tab>Récompenses</Tab>
            <Tab>Demandes en attente<span>{Object.keys(demandesAttente).length > 0 ? Object.keys(demandesAttente).length : 0}</span></Tab>
          </TabList>

          <TabPanel>
            <Recompenses/>
          </TabPanel>
          <TabPanel>
            <Demandes compteDemandesAttente={(e) => compteDemandesAttente(e)}/>
          </TabPanel>
        </Tabs>
      </main>
    </div>
  )
}

export default PageRecompenses
