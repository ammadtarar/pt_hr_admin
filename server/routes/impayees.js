const express = require('express')
const app = express()
const firebase = require("firebase")
const database = firebase.database()

app.get('/impayees', (req, res) => {
  database.ref('abonnement/factures').orderByChild('status').equalTo('Impayée').once('value', (snapshot) => {
    const val = snapshot.val()
    res.send(val);
  });
});

module.exports = app;
