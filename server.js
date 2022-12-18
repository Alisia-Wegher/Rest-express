const express = require('express');
const app = express();
const fs = require("fs");
let prodottiRaw = fs.readFileSync("./prod.json","utf8");
let prodotti = [];

prodotti = JSON.parse(prodottiRaw);

app.get('/', (req, res) => {
  res.status(200).end(JSON.stringify(prodotti));
});

var server = require('http').createServer(app).listen(8088);
console.log("Server in ascolto alla porta " + 8088);