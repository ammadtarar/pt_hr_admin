const express = require('express')
const app = express()
const axios = require('axios')
const CircularJSON = require('circular-json')
const firebase = require("firebase")
const database = firebase.database()
const dotenv = require('dotenv').config()

app.get("/comptes", (req, res) => {
  const clientID = process.env.BANKIN_CLIENT_ID
  const clientSecret = process.env.BANKIN_CLIENT_SECRET

  // Get client access token
  axios({
    method: 'POST',
    url: `https://sync.bankin.com/v2/authenticate?email=jules84v%40hotmail.fr&password=Goulious213084v&client_id=${clientID}&client_secret=${clientSecret}`,
    headers: {'Bankin-Version': '2018-06-15'},
    responseType: 'json'
  })
  .then(value => {
    var accessToken = value.data.access_token

    //Gets all comptes
    axios({
      method: 'GET',
      url: `https://sync.bankin.com/v2/accounts?limit=10&client_id=${clientID}&client_secret=${clientSecret}`,
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Bankin-Version': '2018-06-15'
      }
    })
    .then((data) => {
      let json = CircularJSON.stringify(data);
      res.send(json);
    })
    .catch((error) => {
      console.log(error)
    })
  })
  .catch(error => {
    console.log(error)
  })
});

module.exports = app;
