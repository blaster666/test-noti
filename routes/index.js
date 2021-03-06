var express = require('express');
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var router = express.Router();
var Model = require('../model/model');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/feeds', function(req, res, next) {
  let feed = require('../utils/feed')
  res.json(feed.getFeed())
})

router.get('/review/:id', function(req, res, next) {
  let getFeed = require('../utils/getFeed')
  res.json(getFeed.findFeed(req.params.id))
})

router.post('/post', function(req, res, next) {
  res.json()
})

router.post('/comment', function(req, res, next) {
  res.json()
})

router.post('/subscribe', function(req, res, next) {
  Model.notification()
  res.send('ok')
})

router.post('/testpush',function(req, res, next){
  Model.testPush(req.body);
  res.send('testPush')
})
router.get('/testretrieve',function(req, res, next){
  Model.testRetrieve();
  res.send('testRetrieve')
})

router.post('/login', function(req, res, next) {
  //authen 
  const email = req.body.email
  const password = req.body.password
  Model.login(email, password)
    .then((data)=>res.status(200).send(data))
    .catch((err)=>res.status(401).send(err))
  
})
router.post('/register', function(req, res, next) {
  const name = req.body.name
  const email = req.body.email
  const password_hashed = bcrypt.hashSync(req.body.password, 10)

  Model.register(email, password_hashed).then((data)=>{
    res.status(200).send(data)
  }).catch((data)=>{
    res.status(401).send(data)
  })
})

module.exports = router;



