const express = require('express');
const bodyParser = require('body-parser');
const watson = require('watson-developer-cloud');
const passport = require('passport');
const ctrl = require('./controllers');
const userRoutes = require('./routes/user');
const jwt = require('jsonwebtoken')
const app = express();
const db = require('./models');

// MIDDLEWARE //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(bodyParser.json())

// HTML ENDPOINTS //
app.get('/', (req, res) => {res.sendFile('views/index.html' , { root : __dirname});})
app.get('/createentry', (req,res) => {res.sendFile('views/createentry.html' , { root : __dirname});})
app.get('/emergency', (req,res) => {res.sendFile('views/emergency.html' , { root : __dirname});})
app.get('/feed', (req, res) => {res.sendFile('views/feed.html' , { root : __dirname});})
app.get('/history', (req,res) => {res.sendFile('views/history.html' , { root : __dirname});})
app.get('/settings', (req, res) => {res.sendFile('views/settings.html' , { root : __dirname});})
app.get('/signup', (req,res) => {res.sendFile('views/signup.html' , { root : __dirname});})

app.use(express.static(__dirname + '/public'));

// ROUTES //

//Create
app.post('/api/entries', ctrl.entry.create);
app.post('/api/contacts', ctrl.contact.create);

//Read
app.get('/api/entries', ctrl.entry.read);
app.get('/api/contacts', ctrl.contact.read);

//Update
app.put('/api/entries/:id', ctrl.entry.update);
// app.put('/api/contacts/:id', (req,res)=> {
//     if (req.jwt.userInfo!==undefined) {
//       db.Contact.findOneAndUpdate(
//         {'_id': req.jwt.userId},
//         {'$set': req.body},
//         {upsert: true},
//       )
//     } else {
//       res.status(console.log(err))
//     }
// })

app.put('/contacts/:id', function(req, res, next){
  Contact.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
    Contact.findOne({_id:req.params.id}).then(function(contact){
      res.send(contact);
    });
  }).catch(next);
  // res.send({type:'PUT'});
});

//Delete
app.delete('/api/entries/:id', ctrl.entry.delete);
app.delete('/contacts/:id', (req, res) => {
  let contactId = req.params.id;

  db.Contact.deleteOne({
      _id: contactId
    },
    (err, deletedId) => {
      if (err) {
        return console.log(err)
      };
      res.json(deletedId);
    });
});

//Filter
app.get('/api/entries/:userId', ctrl.entry.filter);




//  ROUTES  //
app.use('/user', userRoutes);
// app.ust('/entry', entryRoutes);



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
app.post('/settings', verifyToken, (req, res) => {
  jwt.verify(req.token, 'debbie', (err, authData) => {
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

// Verify Token 
function verifyToken(req, res, next) {
  console.log("in verify...");
  // Get auth header value
  // when we send our token, we want to send it in our header
  const bearerHeader = req.headers['authorization'];
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