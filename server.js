const express = require('express');
const app = express();
const fs = require("fs");
let prodottiRaw = fs.readFileSync("./prod.json","utf8");
let prodotti = [];

prodotti = JSON.parse(prodottiRaw);

app.get('/prodotti', (req, res) => {
  res.status(200).end(JSON.stringify(prodotti));
});

//1: scheda prodotto in base all'id
app.get('/scheda/:id', (req, res) => {
    let idProd = req.params.id;
    let scheda = prodotti.filter((p)=>{return p.id=idProd});
    if(scheda.length>0){
        res.status(200).end(JSON.stringify(scheda));
    }
    else{
        res.status(404).end("Prodotto non trovato");
    }
});

//2: elenco categorie
app.get('/categorie', (req, res) => {
    let categorie = [...new Set(prodotti.map((c)=>c.categoria))];
    res.status(200).end(JSON.stringify(categorie));
});

//3: elenco prodotti data la categoria
app.get('/prodotti/:categoria', (req, res) => {
    let catProd = req.params.categoria;
    let prodFiltered = prodotti.filter((p)=>{return p.categoria=catProd});
    res.status(200).end(JSON.stringify(prodotti));
});

//4: elenco prodotti 
//5: 10 prodotti + costosi
//6: aggiornare il prezzo dato un ID
//7: inserire un nuovo articolo

var server = require('http').createServer(app).listen(8088);
console.log("Server in ascolto alla porta " + 8088);