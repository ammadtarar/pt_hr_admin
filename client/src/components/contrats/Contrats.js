import React from 'react';
import { Link } from 'react-router-dom';
import CheckBox from '../modules/CheckBox';
import Aside from '../Aside';

export class Contrats extends React.Component {
  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="contrats">
            <section className="section-1 container transparent">
              <div className="row-fluid">
                <div className="large-6 columns">
                  <h1>Contrats</h1>
                </div>
                <div className="large-6 columns">
                  <Link to="/contrats/creer"><button className="align-right">Créer un contrat</button></Link>
                  <ul className="year">
                    <li className="current">2019</li>
                    <li>2018</li>
                    <li>2017</li>
                    <li>2016</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="container transparent table" id="tableau-contrats">
              <div className="row_table header">
                <div className="cell"><CheckBox/></div>
                <div className="cell">Client</div>
                <div className="cell">Description</div>
                <div className="cell">Date d'émission</div>
                <div className="cell">Status</div>
              </div>

              <Link to="/contrats/edit">
                <div className="row_table shadows">
                  <div className="cell"><CheckBox/></div>
                  <div className="cell">Eleius</div>
                  <div className="cell">Contrat de sous-traitance Eleius</div>
                  <div className="cell">08-09</div>
                  <div className="cell"><h5 className="brouillon">brouillon</h5></div>
                </div>
              </Link>

              <Link to="/contrats/edit">
                <div className="row_table shadows">
                  <div className="cell"><CheckBox/></div>
                  <div className="cell">Quanta</div>
                  <div className="cell">Contrat de sous-traitance Eleius</div>
                  <div className="cell">08-09</div>
                  <div className="cell"><h5 className="brouillon">brouillon</h5></div>
                </div>
              </Link>

              <Link to="/contrats/edit">
                <div className="row_table shadows">
                  <div className="cell"><CheckBox/></div>
                  <div className="cell">Alphalyr</div>
                  <div className="cell">Contrat de sous-traitance Eleius</div>
                  <div className="cell">08-09</div>
                  <div className="cell"><h5 className="signé">signé</h5></div>
                </div>
              </Link>

              <p className="pagination text-center">1 <span>sur</span> 2</p>
            </section>

          </main>
        </div>
      </div>
    );
  }
}

export default Contrats;
