var mongoose = require('mongoose'),
    Model = mongoose.model('Model');


exports.save= function (req,res) {

  var model = new Model(req.body);

   // save the bear and check for errors
   model.save(function (err) {
       if (err) {
        res.status(400).send(err);
       }
       else {
        res.status(200).send(model);
       }

   });

};

exports.get= function (req,res) {

  Model.find(function(err, result) {
      if (err) {
        res.status(400).send(err);
      }
      else {
          res.send(result)
      }
  });

};

exports.put = function (req,res) {

  var m = req.body;
      m.mdate = new Date();

  Model.findById(req.params.id, function (err, model) {
      //update it
      model.update(m, { runValidators: true }, function (err) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).send(m);
        }
      })
  });

};

exports.delete = function (req,res) {
  Model.remove({ _id: req.params.id }, function (err) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.status(200).send();
    }
  });

};
