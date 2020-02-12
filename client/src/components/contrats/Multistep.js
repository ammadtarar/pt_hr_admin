import React from 'react';
import { Link } from 'react-router-dom';

const getNavStates = (indx, length) => {
  let styles = []
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push('done')
    } else if (i === indx) {
      styles.push('doing')
    } else {
      styles.push('todo')
    }
  }
  return { current: indx, styles: styles }
}

let NextBtn = 'Continuer';
const checkNavState = (currentStep, stepsLength) => {
  if (currentStep > 0 && currentStep < stepsLength - 1) {
    NextBtn = 'Continuer'
    return {
      showPreviousBtn: true,
      showNextBtn: true
    }
  } else if (currentStep === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true
    }
  } else {
    NextBtn = 'Créer le contrat'
    return {
      showPreviousBtn: true,
      showNextBtn: false
    }
  }
}

export default class MultiStep extends React.Component {
  state = {
    showPreviousBtn: false,
    showNextBtn: true,
    compState: 0,
    navState: getNavStates(0, this.props.steps.length)
  }

  setNavState = next => {
    this.setState({
      navState: getNavStates(next, this.props.steps.length)
    })
    if (next < this.props.steps.length) {
      this.setState({ compState: next })
    }
    this.setState(checkNavState(next, this.props.steps.length))
  }

  handleKeyDown = evt => {
    if (evt.which === 13) {
      this.next()
    }
  }

  handleOnClick = evt => {
    if (
      evt.currentTarget.value === this.props.steps.length - 1 &&
      this.state.compState === this.props.steps.length - 1
    ) {
      this.setNavState(this.props.steps.length)
    } else {
      this.setNavState(evt.currentTarget.value)
    }
  }

  next = () => {
    this.setNavState(this.state.compState + 1)
  }

  previous = () => {
    if (this.state.compState > 0) {
      this.setNavState(this.state.compState - 1)
    }
  }

  getClassName = (className, i) => {
    return className + '-' + this.state.navState.styles[i]
  }

  renderSteps = () => {
    return this.props.steps.map((s, i) => (
      <li
        className={this.getClassName('progtrckr', i)}
        onClick={this.handleOnClick}
        key={i}
        value={i}
      >
        <em>{i + 1}</em>
        <span>{this.props.steps[i].name}</span>
      </li>
    ))
  }

  render () {
    return (
      <div className="container" onKeyDown={this.handleKeyDown}>
        {this.props.steps[this.state.compState].component}
        <div style={this.props.showNavigation ? {} : { display: 'none' }}>
          <button
            className={`align-right ${this.props.steps[this.state.compState].name === 'StepFour' ? 'lien' : ''}`}
            onClick={this.next}
          >
          {this.props.steps[this.state.compState].name === 'StepFour' ?
            <a href="/contrats/edit" title="" rel="noopener noreferrer">{NextBtn}</a> : NextBtn
          }
          </button>
          <button
            className={`btn-fourth align-right ${this.props.steps[this.state.compState].name === 'StepOne' ? 'lien' : ''}`}
            onClick={this.previous}
          >
          {console.log(this.props.steps[this.state.compState].name)}
          {this.props.steps[this.state.compState].name === 'StepOne' ?
            <a href="/contrats/" title="" rel="noopener noreferrer">Retour</a> : 'Retour'
          }
          </button>
        </div>
      </div>
    )
  }
}

MultiStep.defaultProps = {
  showNavigation: true
}
