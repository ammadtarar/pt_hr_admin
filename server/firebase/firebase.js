const firebase = require("firebase")
const dotenv = require('dotenv').config()

// const config = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
// }

const config = {
  apiKey: "AIzaSyDkhcVuusnJSvmAUVvbidhax0j4pZpFloU",
  authDomain: "freelanceapp-8fab2.firebaseapp.com",
  databaseURL: "https://freelanceapp-8fab2.firebaseio.com",
  projectId: "freelanceapp-8fab2",
  storageBucket: "freelanceapp-8fab2.appspot.com",
  messagingSenderId: "658642519222"
}

firebase.initializeApp(config)
