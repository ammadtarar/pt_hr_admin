const express = require('express')
const app = express()
const firebase = require("firebase")
const database = firebase.database()

app.get('/devis', function(req, res, next) {
  database.ref('abonnement/devis/').once('value', (snapshot) => {
    const val = snapshot.val()
    res.send(val);
  });
});

module.exports = app;
