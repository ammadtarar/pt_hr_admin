const axios = require('axios')
const CircularJSON = require('circular-json')
const firebase = require("firebase")
const database = firebase.database()

// Socket IO real-time
exports = module.exports = function(io){
  io.on('connection', (client) => {
    client.on('choix comptes', (data) => {
      database.ref('abonnement/configuration')
        .update({
          compteBankinID: data.compteID,
          compteBankinCBID: data.compteCBID
        })
        .then(snapshot => {
        })
        .catch(err=>{
          console.log()
        })
    })

    client.on('desynchronisation bankin', (client) => {
      database.ref('abonnement/configuration')
        .update({
          compteBankinID: '',
          compteBankinCBID: ''
        })
        .then(snapshot => {
        })
        .catch(err=>{
          console.log()
        })
    })

    client.on('synchronisation bankin', (data) => {
      const clientID = process.env.BANKIN_CLIENT_ID
      const clientSecret = process.env.BANKIN_CLIENT_SECRET
      const email = data.email
      const password = data.password

      //Create user account
      axios({
        method: 'POST',
        url: `https://sync.bankin.com/v2/users?email=${email}&password=${password}&client_id=${clientID}&client_secret=${clientSecret}`,
        headers: {'Bankin-Version': '2018-06-15'},
        responseType: 'json'
      })
      .then(value => {
        // Authenticate user
        axios({
          method: 'POST',
          url: `https://sync.bankin.com/v2/authenticate?email=${email}&password=${password}&client_id=${clientID}&client_secret=${clientSecret}`,
          headers: {'Bankin-Version': '2018-06-15'},
          responseType: 'json'
        })
        .then(value => {
          // Connect account
          var accessToken = value.data.access_token
          axios({
            url: `https://sync.bankin.com/v2/connect/items/add/url?client_id=${clientID}&client_secret=${clientSecret}`,
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Bankin-Version': '2018-06-15'
            },
            responseType: 'json'
          })
          .then(value => {
            const url = value.data.redirect_url
            // Emit url Bankin for connection to bank
            io.emit('URLConnectBankin', url)
            // Get all accounts from user
            axios({
              url: `https://sync.bankin.com/v2/items?client_id=${clientID}&client_secret=${clientSecret}`,
              headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Bankin-Version': '2018-06-15'
              },
              responseType: 'json'
            })
            .then(value => {
              console.log(value)
              let json = CircularJSON.stringify(value);
            })
          })
        })
      })
      .catch(error => {
        console.log(error)
      })
    });

  });
}
