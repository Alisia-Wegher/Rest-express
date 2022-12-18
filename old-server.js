const express = require("express");
const fs = require("fs");
let stringaLetta = fs.readFileSync("./prod.json","utf8");
let prodotti = [];

prodotti = JSON.parse(stringaLetta);
//console.log(prodotti);

var bodyParser = require('body-parser');
const { request } = require("http");
var app = express();

app.get('/prodotti', (req, res) => {
    res.status(200).end(JSON.stringify(prodotti));
});
app.get('/categorie', (req, res) => {
    //let categorie = prodotti.map((c)=>c.categoria);
    let categorie = [new Set(prodotti.map((c)=>c.categoria))];
    //res.status(200).end("elenco categorie");
    res.status(200).end(JSON.stringify(categorie));
});
/*app.get('/scheda/:id', (req, res) => {
    let idProd = req.params.id;
    let scheda = prodotti.filter((p)=>{return p.id=idProd});
    if(scheda.length>0){
        res.status(200).end(JSON.stringify(scheda));
    }
    else{
        res.status(404).end("Prodotto non trovato");
    }
});*/
app.put('/aggiorna/:id', (req, res) => {
        res.status(200).end("Prodotto aggiornato");
});
app.post('/aggiungi', (req, res) => {
    res.status(200).end("Prodotto aggiunto");
});

var server = require('http').createServer(app).listen(8088);
console.log("Server in ascolto alla porta " + 8088);