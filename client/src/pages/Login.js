import React from 'react'

export class Login extends React.Component {
  componentDidMount() {
  }

  preventDragHandler = (e) => {
    e.preventDefault()
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <main className="login">
          <div clasName="row-fluid">
            <div className="large-5 columns">
              <a href="/" className="logo" rel="noopener noreferrer" title=""><img src="/icons/logo-pushtalents.svg" alt=""/></a>
              <div className="box-item">
                <div>
                  <h2>Bienvenue</h2>
                  <label>Adresse email</label>
                  <input type="text" value="Votre adresse email"/>
                  <p className="note">Nous vous enverrons un code d’activation à 6 chiffres.</p>
                  <button onClick={this.onSubmit} className="btn-primary">Recevoir un code d’activation</button>
                </div>
              </div>
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

export default Login;
