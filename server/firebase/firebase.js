const firebase = require("firebase")
const dotenv = require('dotenv').config()

const config = {
  apiKey: "AIzaSyDkhcVuusnJSvmAUVvbidhax0j4pZpFloU",
  authDomain: "freelanceapp-8fab2.firebaseapp.com",
  databaseURL: "https://freelanceapp-8fab2.firebaseio.com",
  projectId: "freelanceapp-8fab2",
  storageBucket: "freelanceapp-8fab2.appspot.com",
  messagingSenderId: "658642519222"
}

firebase.initializeApp(config)
