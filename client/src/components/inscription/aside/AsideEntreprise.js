import React from 'react';
import { Link } from 'react-router-dom';

export class AsideEntreprise extends React.Component {
  render() {
    return (
      <aside className="inscription">
        <div className="box-item">
        </div>
        <p className="blanc deja-compte">Déjà un compte?<br/><Link to="/identification/">Identifiez-vous</Link></p>
      </aside>
    );
  }
}

export default AsideEntreprise;
