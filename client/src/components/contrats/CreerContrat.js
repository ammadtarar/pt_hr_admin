import React from 'react';
import ReactDOM from 'react-dom';
import MultiStep from './Multistep';
import { steps } from './src/Index';
import Aside from '../Aside';

export class CreationContrat extends React.Component {
  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="creation-contrat">
            <MultiStep steps={steps}/>
          </main>
        </div>
      </div>
    );
  }
}

export default CreationContrat;
