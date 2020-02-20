import React from 'react'
const data = require('../datas.json')

export class Login extends React.Component {
  state = {
    utilisateurs: [],
    email: '',
    code: '',
    errors: '',
    steps: {
      demandeCode: true,
      envoieCode: false
    },
    inputCode: 'number',
    compteurConnections: 0
  }

  preventDragHandler = (e) => {
    e.preventDefault()
  }

  handleChangeText (e) {
    this.setState({inputCode: 'number'}, () => {
      const name = e.target.name
      const value = e.target.value
      this.setState({[name]: value})
    })
  }

  recevoirCode = (e) => {
    e.preventDefault()
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const testEmail = regexp.test(this.state.email)

    if (testEmail === true) {
      this.setState({
        steps: {
          demandeCode: false,
          envoieCode: true
        },
        errors: {
          email: ''
        }
      })
      //Clear compteur d'essaid de connection
      localStorage.clear()
      //Envoyer email à l'utilisateur


    } else {
      this.setState({
        email: 'Votre adresse email est manquante',
        errors: {
          email: 'error'
        }
      })
    }
  }

  seConnecter = (e) => {
    e.preventDefault()

    console.log(this.state.utilisateurs)

    if (this.state.code === '222222') {
      this.props.history.push('/dashboard')
      localStorage.setItem('compteurConnections', 0)
      localStorage.setItem('utilisateur', '')
    } else {
      this.setState({inputCode: 'text'}, () => {
        this.setState({
          code: "Votre code d'activation à 6 chiffres est incorrect",
          errors: {
            code: 'error'
          },
          'compteurConnections': this.state.compteurConnections + 1
        })
      })
      localStorage.setItem('compteurConnections', this.state.compteurConnections + 1)
    }
  }

  retourStep1(e) {
    e.preventDefault()
    this.setState({
      email: '',
      errors: '',
      steps: {
        demandeCode: true,
        envoieCode: false
      }
    })
  }

  componentDidMount() {
    this.setState({
      utilisateurs: data.utilisateurs
    })

    // fetch(data)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       utilisateurs: res
    //     })
    //   })
  }

  render() {
    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <main className="login">
          <div clasName="row-fluid">
            <div className="large-5 columns">
              <a href="/" className="logo" rel="noopener noreferrer" title=""><img src="/icons/logo-pushtalents.svg" alt=""/></a>

              {this.state.steps.demandeCode === true || this.state.compteurConnections > 2 ?
              <div className="box-item step-1">
                <div>
                  <h2>Bienvenue</h2>
                  {this.state.compteurConnections > 2 ? <p className="note note-connection-echec">Vous avez tenté de vous connecter 3 fois sans succès, merci de demander un nouveau code.</p> : ''}
                  <label>Adresse email</label>
                  <input type="text" name="email" className={this.state.errors.email} onChange={(e) => this.handleChangeText(e)} value={this.state.email} placeholder="Vorre adresse email"/>
                  <p className="note note-demande-code">Nous vous enverrons un code d’activation à 6 chiffres.</p>
                  <button onClick={this.recevoirCode} className="btn-primary">Recevoir un code d’activation</button>
                </div>
              </div>
              : this.state.steps.envoieCode === true ?
              <div className="box-item step-2">
                <div>
                  <h2>Bienvenue</h2>
                  <p className="note note-envoie-code">Nous avons envoyé le code d’activation à <strong>{this.state.email}</strong>.  Une fois connecté, votre connexion sera assurée pour 30 jours.<br/>
                    <a href="javascript:void(0);" onClick={(e) => this.retourStep1(e)} rel="noopener noreferrer">Retour à la connexion</a>
                  </p>
                  <label>Code d'activation</label>
                  <input type={this.state.inputCode === 'text' ? 'text' : 'number'} name="code" className={this.state.errors.code} onChange={(e) => this.handleChangeText(e)} value={this.state.code} placeholder="Votre code d’activation à 6 chiffres"/>
                  <button onClick={this.seConnecter} className="btn-primary">Se connecter</button>
                </div>
              </div> : ''}

            </div>
            <div className="large-7 columns">
              <div className="box-item">
                <div>
                  <h1 className="headline">La nouvelle expérience<br/> de recrutement<br/> collaboratif.</h1>
                  <div className="box-text">
                    <h3>Le saviez-vous ?</h3>
                    <p>80%</p>
                    <p>des candidats passifs sont ouverts à de nouvelles opportunités. <a href="linkedin.com/" rel="noopener noreferrer" target="_blank" title="">Source Linkedin</a>.</p>
                  </div>
                </div>
              </div>
              <div>
                <img className="vector-1" src="/icons/vector-1.svg" alt=""/>
                <img className="vector-2" src="/icons/vector-2.svg" alt=""/>
                <img className="vector-3" src="/icons/vector-3.svg" alt=""/>
                <img className="vector-4" src="/icons/vector-4.svg" alt=""/>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default Login
