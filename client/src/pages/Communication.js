import React, { Suspense } from 'react'
import Header from '../components/Header'
const CardCommunication = React.lazy(() => import('../components/CardCommunication'))
const data = require('../datas.json')

export class Communication extends React.Component {
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
    const communication = this.state.data.communication

    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <Header/>
        <main className="communication">
          <div className="container">
            <ul className="headline">
              <li><h3>Communication</h3></li>
              <li><p><span>{Object.keys(communication).length}</span> contenus actifs</p></li>
            </ul>
            <div className="row-fluid">

              <Suspense fallback={<div className="text-center">Loading ...</div>}>
                <div className="large-3 columns">
                  <div className="box-note">
                    <p>Consultez et gérez les<br/> <span>contenus de marque<br/> employeur</span> visibles par vos<br/> <span>collaborateurs</span>.</p>
                    <p className="sub-note">Ils pourront les consulter et les partager auprès de leur réseau.</p>
                  </div>
                </div>

                {Object.keys(communication).map((key, item, i) => {
                  return (
                    <div className="large-3 columns">
                      <CardCommunication data={communication[key]}/>
                    </div>
                  )
                })}
              </Suspense>

            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Communication;
