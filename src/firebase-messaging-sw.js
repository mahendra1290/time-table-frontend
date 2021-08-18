importScripts("https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js");
firebase.initializeApp({
  apiKey: "AIzaSyAIbpaE-laye99kqwOGh0quT-RCrIl27-g",
  authDomain: "nit-time-table.firebaseapp.com",
  projectId: "nit-time-table",
  storageBucket: "nit-time-table.appspot.com",
  messagingSenderId: "1028567117876",
  appId: "1:1028567117876:web:e1a57f9a8353cec777da61",
  measurementId: "G-Y9RKLZYSWX",
});

const messaging = firebase.messaging();

Notification.requestPermission().then(function (permission) {
  console.log("permiss", permission);
});

messaging
  .getToken({
    vapidKey:
      "BJ7DGYT1XzH-anNghEtE2Os9dtTvZScIMvcnmWzuXZDLodA1mOO168J86ok3tC8yr87wJ0NZmM2J33zo_6Bmutk",
  })
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      console.log(currentToken);
      // ...
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });
