const express=require('express');
const router= express.Router();
const Ninja= require('../models/ninjas');

router.get('/ninjas', function(req, res,next){
//  console.log("GET request");
//  res.send({type:"GET"});
  Ninja.geoNear(
        {type:"Point", coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
        {maxDistance:10000, spherical:true}
      ).then(function(ninjas){
   res.send(ninjas);
});

});

router.post('/ninjas', function(req, res,next){
  console.log(req.body);
  console.log("post request");
  //var ninja=new Ninja(req.body);
  //ninja.save();
   Ninja.create(req.body).then(function(ninja){
     res.send(ninja);

   }).catch(next);

});

router.put('/ninjas/:id', function(req, res, next){
  console.log("PUT request");
  res.send({type:"PUT"});

  Ninja.findByIdAndUpdate({_id : req.params.id},req.body).then(function(){
    Ninja.findOne({_id :req.params.id}).then(function(ninja){
      res.send(ninja);
    });
  });

});

router.delete('/ninjas/:id', function(req, res,next){
  console.log("DELETE request");
  res.send({type:"DELETE"});

  Ninja.findByIdAndDelete({_id :req.params.id}).then(function(ninja){
    res.send(ninja);
  });
});
module.exports=router;
