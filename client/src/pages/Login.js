import React from 'react'
import { Link } from 'react-router-dom'
// import {Power2, TimelineMax} from "gsap/TweenMax";

export class Login extends React.Component {
  constructor () {
    super()
  }

  componentDidMount() {
    // const head = document.querySelector('head')
    // const script = document.createElement('script')
    // script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/gsap@3.0.1/dist/gsap.min.js')
    // head.appendChild(script)
    //
    // const head2 = document.querySelector('head')
    // const script2 = document.createElement('script')
    // script2.setAttribute('src', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/MorphSVGPlugin3.min.js')
    // head2.appendChild(script2)
    //
    // var tl = new TimelineMax({repeat:-1, yoyo: true})
    //
    // var s1 = document.getElementById("shape1")
    // var s2 = document.getElementById("shape2")
    // var s3 = document.getElementById("shape3")
    //
    // tl.set(s1, {css: {fill: "#FFF"}})
    // .set(s3, {css: {fill: "none"}})
    // .set(s2, {css: {fill: "none"}})
    // .to(s1, 9, {morphSVG: s2})
    // .to(s1, 9, {morphSVG: s3})
    // .to(s1, 9, {morphSVG: s1})
  }

  preventDragHandler = (e) => {
    e.preventDefault();
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
