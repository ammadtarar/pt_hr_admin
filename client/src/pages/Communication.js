import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../components/Header'
import CardCommunication from '../components/CardCommunication'

export class Communication extends React.Component {
  preventDragHandler = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <Header/>
        <main className="communication">
          <div className="container">
            <ul className="headline">
              <li><h3>Communication</h3></li>
              <li><p><span>6</span> contenus actifs</p></li>
            </ul>
            <div className="row-fluid">
              <div className="large-3 columns">
                <div className="box-note">
                  <p>Consultez et gérez les<br/> <span>contenus de marque<br/> employeur</span> visibles par vos<br/> <span>collaborateurs</span>.</p>
                  <p className="sub-note">Ils pourront les consulter et les partager auprès de leur réseau.</p>
                </div>
              </div>
              <div className="large-3 columns">
                <CardCommunication/>
              </div>
              <div className="large-3 columns">
                <CardCommunication/>
              </div>
              <div className="large-3 columns">
                <CardCommunication/>
              </div>
              <div className="large-3 columns">
                <CardCommunication/>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Communication;
