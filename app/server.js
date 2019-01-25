
const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const watson = require('watson-developer-cloud');
const passport = require('passport');
// const userController = require('./controllers/userController');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(bodyParser.json())

app.get('/', (req, res) => {res.sendFile('views/index.html' , { root : __dirname});})
app.get('/feed', (req, res) => {res.sendFile('views/feed.html' , { root : __dirname});})
app.get('/history', (req,res) => {res.sendFile('views/history.html' , { root : __dirname});})
app.get('/createentry', (req,res) => {res.sendFile('views/createentry.html' , { root : __dirname});})


// app.use('/users', userController)
app.use(express.static(__dirname + '/public'));


const port = 3000;

app.listen(port, () => {
    console.log(`Listening on Port:${port}`)
});