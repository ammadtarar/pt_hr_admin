import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../components/Header'
import NavCooptation from '../../components/NavCooptation'
import BoxCandidatInfos from '../../components/BoxCandidatInfos'
import Switch from 'react-switch'

export class CandidatsArchives extends React.Component {
  preventDragHandler = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <Header/>
        <main className="cooptation canditas-archives">
          <div className="container">
            <NavCooptation/>
            <div className="row-fluid">
              <div className="columns large-3">
                <BoxCandidatInfos/>
              </div>
              <div className="columns large-3">
                <BoxCandidatInfos/>
              </div>
              <div className="columns large-3">
                <BoxCandidatInfos/>
              </div>
              <div className="columns large-3">
                <BoxCandidatInfos/>
              </div>
              <div className="columns large-3">
                <BoxCandidatInfos/>
              </div>
              <div className="columns large-3">
                <BoxCandidatInfos/>
              </div>
              <div className="columns large-3">
                <BoxCandidatInfos/>
              </div>
              <div className="columns large-3">
                <BoxCandidatInfos/>
              </div>
              <div className="columns large-3">
                <BoxCandidatInfos/>
              </div>
              <div className="columns large-3">
                <BoxCandidatInfos/>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default CandidatsArchives;
