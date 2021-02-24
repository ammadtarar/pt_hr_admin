import { HTTP, URLS } from "../network/http";
import React from "react";
const datas = require("../datas.json");

export class Login extends React.Component {
  state = {
    utilisateurs: [],
    utilisateur: [],
    email: "",
    code: "",
    errors: "",
    showError: true,
    errorMsg: "",
    steps: {
      demandeCode: true,
      envoieCode: false,
    },
    inputCode: "number",
    compteurConnections: 0,
  };
  sendCodeToEmail = (email) => {
    this.setState({
      showError: false,
      errorMsg: "",
      compteurConnections : 0
    });
    localStorage.setItem("compteurConnections", 0);
    HTTP.post(URLS.USER.SEND_OTP, {
      email: email,
    })
      .then((response) => {
        this.setState({
          email: email,
          showError: false,
          errorMsg: "",
          steps: {
            demandeCode: false,
            envoieCode: true,
          },
        });
      })
      .catch((err) => {
        this.setState({
          showError: true,
          errorMsg: err.response.data.message,
        });
      });
  };
  loginWithOTP = () => {
    if (this.state.code.length < 6) {
      this.setState({
        showError: true,
        errorMsg: "Votre code d’activation à 6 chiffres",
      });
    } else {
      this.setState({
        showError: false,
        errorMsg: "",
      });

      HTTP.post(URLS.USER.LOGIN, {
        email: this.state.email,
        otp: this.state.code,
      })
        .then((response) => {
          let user = response.data.user;
          if(user.user_type === 'employee'){
            localStorage.setItem("utilisateur", '');
            localStorage.setItem("compteurConnections", 0);
            this.setState({
              showError: true,
              errorMsg: "Seuls les RH de l'entreprise sont autorisés à utiliser cette plateforme",
              compteurConnections: 0,
              code : "",
              steps: {
                demandeCode: true,
                envoieCode: false
              }
            });
          }else{
            localStorage.setItem("utilisateur", JSON.stringify(response.data.user));
            localStorage.setItem("compteurConnections", 0);
            this.setState({
              showError: false,
              errorMsg: "",
              compteurConnections: 0,
            });
            this.props.history.push("/dashboard");
          }
          
        })
        .catch((err) => {
          console.log("LOGIN ERROR");
          console.log(err.response.data.message);
          this.setState({
            showError: true,
            errorMsg: err.response.data.message,
            compteurConnections: this.state.compteurConnections + 1,
          });
        });
    }
  };

  preventDragHandler = (e) => {
    e.preventDefault();
  };

  handleChangeText(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (isNaN(Number(value)) && name === "code") {
      this.setState({ code: "" });
    } else {
      this.setState({ [name]: value });
    }
  }

  recevoirCode = (e) => {
    
    e.preventDefault();
    // const utilisateurs = this.state.utilisateurs
    const email = this.state.email.toLowerCase();
    //Si compteur d'essai de connections à 3, remise à zéro
    if (this.state.compteurConnections === 3) {
      this.setState({ compteurConnections: 0 });
      localStorage.setItem("compteurConnections", 0);
    }

    //Check si format email valide
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\f[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const testFormatEmail = regexp.test(email);

    if (!testFormatEmail) {
      this.setState({
        email: "Votre adresse email a un format incorrect",
        errors: {
          email: "error",
        },
      });
      console.log("EMAIL INCORRECT");
    } else {
      console.log("SENDING OTP");
      this.sendCodeToEmail(email);
    }

    // //Check si email utilisateur est dans la DB
    // const utilisateur = Object.keys(utilisateurs).reduce((item, e) => {
    //   if ([email].includes(utilisateurs[e].email)) item[e] = utilisateurs[e]
    //   return item
    // }, {})
    // function checkUserIsOnDB(obj) {
    //   for(var key in obj) {
    //     if(obj.hasOwnProperty(key))
    //     return true
    //   }
    //   return false
    // }

    // //Check différents cas
    // switch (true) {
    //   //Si utilsateur présent dans la DB
    //   case checkUserIsOnDB(utilisateur):
    //     this.setState({
    //       steps: {
    //         demandeCode: false,
    //         envoieCode: true
    //       },
    //       errors: {
    //         email: ''
    //       }
    //     })
    //     //Ajout datas de l'utilisateur en localStorage
    //     const userObj = utilisateur[Object.keys(utilisateur)[0]]
    //     this.setState({utilisateur: userObj})
    //     break
    //   //Si format email incorrect
    //   case testFormatEmail === false:
    //     this.setState({
    //       email: 'Votre adresse email a un format incorrect',
    //       errors: {
    //         email: 'error'
    //       }
    //     })
    //     break
    //   //Si utilisateur n'est pas dans la DB
    //   case !checkUserIsOnDB(utilisateur):
    //     this.setState({
    //       email: 'Votre adresse email est manquante',
    //       errors: {
    //         email: 'error'
    //       }
    //     })
    //     break
    //   default:
    //     this.setState({
    //       errors: {
    //         email: ''
    //       }
    //     })
    // }
  };

  seConnecter = (e) => {
    console.log("seConnecter");
    console.log(e);
    e.preventDefault();
    const userObj = this.state.utilisateur;

    switch (true) {
      //Si code tapé === code d'activation en DB
      case this.state.code === userObj.codeActivation:
        localStorage.setItem("utilisateur", JSON.stringify(userObj));
        this.props.history.push("/dashboard");
        this.setState({ compteurConnections: 0 });
        localStorage.setItem("compteurConnections", 0);
        break;
      //Si l'utilisateur a échoué 3 fois à taper le bon code d'activation
      case this.state.code !== userObj.codeActivation &&
        localStorage.getItem("compteurConnections") === 3:
        this.setState({
          steps: {
            demandeCode: true,
            envoieCode: false,
          },
        });
        //Signifier en DB que l'utilisateur a échoué 3 fois

        break;
      //Si code tapé !== code d'activation en DB
      case this.state.code !== userObj.codeActivation:
        this.setState({ inputCode: "text" }, () => {
          this.setState({
            code: "Votre code d'activation à 6 chiffres est incorrect",
            email: "",
            errors: {
              code: "error",
            },
            compteurConnections: this.state.compteurConnections + 1,
          });
        });
        localStorage.setItem(
          "compteurConnections",
          this.state.compteurConnections + 1
        );
        break;
      default:
    }
  };

  removeErrorText(e) {
    e.preventDefault();
    if (
      this.state.email === "Votre adresse email a un format incorrect" ||
      this.state.email === "Votre adresse email est manquante" ||
      this.state.code === "Votre code d'activation à 6 chiffres est incorrect"
    ) {
      this.setState({
        email: "",
        code: "",
        errors: {
          email: "",
        },
      });
    }
  }

  retourStep1(e) {
    e.preventDefault();
    this.setState({
      email: "",
      errors: "",
      steps: {
        demandeCode: true,
        envoieCode: false,
      },
    });
  }

  componentDidMount() {
    //Afficher url / en entrant sur la page (au cas où l'utilisateur voudrait accéder à autre page et serait redirgé par router sur /)
    window.history.pushState("", "", "/");
    localStorage.clear();

    // fetch(data)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       utilisateurs: res
    //     })
    //   })
    // .catch(error => console.log(error))

    this.setState({
      utilisateurs: datas.utilisateurs,
    });
  }

  render() {
    return (
      <div className="wrapper" onDragStart={this.preventDragHandler}>
        <main className="login">
          <div className="row-fluid">
            <div className="large-5 columns">
              <a href="/" className="logo" rel="noopener noreferrer" title="">
                <img src="/icons/logo-pushtalents.svg" alt="" />
              </a>

              {this.state.steps.demandeCode === true ||
              this.state.compteurConnections === 3 ? (
                <div className="box-item step-1">
                  <div>
                    <h2>Bienvenue</h2>


                    {this.state.showError ? (
                      <p className="note note-connection-echec">
                      {this.state.errorMsg}
                    </p>
                    ) : (
                      ""
                    )}
                    

                    {this.state.compteurConnections === 3 ? (
                      <p className="note note-connection-echec">
                        Vous avez tenté de vous connecter 3 fois sans succès,
                        merci de demander un nouveau code.
                      </p>
                    ) : (
                      ""
                    )}

                    <label>Adresse email</label>
                    <input
                      type="text"
                      name="email"
                      className={this.state.errors.email}
                      onClick={(e) => this.removeErrorText(e)}
                      onChange={(e) => this.handleChangeText(e)}
                      value={this.state.email}
                      placeholder="Votre adresse email"
                    />
                    <p className="note note-demande-code">
                      Nous vous enverrons un code d’activation à 6 chiffres.
                    </p>
                    <button onClick={this.recevoirCode} className="btn-primary">
                      Recevoir un code d’activation
                    </button>
                  </div>
                </div>
              ) : this.state.steps.envoieCode === true ? (
                <div className="box-item step-2">
                  <div>
                    <h2>Bienvenue</h2>

                    {this.state.showError ? (
                      <p className="note note-connection-echec">
                      {this.state.errorMsg}
                    </p>
                    ) : (
                      ""
                    )}

                    <p className="note note-envoie-code">
                      Nous avons envoyé le code d’activation à{" "}
                      <strong>{this.state.email}</strong>.  Une fois
                      connecté, votre connexion sera assurée pour 30 jours.
                    </p>
                    <span
                      className="link"
                      onClick={(e) => this.retourStep1(e)}
                      rel="noopener noreferrer"
                    >
                      Retour à la connexion
                    </span>
                    <label>Code d'activation</label>
                    <input
                      type="text"
                      name="code"
                      className={this.state.errors.code}
                      onClick={(e) => this.removeErrorText(e)}
                      onChange={(e) => this.handleChangeText(e)}
                      value={this.state.code}
                      maxLength="6"
                      placeholder="Votre code d’activation à 6 chiffres"
                    />
                    <button onClick={this.loginWithOTP} className="btn-primary">
                      Se connecter
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="large-7 columns">
              <div className="box-item">
                <div>
                  <h1 className="headline">
                    La nouvelle expérience
                    <br /> de recrutement
                    <br /> collaboratif.
                  </h1>
                  <div className="box-text">
                    <h3>Le saviez-vous ?</h3>
                    <p>80%</p>
                    <p>
                      des candidats passifs sont ouverts à de nouvelles
                      opportunités.{" "}
                      <a
                        href="linkedin.com/"
                        rel="noopener noreferrer"
                        target="_blank"
                        title=""
                      >
                        Source Linkedin
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <img className="vector-1" src="/icons/vector-1.svg" alt="" />
                <img className="vector-2" src="/icons/vector-2.svg" alt="" />
                <img className="vector-3" src="/icons/vector-3.svg" alt="" />
                <img className="vector-4" src="/icons/vector-4.svg" alt="" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Login;
