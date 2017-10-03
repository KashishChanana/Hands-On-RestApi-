const express= require('express');
const routes=require('./routes/api');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');

mongoose.connect("mongodb://localhost/goninja");
mongoose.Promise=global.Promise;

const app =express();

app.use(bodyParser.json());
app.use('/api', routes);

app.use(function(err,req, res, next) {
  console.log(err);
  res.status(422).send({error: err.message});


})

app.listen(2345,function(){
  console.log(" we are now listening to requests on port no. 2345");
});
