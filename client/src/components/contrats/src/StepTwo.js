import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export class StepTwo extends React.Component {
  constructor () {
    super()
  }

  render () {
    return (
      <section className="container transparent step2">
        <div className="row-fluid">
          <div className="large-10 columns">
            <h1>Périmètre du projet</h1>
            <p>Remplissez les informations de base</p>
          </div>
          <div className="large-2 columns">
            <p className="align-right l-size">2 / 4</p>
          </div>
        </div>
        <hr/>
        <div className="row-fluid">
          <div className="large-7 columns">
            <p>Que suis-je, le développeur embauché pour faire?</p>
            <TextareaAutosize
              useCacheForDOMMeasurements
              style={{minHeight: 300, padding: 15}}
              onChange={function(event) {
                 this.setState({value: event.target.value});
              }}
            />
          </div>
          <div className="large-5 columns">
            <p className="info">Faites-vous référence en tant que «développeur» et votre client en tant que «client». Plus vous définissez clairement votre travail, mieux c'est. Précisez ce que vous allez faire, y compris les livrables et les dates. Si nécessaire, vous pouvez joindre un énoncé de travail plus détaillé.</p>
          </div>
        </div>
        <hr/>
      </section>
    );
  }
}

export default StepTwo;
