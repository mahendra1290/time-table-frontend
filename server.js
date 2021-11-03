const express = require("express");
const path = require("path");

const ngApp = express();

ngApp.use(express.static("./dist/angular-frontend"));

ngApp.get("/*", function (request, response) {
  response.sendFile(path.join(__dirname, "/dist/angular-frontend/index.html"));
});

// https://fcm.googleapis.com/fcm/send/d1ryybvqUqg:APA91bGvbexgll_sljQ8nsxFNEZYrPIWNNFylR2JTekoeAq3vBgsPG5Kgj9HXd5EAm4K6kyZzoarBb7NnlwZPbZdS0Oz_yn3xRV_C_5yVrf3CgJY7IVyvH-GFiLhu7iwzgcCBFxb9SyT

ngApp.listen(process.env.PORT || 8080);
