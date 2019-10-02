import React from 'react';
import { Link } from 'react-router-dom';

export class AsideCoordonnees extends React.Component {
  render() {
    return (
      <aside className="inscription">
        <div className="box-item">
          <h2 className="text-center blanc">Créez un compte et profitez de votre essai gratuit de 15 jours</h2>
          <p className="text-center blanc">
            Cum haec taliaque sollicitas eius aures everberarent expositas semper
            eius modi rumoribus et patentes, varia animo tum
            miscente consilia, tandem id ut optimum
            factu elegit.
          </p>
        </div>
        <p className="blanc deja-compte">Déjà un compte?<br/><Link to="/identification/">Identifiez-vous</Link></p>
      </aside>
    );
  }
}

export default AsideCoordonnees;
