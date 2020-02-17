import React, { Suspense } from 'react'
import Header from '../../components/Header'
import NavCooptation from '../../components/NavCooptation'
const BoxAnnonce = React.lazy(() => import('../../components/BoxAnnonce'))

export class Annonces extends React.Component {
  preventDragHandler = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <Header/>
        <main className="cooptation annonces">
          <div className="container">
            <NavCooptation/>

            <Suspense fallback={<div className="text-center">Loading ...</div>}>
              <BoxAnnonce/>
            </Suspense>

          </div>
        </main>
      </div>
    )
  }
}

export default Annonces;
