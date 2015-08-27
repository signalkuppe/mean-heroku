var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema,
    ModelSchema  = new Schema({
      title: {
        required: true,
        type: String
      },
      mdate: {
        type: Date,
        default: Date.now
      }
    });


mongoose.model('Model', ModelSchema);
