import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDkhcVuusnJSvmAUVvbidhax0j4pZpFloU",
  authDomain: "freelanceapp-8fab2.firebaseapp.com",
  databaseURL: "https://freelanceapp-8fab2.firebaseio.com",
  projectId: "freelanceapp-8fab2",
  storageBucket: "freelanceapp-8fab2.appspot.com",
  messagingSenderId: "658642519222"
}

firebase.initializeApp(config)
const database = firebase.database();

database.ref().set({
  clients: {
    'contactjulienlucascom': {
      prenom: 'Julien',
      nom: 'Lucas',
      email: 'contact@julienlucas.com',
      motDePasse: 'top',
      inscriptionDate: '2019-03-02T16:12:05+02:00',
      abonnement: 'annuel',
      compteTresorerie: ''
    },
    'jules84vhotmailfr': {
      prenom: 'Julien',
      nom: 'Santaolala',
      email: 'jules84v@hotmail;fr',
      motDePasse: 'megatop',
      inscriptionDate: '2019-09-08T16:12:05+02:00',
      abonnement: 'mensuel',
      compteTresorerie: ''
    },
    'johndoecom': {
      prenom: 'John',
      nom: 'Doe',
      email: 'john@doe.com',
      motDePasse: 'megatop',
      inscriptionDate: '2018-06-20T16:12:05+02:00',
      abonnement: 'mensuel',
      compteTresorerie: ''
    }
  },
  abonnement: {
    devis: {
      '20180815-77': {
        entreprise: 'Eleius Marketing',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Recettages et maintenances PME X',
        date: '2019-11-23T14:58:35.073Z',
        dateStatus: '2018-11-23T14:58:35.073Z',
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 2900,
        acompte: 30,
        status: 'Visionné',
        secureURL: 'LtkCKYRG84cPMbztFgFAQ9dnFMEzQFNOC9qM83jjivpoC252ZVaVa1pZ78bwzco4V5h6JeBWUThfwJROgvpODYKEqpQ4DQzT1AiOlRiFEWC0HHY40ozzAGuaD6j741Zs',
        proposition: {
          probleme: 'ceci est le problème',
          solution: 'ceci est la solution',
          planification: 'ceci est le planning',
          servicesAdditionnels: 'ceci est le service add',
          pourquoi: 'ceci est le pourquoi',
          temoignages: 'ceci est le témoignage',
          note: '',
          conditions: ''
        }
      },
      '20180915-78': {
        entreprise: 'EquidAssur',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Refonte application web',
        date: '2019-10-15T14:58:35.073Z',
        dateStatus: '2018-11-23T14:58:35.073Z',
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 2500,
        acompte: 30,
        status: 'Brouillon',
        secureURL: 'LtkCKYRG84cPMbztFgFAQ9gezvezQFNOC9qM83jjivpoC252ZVaVa1pZ78bwzco4V5h6JeBWUThfwJROgvpODYKEqpQ4DQzT1AiOlRiFEWC0HHY40ozzAGuaD6j741Zs',
        proposition: ''
      },
      '20180913-79': {
        entreprise: 'Agence Z',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Retainer quanta',
        date: '2019-10-20T14:58:35.073Z',
        dateStatus: '2018-11-23T14:58:35.073Z',
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 3200,
        acompte: 30,
        status: 'Visionné',
        secureURL: 'LtkCKYRG84cPMbztFgFAQ9gezvezQFNOC9qM83jjivpoC252ZVaVa1pZ78bwzco4V5sfezfezRgvpODYKEqpQ4DQzT1AiOlRiFEWC0HHY40ozzAGuaD6j741Zs',
        proposition: ''
      },
      '20180915-80': {
        entreprise: 'ArlesEvents',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Webdesign interface mobileapp',
        date: '2019-11-09T14:58:35.073Z',
        dateStatus: '2018-11-23T14:58:35.073Z',
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 2900,
        acompte: 30,
        status: 'Envoyé',
        secureURL: 'LtkCKYRG84cPMbztFgFAQ9gezvezQFNOC9qM83jjivpoC252ZVaVa1pZ78bwzco4V5h6FZFZFevfdvfdZKEqpQ4DQzT1AiOlRiFEWC0HHY40ozzAGuaD6j741Zs',
        proposition: {
          probleme: {},
          solution: {},
          planification: {},
          servicesAdditionnels: {},
          pourquoi: {},
          temoignages: {},
          note: {},
          conditions: 'La condtion a été changée dans firebase'
        }
      },
      '20180915-81': {
        entreprise: 'Agence X',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Recettes agence web',
        date: '2019-12-18T14:58:35.073Z',
        dateStatus: '2018-11-23T14:58:35.073Z',
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 1500,
        acompte: 30,
        status: 'Signé',
        dateStatus: '2018-11-23T14:58:35.073Z',
        secureURL: 'LtkCKYRG84cPMbztFgFAQ9gezvezQFNOC9qM83jjivpoC252ZVaVa1pZ78FDFSDSFzefzfOgvpODYKEqpQ4DQzT1AiOlRiFEWC0HHY40ozzAGuaD6j741Zs',
        proposition: ''
      },
      '20180915-82': {
        entreprise: 'Alphalyr',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Application react pour eleius',
        date: '2019-12-23T14:58:35.073Z',
        dateStatus: '2018-11-23T14:58:35.073Z',
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 2850,
        acompte: 30,
        status: 'Brouillon',
        secureURL: 'LtkCKYRG84cPMbztFgFAQ9gezvezQFNOC9qM83jjivpoC252ZVaVa178nfbdsfhs5h6JeBWUThfwJROgvpODYKEqpQ4DQzT1AiOlRiFEWC0HHY40ozzAGuaD6j741Zs',
        proposition: ''
      }
    },
    factures:  {
      '20190618-15': {
        entreprise: 'Dolead',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Ajout multilangue ES/IT',
        date: '2019-05-15T14:58:35.073Z',
        delaiPaiement: 45,
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 850.68,
        acompte1montant: 360,
        acompte1Date: '09-11-2018',
        acompte1Numero: '20180911-10',
        status: 'Payée',
        reglement: 'Virement bancaire',
        dateStatus: '2019-08-29T14:58:35.073Z',
      },
      '20190113-14': {
        entreprise: 'Adloop',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Développement site web Adloop',
        date: '2019-05-15T14:58:35.073Z',
        delaiPaiement: 45,
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 2600,
        acompte1montant: 360,
        acompte1Date: '09-11-2018',
        acompte1Numero: '20180911-10',
        status: 'Payée',
        reglement: 'Virement bancaire',
        dateStatus: '2019-03-08T14:58:35.073Z'
      },
      '20190511-13': {
        entreprise: 'Dolead',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Intégration site web Wordpress',
        date: '2019-05-11T14:58:35.073Z',
        delaiPaiement: 45,
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 2850,
        status: 'Brouillon',
        reglement: 'Virement bancaire',
        dateStatus: '2019-05-11T14:58:35.073Z'
      },
      '20190310-8': {
        entreprise: 'Enfine',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Site web Wordpress',
        date: '2019-03-10T14:58:35.073Z',
        delaiPaiement: 45,
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 360,
        acompte1montant: 360,
        acompte1Date: '09-11-2018',
        acompte1Numero: '20180911-10',
        status: 'Impayée',
        reglement: 'Virement bancaire',
        dateStatus: '2019-03-10T14:58:35.073Z'
      },
      '20190102-9': {
        entreprise: 'Alphalyr',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Application react pour eleius',
        date: '2019-01-02T14:58:35.073Z',
        delaiPaiement: 45,
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 360,
        acompte1montant: 360,
        acompte1Date: '09-11-2018',
        acompte1Numero: '20180911-10',
        status: 'Impayée',
        reglement: 'Virement bancaire',
        dateStatus: '2019-01-02T14:58:35.073Z'
      },
      '20190402-10': {
        entreprise: 'Alphalyr',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Application react pour eleius',
        date: '2019-04-02T14:58:35.073Z',
        delaiPaiement: 45,
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 1200,
        acompte1montant: 360,
        acompte1Date: '09-11-2018',
        acompte1Numero: '20180911-10',
        status: 'Envoyée',
        reglement: 'Virement bancaire',
        dateStatus: '2019-01-05T14:58:35.073Z'
      },
      '20190515-11': {
        entreprise: 'Quanta',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Développement React application',
        date: '2019-05-15T14:58:35.073Z',
        delaiPaiement: 45,
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 2900,
        acompte1montant: 360,
        acompte1Date: '09-11-2018',
        acompte1Numero: '20180911-10',
        status: 'Payée',
        reglement: 'Virement bancaire',
        dateStatus: '2019-05-15T14:58:35.073Z'
      },
      '20190522-12': {
        entreprise: 'Agence X Prime',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Intégration maquette Noemis',
        date: '2019-05-22T14:58:35.073Z',
        delaiPaiement: 45,
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 2300,
        acompte1montant: 360,
        acompte1Date: '09-11-2018',
        acompte1Numero: '20180911-10',
        status: 'Payée',
        reglement: 'Virement bancaire',
        dateStatus: '2019-05-22T14:58:35.073Z'
      },
      '20180315-1': {
        entreprise: 'Agence Augural Strateo',
        nom: 'Montana',
        prenom: 'Tony',
        adresse: 'Bidule truc de truc',
        cp: 75017,
        ville: 'Paris',
        pays: 'France',
        titre: 'Intégrations et recettages sites web',
        date: '2018-03-15T14:58:35.073Z',
        delaiPaiement: 45,
        description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
        tjm: 400,
        montant: 3400,
        status: 'Payée',
        reglement: 'Virement bancaire',
        dateStatus: '2018-04-18T14:58:35.073Z'
      }
    },
    contrats: {
      '000000001': {
        client: 'Flitdesk',
        description: 'Maintenance Flitdesk 6 mois',
        date: '2020-01-23T14:58:35.073Z',
        status: 'Signé'
      },
      '000000002': {
        client: 'Quanta',
        description: 'Intégration de 12 cas clients',
        date: '2019-09-14T14:58:35.073Z',
        status: 'Signé'
      },
      '000000003': {
        client: 'Luxus',
        description: 'Développement application React',
        date: '2019-11-28T14:58:35.073Z',
        status: 'Signé'
      },
      '000000004': {
        client: 'Dolead',
        description: 'Maintenance site web Wordpress 12 mois',
        date: '2020-03-21T14:58:35.073Z',
        status: 'Envoyé'
      },
      '000000005': {
        client: 'Flitdesk',
        description: 'Maintenance Flitdesk 6 mois',
        date: '2020-01-23T14:58:35.073Z',
        status: 'Signé'
      },
      '000000006': {
        client: 'Quanta',
        description: 'Intégration de 12 cas clients',
        date: '2019-09-14T14:58:35.073Z',
        status: 'Signé'
      },
      '000000007': {
        client: 'Luxus',
        description: 'Développement application React',
        date: '2019-11-28T14:58:35.073Z',
        status: 'Signé'
      },
      '000000008': {
        client: 'Dolead',
        description: 'Maintenance site web Wordpress 12 mois',
        date: '2020-03-21T14:58:35.073Z',
        status: 'Envoyé'
      },
      '000000009': {
        client: 'Flitdesk',
        description: 'Maintenance Flitdesk 6 mois',
        date: '2020-01-23T14:58:35.073Z',
        status: 'Signé'
      },
      '000000010': {
        client: 'Quanta',
        description: 'Intégration de 12 cas clients',
        date: '2019-09-14T14:58:35.073Z',
        status: 'Signé'
      },
      '000000011': {
        client: 'Luxus',
        description: 'Développement application React',
        date: '2019-11-28T14:58:35.073Z',
        status: 'Signé'
      },
      '0000000012': {
        client: 'Dolead',
        description: 'Maintenance site web Wordpress 12 mois',
        date: '2020-03-21T14:58:35.073Z',
        status: 'Envoyé'
      }
    },
    clients: {
      'Agence Augural Strateo': {
        paiement: '20j',
        prestationDefaut: 'forfait',
        note: 'ultra pas top le paiement à 70 jours'
      },
      'Agence X Prime': {
        paiement: '20j',
        prestationDefaut: 'forfait',
        note: 'ultra pas top le paiement à 70 jours'
      },
      'Alphalyr': {
        paiement: '20j',
        prestationDefaut: 'forfait',
        note: 'ultra pas top le paiement à 70 jours'
      },
      'Quanta': {
        paiement: '20j',
        prestationDefaut: 'forfait',
        note: 'ultra pas top le paiement à 70 jours'
      },
      'Enfine': {
        paiement: '20j',
        prestationDefaut: 'forfait',
        note: 'ultra pas top le paiement à 70 jours'
      },
      'Adloop': {
        paiement: '20j',
        prestationDefaut: 'forfait',
        note: 'ultra pas top le paiement à 70 jours'
      },
      'Dolead': {
        paiement: '20j',
        prestationDefaut: 'forfait',
        note: 'ultra pas top le paiement à 70 jours'
      }
    },
    configuration: {
      prenom: 'Julien',
      nom: 'Lucas',
      email: 'jules84000@yahoo.fr',
      password: 'ultramegatop',
      inscriptionDate: '2018-06-20T16:12:05+02:00',
      abonnement: 'mensuel',
      compteBankinID: '',
      compteBankinCBID: '',
      // compteCB: '',
      entreprise: {
        nom: 'Ma super entreprise',
        rue: '10 Impasse Pierre Piquet',
        ville: 'MONTFAVET',
        cp: 84140,
        pays: 'France',
        email: 'contact@julienlucas.com',
        telephone: '0676750719',
        siteweb: 'www.julienlucas.com',
        status: 'Micro-entrepreneur',
        logo: 'data:image/png;base64,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',
        fuseauHoraire: '+1',
        tarifHoraire: 50,
        siret: '7874837847832',
        rcs: '748238',
        statusEntreprise: 'AE',
        typeCotisation: 'Services'
      },
      paiements: {
        modePaiement: {
          stripe: false,
          paypal: false,
          rib: true,
          cheque: true
        },
        rib: {
          ready: true,
          nomBanque: 'Boursorama',
          domiciliation: 'Boursorama Banque 44 rue Traversière 92772 BOULOGNE-BILLANCOURT CEDEX ',
          bic: 'BOUS FRPP XXX',
          iban: 'FR76 4061 8802 7900 0400 0494 143',
          rib: {
            codeBanque: '40618',
            codeGuichet: '80279',
            numeroCompte: '00040004941',
            cleRIB: '43'
          }
        },
        cheque: {
          ready: true,
          domiciliation: '113 rue des Tenturiers, 75008 Paris — France'
        }
      }
    }
  }
}).then(() => {
  console.log('Données sauvegardées');
}).catch((e) => {
  console.log('Echec sauvegarde données', e);
});

export { firebase, database as default };
