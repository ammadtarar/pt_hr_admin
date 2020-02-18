import React, { Suspense } from 'react'
import Header from '../../components/Header'
import NavCooptation from '../../components/NavCooptation'
const BoxAnnonce = React.lazy(() => import('../../components/BoxAnnonce'))
const data = require('../../datas.json')

export class Annonces extends React.Component {
  state = {
    'data': data
  }

  preventDragHandler = (e) => {
    e.preventDefault()
  }

  componentDidMount() {
    // fetch(data)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       'data': res
    //     })
    //   })
  }

  render() {
    const annonces = this.state.data.annonces

    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <Header/>
        <main className="cooptation annonces">
          <div className="container">
            <NavCooptation/>

            <Suspense fallback={<div className="text-center">Loading ...</div>}>
              {Object.keys(annonces).map((key, item, i) => {
                return (
                  <BoxAnnonce data={annonces[key]}/>
                )
              })}
            </Suspense>

          </div>
        </main>
      </div>
    )
  }
}

export default Annonces;
