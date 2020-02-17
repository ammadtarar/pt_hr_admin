import React, { Suspense } from 'react'
import Header from '../../components/Header'
import NavCooptation from '../../components/NavCooptation'
const BoxCandidat = React.lazy(() => import('../../components/BoxCandidat'))

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

              <Suspense fallback={<div className="text-center">Loading ...</div>}>
                <div className="columns large-3">
                  <BoxCandidat/>
                </div>
                <div className="columns large-3">
                  <BoxCandidat/>
                </div>
                <div className="columns large-3">
                  <BoxCandidat/>
                </div>
                <div className="columns large-3">
                  <BoxCandidat/>
                </div>
                <div className="columns large-3">
                  <BoxCandidat/>
                </div>
                <div className="columns large-3">
                  <BoxCandidat/>
                </div>
                <div className="columns large-3">
                  <BoxCandidat/>
                </div>
                <div className="columns large-3">
                  <BoxCandidat/>
                </div>
                <div className="columns large-3">
                  <BoxCandidat/>
                </div>
                <div className="columns large-3">
                  <BoxCandidat/>
                </div>
              </Suspense>

            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default CandidatsArchives;
