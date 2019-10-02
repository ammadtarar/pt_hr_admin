const express = require('express');
const app = express();
const firebase = require("firebase");
const database = firebase.database()

app.get('/livre-recettes', (req, res) => {
  const yyyy = new Date().getFullYear();
  database.ref('abonnement/factures').orderByChild('dateStatus').startAt(yyyy+'-01').endAt(yyyy+'-12').once('value', (snapshot) => {
    const val = snapshot.val()
    res.send(val);
  });
});

module.exports = app;
