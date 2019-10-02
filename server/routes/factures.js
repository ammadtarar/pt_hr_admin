const express = require('express')
const app = express()
const firebase = require("firebase")
const database = firebase.database()

app.get('/factures', (req, res) => {
  const currentYear = new Date().getFullYear();
  database.ref('abonnement/factures').orderByChild('date').startAt(currentYear).once('value', (snapshot) => {
    const val = snapshot.val()
    res.send(val);
  });
});

module.exports = app;
