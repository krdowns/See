
const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const watson = require('watson-developer-cloud');
const passport = require('passport');
const ctrl = require('./controllers');
const userRoutes = require('./routes/user')
const app = express();

// MIDDLEWARE //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(bodyParser.json())

// HTML ENDPOINTS //
app.get('/', (req, res) => {res.sendFile('views/index.html' , { root : __dirname});})
app.get('/feed', (req, res) => {res.sendFile('views/feed.html' , { root : __dirname});})
app.get('/history', (req,res) => {res.sendFile('views/history.html' , { root : __dirname});})
app.get('/createentry', (req,res) => {res.sendFile('views/createentry.html' , { root : __dirname});})
app.get('/emergency', (req,res) => {res.sendFile('views/emergency.html' , { root : __dirname});})

app.use(express.static(__dirname + '/public'));
// ROUTES: Entries //

//Create
app.post('/api/entries', ctrl.entry.create);

//Read
app.get('/api/entries', ctrl.entry.read);

//Update
app.put('/api/entries/:id', ctrl.entry.update);

//Delete
app.delete('/api/entries/:id', ctrl.entry.delete);


//  ROUTES FOR LOGIN AND SIGNUP //
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

app.post('/verify', verifyToken, (req, res) => {
  let verified= jwt.verify(req.token, 'debbie')
  console.log("verified: ", verified)
  res.json(verified)
})


// SAMPLE PROTECTED ROUTE!
// protected route - a route only a user with a jwt token in their header can access.
app.post('/protectedPage', verifyToken, (req, res) => {
  console.log(req.token)
  jwt.verify(req.token, 'waffles', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created',
        authData
      });
    }

  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Tokenj 
function verifyToken(req, res, next) {
  console.log("in verify...");
  // Get auth header value
  // when we send our token, we want to send it in our header
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader)
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}


app.listen( 3000, () => console.log("Listening on Port 3000"))