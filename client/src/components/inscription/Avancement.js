import React from 'react';

export class Avancement extends React.Component {
  render() {

    let coordonneesChecked;
    let entrepriseChecked;
    let configDocumentsChecked;
    let banqueChecked;
    let termineChecked;
    if(window.location.href.indexOf("coordonnees") > -1) {
      coordonneesChecked = 'checked'
    } else if(window.location.href.indexOf("entreprise") > -1) {
      entrepriseChecked = 'checked'
    } else if(window.location.href.indexOf("documents") > -1) {
      configDocumentsChecked = 'checked'
    } else if(window.location.href.indexOf("banque") > -1) {
      banqueChecked = 'checked'
    } else if(window.location.href.indexOf("documents") > -1) {
      termineChecked = 'checked'
    } else if(window.location.href.indexOf("termine") > -1) {
      termineChecked = 'checked'
    }

    return (
      <div className="row-fluid">
        <div className="large-12 columns">
          <ul className="avancement">
            <li className={coordonneesChecked}>Coordonnées</li>
            <li className={entrepriseChecked}>Entreprise</li>
            <li className={configDocumentsChecked}>Documents</li>
            <li className={banqueChecked}>Synchronisation banque</li>
            <li className={termineChecked}>Résumé</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Avancement;
