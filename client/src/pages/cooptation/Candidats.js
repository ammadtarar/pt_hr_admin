import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../components/Header'
import CooptationNav from '../../components/CooptationNav'

export class Candidats extends React.Component {
  componentDidMount() {
  }

  preventDragHandler = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <Header/>
        <main className="cooptation candidats">
          <div className="container">
            <CooptationNav/>
            <input type="text" name="search" className="search" value="Rechercher" />
            <div className="row-fluid">
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="light">Candidats cooptés</h4>
                  <div className="container-scroll">
                    <div className="box-encart">
                      <div className="icon">SM</div>
                      <p>Randall Mckinney</p>
                      <p>Frontend Developer React</p>
                      <p>Coopté par <span>Samantha Leigh</span></p>
                      <p className="date">Le 23 décembre 2019</p>
                      <hr/>
                      <p><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">randallmck@mail.com</a></p>
                      <hr/>
                      <img type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
                    </div>
                    <div className="box-encart">
                      <div className="icon">SM</div>
                      <p>Randall Mckinney</p>
                      <p>Frontend Developer React</p>
                      <p>Coopté par <span>Samantha Leigh</span></p>
                      <p className="date">Le 23 décembre 2019</p>
                      <hr/>
                      <p><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">randallmck@mail.com</a></p>
                      <hr/>
                      <img type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="light">Candidatures reçues</h4>
                  <div className="container-scroll">
                    <div className="box-encart">
                      <div className="icon">SM</div>
                      <p>Randall Mckinney</p>
                      <p>Frontend Developer React</p>
                      <p>Coopté par <span>Samantha Leigh</span></p>
                      <p className="date">Le 23 décembre 2019</p>
                      <hr/>
                      <p><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">randallmck@mail.com</a></p>
                      <hr/>
                      <img type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
                    </div>
                    <div className="box-encart">
                      <div className="icon">SM</div>
                      <p>Randall Mckinney</p>
                      <p>Frontend Developer React</p>
                      <p>Coopté par <span>Samantha Leigh</span></p>
                      <p className="date">Le 23 décembre 2019</p>
                      <hr/>
                      <p><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">randallmck@mail.com</a></p>
                      <hr/>
                      <img type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
                    </div>
                    <div className="box-encart">
                      <div className="icon">SM</div>
                      <p>Randall Mckinney</p>
                      <p>Frontend Developer React</p>
                      <p>Coopté par <span>Samantha Leigh</span></p>
                      <p className="date">Le 23 décembre 2019</p>
                      <hr/>
                      <p><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">randallmck@mail.com</a></p>
                      <hr/>
                      <img type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="light">Entretiens en cours</h4>
                  <div className="container-scroll">
                    <div className="box-encart">
                      <div className="icon">SM</div>
                      <p>Randall Mckinney</p>
                      <p>Frontend Developer React</p>
                      <p>Coopté par <span>Samantha Leigh</span></p>
                      <p className="date">Le 23 décembre 2019</p>
                      <hr/>
                      <p><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">randallmck@mail.com</a></p>
                      <hr/>
                      <img type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
                    </div>
                    <div className="box-encart">
                      <div className="icon">SM</div>
                      <p>Randall Mckinney</p>
                      <p>Frontend Developer React</p>
                      <p>Coopté par <span>Samantha Leigh</span></p>
                      <p className="date">Le 23 décembre 2019</p>
                      <hr/>
                      <p><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">randallmck@mail.com</a></p>
                      <hr/>
                      <img type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item denim">
                  <h4 className="light">Candidats sélectionnés</h4>
                  <div className="container-scroll">
                    <div className="box-encart">
                      <div className="icon">SM</div>
                      <p>Randall Mckinney</p>
                      <p>Frontend Developer React</p>
                      <p>Coopté par <span>Samantha Leigh</span></p>
                      <p className="date">Le 23 décembre 2019</p>
                      <hr/>
                      <p><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">randallmck@mail.com</a></p>
                    </div>
                    <div className="box-encart">
                      <div className="icon">SM</div>
                      <p>Randall Mckinney</p>
                      <p>Frontend Developer React</p>
                      <p>Coopté par <span>Samantha Leigh</span></p>
                      <p className="date">Le 23 décembre 2019</p>
                      <hr/>
                      <p><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">randallmck@mail.com</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Candidats;
