
const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();



app.get('/', (req, res) => {res.sendFile('views/index.html' , { root : __dirname});})
app.get('/feed', (req, res) => {res.sendFile('views/feed.html' , { root : __dirname});})
app.get('/history', (req,res) => {res.sendFile('views/history.html' , { root : __dirname});})
app.get('/createentry', (req,res) => {res.sendFile('views/createentry.html' , { root : __dirname});})


const port = 3000;

app.listen(port, () => {
    console.log(`Listening on Port:${port}`)
});