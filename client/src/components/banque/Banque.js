import React from 'react'
import { Link } from 'react-router-dom'
import Aside from '../Aside'
import Tresorerie from './Tresorerie'
import socketIOClient from 'socket.io-client'

export class Banque extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      compteBankinID: '',
      banque: 'Nom de la banque',
      connectBankinURL: ''
    }
  }

  handleChange(e){
    this.setState({
      banque: e.target.value
    })

    const socket = socketIOClient('/')
    // var top = window.screen.height - 680;
    //     top = top > 0 ? top/2 : 0;
    //
    // var left = window.screen.width - 400;
    //     left = left > 0 ? left/2 : 0;

    fetch('/configuration')
      .then(res => res.json())
      .then(res => socket.emit('synchronisation bankin', {email: res.email, password: res.password}))
      .then(res =>  {
        socket.on('URLConnectBankin', (url) => {
          // window.open(url, '', 'width=400,height=680'  + ',top=' + top + ',left=' + left)
        })
      })
      .then(res => {
        this.props.history.push({
          pathname: '/banque/synchronisation'
        })
      })
  }

  deSynchBankin = (data) => {
    const socket = socketIOClient('/')
    socket.emit('desynchronisation bankin', {compteBankinID: ''})
    this.setState({
      compteBankinID: '',
      compteBankinCBID: ''
    })
  }

  componentWillMount() {
    fetch('http://localhost:8081/configuration')
      .then(res => res.json())
      .then(res => {
        this.setState({
          compteBankinID: res.compteBankinID
        });
      })
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="banque">
            {this.state.compteBankinID !== '' ? <Tresorerie compteBankinID={this.deSynchBankin}/> :
              <div>
              <section className="section-1 container transparent">
                <div className="row-fluid">
                  <div className="large-5 columns">
                    <h1>Synchronisation bancaire</h1>
                  </div>
                </div>
              </section>

              <section className="section-2 container transparent shadows">
                <div className="container">
                  <h2>Sélectionnez votre banque professionnelle</h2>
                  <form>
                    <select name="nom-banque" id="custom-select" className="nom-banque" onChange={(event) => this.handleChange(event)}>
                      <option value="Nom de votre banque">Nom de la banque</option>
                      <option value="Cr&eacute;dit Agricole">Crédit Agricole</option>
                      <option value="BNP Paribas">BNP Paribas</option>
                      <option value="LCL">LCL</option>
                      <option value="Caisse d&apos;&eacute;pargne">Caisse d'épargne</option>
                      <option value="Soci&eacute;t&eacute; g&eacute;n&eacute;rale">Société générale</option>
                      <option value="Cr&eacute;dit Mutuel">Crédit Mutuel</option>
                      <option value="Banque Populaire">Banque Populaire</option>
                      <option value="CIC">CIC</option>
                      <option value="La Banque Postale">La Banque Postale</option>
                      <option value="Boursorama Banque">Boursorama Banque</option>
                      <option value="Cr&eacute;dit du Nord">Crédit du Nord</option>
                    </select>
                    <p><strong>Ou cliquez directement sur l’un des choix fréquents :</strong></p>
                  </form>

                  <div className="logos-clients">
                    <div className="box-logo-banque">
                      <img type="image/svg+xml" className="" src="/images/boursorama.png" alt=""/>
                    </div>
                    <div className="box-logo-banque">
                      <img type="image/svg+xml" className="" src="/images/bnp-paribas.svg" alt=""/>
                    </div>
                    <div className="box-logo-banque">
                      <img type="image/svg+xml" className="" src="/images/caisse-epargne.svg" alt=""/>
                    </div>
                    <div className="box-logo-banque">
                      <img type="image/svg+xml" className="" src="/images/societe-generale.svg" alt=""/>
                    </div>
                    <div className="box-logo-banque">
                      <img type="image/svg+xml" className="" src="/images/lcl.jpg" alt=""/>
                    </div>
                    <div className="box-logo-banque">
                      <img type="image/svg+xml" className="" src="/images/ing.svg" alt=""/>
                    </div>
                    <div className="box-logo-banque">
                      <img type="image/svg+xml" className="" src="/images/credit-mutuel.svg" alt=""/>
                    </div>
                    <div className="box-logo-banque">
                      <img type="image/svg+xml" className="" src="/images/banque-populaire.png" alt=""/>
                    </div>
                    <div className="box-logo-banque">
                      <img type="image/svg+xml" className="" src="/images/credit-agricole.png" alt=""/>
                    </div>
                    <div className="box-logo-banque">
                      <img type="image/svg+xml" className="" src="/images/cic.svg" alt=""/>
                    </div>
                    <div className="box-logo-banque">
                      <img type="image/svg+xml" className="" src="/images/banque-postale.svg" alt=""/>
                    </div>
                    <div className="box-logo-banque">
                      <img type="image/svg+xml" className="" src="/images/credit-nord.png" alt=""/>
                    </div>
                  </div>
                  <p className="text-center">Votre banque n'apparait pas parmis les choix ci-dessus ? <span>Cherchez-là dans cette liste</span></p>
                </div>
              </section></div>}
          </main>
        </div>
      </div>
    );
  }
}

export default Banque;
