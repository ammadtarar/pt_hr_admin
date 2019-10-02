import React from 'react';
import Aside from '../Aside';
import { Link } from 'react-router-dom';

export class Facturation extends React.Component {
  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="integration-apps">
            <section className="container transparent">
              <h1>Facturation</h1>
            </section>

            <section className="container shadows">

            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default Facturation;
