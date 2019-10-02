import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, matchPath } from 'react-router-dom';
import Identification from '../components/Identification';
import Inscription from '../components/Inscription';
import Reactivation from '../components/Reactivation';
import NewPassword from '../components/motdepasse/NewPassword';
import InscriptionCoordonnees from '../components/inscription/Coordonnees';
import InscriptionEntreprise from '../components/inscription/Entreprise';
import InscriptionConfigDocuments from '../components/inscription/ConfigDocuments.js';
import InscriptionBanque from '../components/inscription/Banque.js';
import InscriptionTermine from '../components/inscription/Termine.js';
import Accueil from '../components/Accueil';
import Aside from '../components/Aside';
import Comptabilite from '../components/comptabilite/Comptabilite';
import Devis from '../components/devis/Devis';
import CreerDevis from '../components/devis/CreerDevis';
import EditDevis from '../components/devis/EditDevis';
import EditProposition from '../components/devis/EditProposition';
import VueDevis from '../components/devis/VueDevis';
import VueProposition from '../components/devis/VueProposition';
import SignatureDevis from '../components/devis/SignatureDevis';
import Factures from '../components/factures/Factures';
import EditFacture from '../components/factures/EditFacture';
import VueFacture from '../components/factures/VueFacture';
import Clients from '../components/clients/Clients';
import VueClient from '../components/clients/VueClient';
import Contrats from '../components/contrats/Contrats';
import CreerContrat from '../components/contrats/CreerContrat';
import EditContrat from '../components/contrats/EditContrat';
import Profile from '../components/config/Profile';
import Facturation from '../components/config/Facturation';
import Abonnement from '../components/config/Abonnement';
import ProfileEntreprise from '../components/config/ProfileEntreprise';
import IntegrationApps from '../components/config/IntegrationApps';
import Recommandations from '../components/config/Recommandations';
import Banque from '../components/banque/Banque';
import SynchronisationBanque from '../components/banque/Synchronisation';

const userRoutes = [
  {
    path: '/identification',
    component: Identification
  },
  {
    path: '/inscription',
    component: Inscription
  },
  {
    path: '/reactivation',
    component: Reactivation
  },
  {
    path: '/mot-de-passe/nouveau',
    component: NewPassword
  },
  {
    path: '/inscription/coordonnees',
    component: InscriptionCoordonnees
  },
  {
    path: '/inscription/entreprise',
    component: InscriptionEntreprise
  },
  {
    path: '/inscription/configuration-documents',
    component: InscriptionConfigDocuments
  },
  {
    path: '/inscription/banque',
    component: InscriptionBanque
  },
  {
    path: '/inscription/termine',
    component: InscriptionTermine
  },
  {
    path: '/',
    component: Accueil
  },
  {
    path: '/devis',
    component: Devis
  },
  {
    path: '/devis/creer',
    component: CreerDevis
  },
  {
    path: '/devis/edit',
    component: EditDevis
  },
  {
    path: '/devis/vue',
    component: VueDevis
  },
  {
    path: '/devis/edit-proposition',
    component: EditProposition
  },
  {
    path: '/devis/vue-proposition',
    component: VueProposition
  },
  {
    path: '/lien-devis',
    component: SignatureDevis
  },
  {
    path: '/factures',
    component: Factures
  },
  {
    path: '/factures/edit',
    component: EditFacture
  },
  {
    path: '/factures/vue',
    component: VueFacture
  },
  {
    path: '/clients',
    component: Clients
  },
  {
    path: '/clients/vue',
    component: VueClient
  },
  {
    path: '/entreprise/profile',
    component: ProfileEntreprise
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/integrations',
    component: IntegrationApps
  },
  {
    path: '/facturation',
    component: Facturation
  },
  {
    path: '/contrats',
    component: Contrats
  },
  {
    path: '/contrats/creer',
    component: CreerContrat
  },
  {
    path: '/contrats/edit',
    component: EditContrat
  },
  {
    path: '/contrats/vue',
    component: EditContrat
  },
  {
    path: '/comptabilite',
    component: Comptabilite
  },
  {
    path: '/abonnement',
    component: Abonnement
  },
  {
    path: '/recommandations',
    component: Recommandations
  },
  {
    path: '/banque',
    component: Banque
  },
  {
    path: '/banque/synchronisation',
    component: SynchronisationBanque
  }
]

export class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Route
          exact
          render={() => (
            this.props.loginStatus === false ? (
              <Switch>
                {userRoutes.map(route => (
                  <Route key={route.path} exact path={route.path} component={route.component} />
                ))}
                <Route key="identification" path="/identification" component={Identification} />
                <Route key="inscription" path="/inscription" component={Inscription} />
                <Route key="inscription/coordonnees" path="/inscription/coordonnees" component={InscriptionCoordonnees} />
                <Route key="mot-de-passe/nouveau" path="/mot-de-passe/nouveau" component={NewPassword} />
                <Route key="reactivation" path="/reactivation" component={Reactivation} />
              </Switch>
            ) : (
              <Switch>
                <Route key="identification" path="/identification" component={Identification} />
                <Route key="inscription" path="/inscription" component={Inscription} />
                <Route key="inscription/coordonnees" path="/inscription/coordonnees" component={InscriptionCoordonnees} />
                <Route key="mot-de-passe/nouveau" path="/mot-de-passe/nouveau" component={NewPassword} />
                <Route key="reactivation" path="/reactivation" component={Reactivation} />
              </Switch>
            )
          )}
        />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({auth: {loginStatus}}) => ({
  loginStatus
});

export default connect(mapStateToProps)(AppRouter);
