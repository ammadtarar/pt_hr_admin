import React from 'react'
import { useState, useEffect } from "react";
import Header from '../components/Header'
import Recompenses from './recompenses/Recompenses'
import Demandes from './recompenses/Demandes'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
const data = require('../datas.json')

function PageRecompenses() {
  // const [data, setData] = useState([])

  const preventDragHandler = e => {
    e.preventDefault()
  }

  // useEffect(() => {
  //   fetch(data)
  //     .then(response => response.json())
  //     .then(data => setData(data));
  // }, [])

  return (
    <div className="wrapper" onDragStart={(e) => preventDragHandler(e)}>
      <Header/>

      <main className="recompenses">
        <Tabs>
          <TabList>
            <Tab>Récompenses</Tab>
            <Tab>Demandes en attente<span>{Object.keys(data.annonces).length}</span></Tab>
          </TabList>

          <TabPanel>
            <Recompenses/>
          </TabPanel>
          <TabPanel>
            <Demandes/>
          </TabPanel>
        </Tabs>
      </main>
    </div>
  )
}

export default PageRecompenses;
