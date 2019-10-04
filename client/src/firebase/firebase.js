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

// database.ref().set({
//   clients: {
//     'contactjulienlucascom': {
//       prenom: 'Julien',
//       nom: 'Lucas',
//       email: 'contact@julienlucas.com',
//       motDePasse: 'top',
//       inscriptionDate: '2019-03-02T16:12:05+02:00',
//       abonnement: 'annuel',
//       compteTresorerie: ''
//     },
//     'jules84vhotmailfr': {
//       prenom: 'Julien',
//       nom: 'Santaolala',
//       email: 'jules84v@hotmail;fr',
//       motDePasse: 'megatop',
//       inscriptionDate: '2019-09-08T16:12:05+02:00',
//       abonnement: 'mensuel',
//       compteTresorerie: ''
//     },
//     'johndoecom': {
//       prenom: 'John',
//       nom: 'Doe',
//       email: 'john@doe.com',
//       motDePasse: 'megatop',
//       inscriptionDate: '2018-06-20T16:12:05+02:00',
//       abonnement: 'mensuel',
//       compteTresorerie: ''
//     }
//   },
//   abonnement: {
//     devis: {
//       '20180815-77': {
//         entreprise: 'Eleius Marketing',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Recettages et maintenances PME X',
//         date: '2019-11-23T14:58:35.073Z',
//         dateStatus: '2018-11-23T14:58:35.073Z',
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 2900,
//         acompte: 30,
//         status: 'Visionné',
//         proposition: {
//           probleme: 'ceci est le problème',
//           solution: 'ceci est la solution',
//           planification: 'ceci est le planning',
//           servicesAdditionnels: 'ceci est le service add',
//           pourquoi: 'ceci est le pourquoi',
//           temoignages: 'ceci est le témoignage',
//           note: '',
//           conditions: ''
//         }
//       },
//       '20180915-78': {
//         entreprise: 'EquidAssur',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Refonte application web',
//         date: '2019-10-15T14:58:35.073Z',
//         dateStatus: '2018-11-23T14:58:35.073Z',
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 2500,
//         acompte: 30,
//         status: 'Brouillon',
//         proposition: ''
//       },
//       '20180913-79': {
//         entreprise: 'Agence Z',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Retainer quanta',
//         date: '2019-10-20T14:58:35.073Z',
//         dateStatus: '2018-11-23T14:58:35.073Z',
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 3200,
//         acompte: 30,
//         status: 'Visionné',
//         proposition: ''
//       },
//       '20180915-80': {
//         entreprise: 'ArlesEvents',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Webdesign interface mobileapp',
//         date: '2019-11-09T14:58:35.073Z',
//         dateStatus: '2018-11-23T14:58:35.073Z',
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 2900,
//         acompte: 30,
//         status: 'Envoyé',
//         proposition: {
//           probleme: {},
//           solution: {},
//           planification: {},
//           servicesAdditionnels: {},
//           pourquoi: {},
//           temoignages: {},
//           note: {},
//           conditions: 'La condtion a été changée dans firebase'
//         }
//       },
//       '20180915-81': {
//         entreprise: 'Agence X',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Recettes agence web',
//         date: '2019-12-18T14:58:35.073Z',
//         dateStatus: '2018-11-23T14:58:35.073Z',
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 1500,
//         acompte: 30,
//         status: 'Signé',
//         dateStatus: '2018-11-23T14:58:35.073Z',
//         proposition: ''
//       },
//       '20180915-82': {
//         entreprise: 'Alphalyr',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Application react pour eleius',
//         date: '2019-12-23T14:58:35.073Z',
//         dateStatus: '2018-11-23T14:58:35.073Z',
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 2850,
//         acompte: 30,
//         status: 'Brouillon',
//         proposition: ''
//       }
//     },
//     factures:  {
//       '20190618-15': {
//         entreprise: 'Dolead',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Ajout multilangue ES/IT',
//         date: '2019-05-15T14:58:35.073Z',
//         delaiPaiement: 45,
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 850.68,
//         acompte1montant: 360,
//         acompte1Date: '09-11-2018',
//         acompte1Numero: '20180911-10',
//         status: 'Payée',
//         dateStatus: '2019-08-29T14:58:35.073Z',
//       },
//       '20190113-14': {
//         entreprise: 'Adloop',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Développement site web Adloop',
//         date: '2019-05-15T14:58:35.073Z',
//         delaiPaiement: 45,
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 2600,
//         acompte1montant: 360,
//         acompte1Date: '09-11-2018',
//         acompte1Numero: '20180911-10',
//         status: 'Payée',
//         dateStatus: '2019-03-08T14:58:35.073Z'
//       },
//       '20190511-13': {
//         entreprise: 'Dolead',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Intégration site web Wordpress',
//         date: '2019-05-11T14:58:35.073Z',
//         delaiPaiement: 45,
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 2850,
//         status: 'Brouillon',
//         dateStatus: '2019-05-11T14:58:35.073Z'
//       },
//       '20190310-8': {
//         entreprise: 'Enfine',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Site web Wordpress',
//         date: '2019-03-10T14:58:35.073Z',
//         delaiPaiement: 45,
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 360,
//         acompte1montant: 360,
//         acompte1Date: '09-11-2018',
//         acompte1Numero: '20180911-10',
//         status: 'Impayée',
//         dateStatus: '2019-03-10T14:58:35.073Z'
//       },
//       '20190102-9': {
//         entreprise: 'Alphalyr',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Application react pour eleius',
//         date: '2019-01-02T14:58:35.073Z',
//         delaiPaiement: 45,
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 360,
//         acompte1montant: 360,
//         acompte1Date: '09-11-2018',
//         acompte1Numero: '20180911-10',
//         status: 'Impayée',
//         dateStatus: '2019-01-02T14:58:35.073Z'
//       },
//       '20190402-10': {
//         entreprise: 'Alphalyr',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Application react pour eleius',
//         date: '2019-04-02T14:58:35.073Z',
//         delaiPaiement: 45,
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 1200,
//         acompte1montant: 360,
//         acompte1Date: '09-11-2018',
//         acompte1Numero: '20180911-10',
//         status: 'Envoyée',
//         dateStatus: '2019-01-05T14:58:35.073Z'
//       },
//       '20190515-11': {
//         entreprise: 'Quanta',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Développement React application',
//         date: '2019-05-15T14:58:35.073Z',
//         delaiPaiement: 45,
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 2900,
//         acompte1montant: 360,
//         acompte1Date: '09-11-2018',
//         acompte1Numero: '20180911-10',
//         status: 'Payée',
//         dateStatus: '2019-05-15T14:58:35.073Z'
//       },
//       '20190522-12': {
//         entreprise: 'Agence X Prime',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Intégration maquette Noemis',
//         date: '2019-05-22T14:58:35.073Z',
//         delaiPaiement: 45,
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 2300,
//         acompte1montant: 360,
//         acompte1Date: '09-11-2018',
//         acompte1Numero: '20180911-10',
//         status: 'Payée',
//         dateStatus: '2019-05-22T14:58:35.073Z'
//       },
//       '20180315-1': {
//         entreprise: 'Agence Augural Strateo',
//         nom: 'Viellard',
//         prenom: 'Etienne',
//         adresse: 'Bidule truc de truc',
//         cp: 75017,
//         ville: 'Paris',
//         pays: 'France',
//         titre: 'Intégrations et recettages sites web',
//         date: '2018-03-15T14:58:35.073Z',
//         delaiPaiement: 45,
//         description: 'Site sur mesure ayant des propriete magiques en creation de leads absoluement geniaux qui vaut multiplie par 4, voire 5 ou 6 vos revenus et ainsi augmenter votre CA à une échelle où il n yra plus aucune raison d embaucher des salaries a plein temps',
//         tjm: 400,
//         montant: 3400,
//         status: 'Payée',
//         dateStatus: '2018-04-18T14:58:35.073Z'
//       }
//     },
//     clients: {
//       'Agence Augural Strateo': {
//         paiement: '20j',
//         prestationDefaut: 'forfait',
//         note: 'ultra pas top le paiement à 70 jours'
//       },
//       'Agence X Prime': {
//         paiement: '20j',
//         prestationDefaut: 'forfait',
//         note: 'ultra pas top le paiement à 70 jours'
//       },
//       'Alphalyr': {
//         paiement: '20j',
//         prestationDefaut: 'forfait',
//         note: 'ultra pas top le paiement à 70 jours'
//       },
//       'Quanta': {
//         paiement: '20j',
//         prestationDefaut: 'forfait',
//         note: 'ultra pas top le paiement à 70 jours'
//       },
//       'Enfine': {
//         paiement: '20j',
//         prestationDefaut: 'forfait',
//         note: 'ultra pas top le paiement à 70 jours'
//       },
//       'Adloop': {
//         paiement: '20j',
//         prestationDefaut: 'forfait',
//         note: 'ultra pas top le paiement à 70 jours'
//       },
//       'Dolead': {
//         paiement: '20j',
//         prestationDefaut: 'forfait',
//         note: 'ultra pas top le paiement à 70 jours'
//       }
//     },
//     configuration: {
//       prenom: 'Julien',
//       nom: 'Lucas',
//       email: 'jules84000@yahoo.fr',
//       password: 'ultramegatop',
//       inscriptionDate: '2018-06-20T16:12:05+02:00',
//       abonnement: 'mensuel',
//       compteBankinID: '',
//       compteBankinCBID: '',
//       // compteCB: '',
//       entreprise: {
//         nom: 'Ma super entreprise',
//         rue: '10 Impasse Pierre Piquet',
//         ville: 'MONTFAVET',
//         cp: 84140,
//         pays: 'France',
//         email: 'contact@julienlucas.com',
//         telephone: '0676750719',
//         siteweb: 'www.julienlucas.com',
//         status: 'Micro-entrepreneur',
//         logo: '',
//         fuseauHoraire: '+1',
//         tarifHoraire: 50,
//         siret: '7874837847832',
//         rcs: '748238',
//         statusEntreprise: 'AE',
//         typeCotisation: 'Services'
//       },
//       paiements: {
//         modePaiement: {
//           stripe: false,
//           paypal: false,
//           rib: true,
//           cheque: true
//         },
//         rib: {
//           ready: true,
//           nomBanque: 'Boursorama',
//           domiciliation: 'Boursorama Banque 44 rue Traversière 92772 BOULOGNE-BILLANCOURT CEDEX ',
//           bic: 'BOUS FRPP XXX',
//           iban: 'FR76 4061 8802 7900 0400 0494 143',
//           rib: {
//             codeBanque: '40618',
//             codeGuichet: '80279',
//             numeroCompte: '00040004941',
//             cleRIB: '43'
//           }
//         },
//         cheque: {
//           ready: true,
//           domiciliation: '113 rue des Tenturiers, 75008 Paris — France'
//         }
//       }
//     }
//   }
// }).then(() => {
//   console.log('Données sauvegardées');
// }).catch((e) => {
//   console.log('Echec sauvegarde données', e);
// });

export { firebase, database as default };
