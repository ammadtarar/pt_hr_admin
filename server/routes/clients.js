const express = require('express')
const app = express()
const firebase = require("firebase")
const database = firebase.database()

app.get('/datas-clients', function(req, res, next) {
  database.ref('abonnement/factures').orderByChild('entreprise').on('value', (snapshot) => {
    const clients = snapshot.val();
    const newState = [];
    for (let item in clients) {
      newState.push({
        client: clients[item].entreprise
      })

      database.ref('abonnement/factures').orderByChild('entreprise').startAt(clients[item].entreprise).endAt(clients[item].entreprise).on('value', (snapshot) => {
        const val = snapshot.val();
        if (snapshot.exists()){
          const newState = []
          var data = []
          var total = 0

          for (let item in val) {
            newState.push({
              montant: val[item].montant
            })
          }
          for (var i = 0; i < newState.length; i++) {
            total += newState[i].montant
          }
        }
      })
    }
    res.send(newState)
  })
})

module.exports = app;
