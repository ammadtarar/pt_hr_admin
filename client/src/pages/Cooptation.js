import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Candidats from './cooptation/Candidats'
import Annonces from './cooptation/Annonces'
import CandidatsArchives from './cooptation/CandidatsArchives'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
const datas = require('../datas.json')

function PageCooptation(props) {
  const [data, setData] = useState([])
  const [checkedTab, setCheckedTab] = useState([])
  const annonces = data

  const preventDragHandler = e => {
    e.preventDefault()
  }

  const tab = index => {
    setCheckedTab(index)
  }

  // async function getData() {
  //   const response = await fetch('http://localhost:8081/data')
  //   const data = await response.json()
  // }
  //
  useEffect(() => {
    // getData()
    setData(datas.annonces)
  }, [])

  return (
    <div className="wrapper" onDragStart={(e) => preventDragHandler(e)}>
      <Header/>
      <main className={`cooptation ${checkedTab === 2 ? 'background-athens-gray' : checkedTab === 0 ? 'background-white' : ''}`}>
        <Tabs onSelect={index => tab(index)}>
          <TabList>
            <Tab>Candidats</Tab>
            <Tab>Annonces<span>{Object.keys(annonces).length > 0 ? Object.keys(annonces).length : 0}</span></Tab>
            <Tab>Candidats archivés</Tab>
          </TabList>

          <TabPanel>
            <Candidats/>
          </TabPanel>
          <TabPanel>
            <Annonces/>
          </TabPanel>
          <TabPanel>
            <CandidatsArchives/>
          </TabPanel>
        </Tabs>
      </main>
    </div>
  )
}

export default PageCooptation
