var mongoose = require('mongoose'),
    Model = mongoose.model('Model');


exports.create= function (req,res) {

  var model = new Model(req.body);

   model.save(function (err) {
       if (err) {
        res.status(400).send(err);
       }
       else {
        res.status(200).send(model);
       }

   });

};

exports.read= function (req,res) {

  Model.find(function(err, result) {
      if (err) {
        res.status(400).send(err);
      }
      else {
          res.send(result)
      }
  });

};

exports.update = function (req,res) {

  var m = req.body;
      m.mdate = new Date();

  Model.findById(req.params.id, function (err, model) {
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
