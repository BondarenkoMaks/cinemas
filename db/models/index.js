const mongoose = require("../.././db").mongoose;
//model for save emails
const filmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    require: true
  },
  length: {
    type: Number,
    require: true
  }

});
const hallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    require: true
  },
  cinema: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cinema'
  }
});
const sessionSchema = new mongoose.Schema({

  date: {
    type: Date,
    required: true

  },
  hall: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hall'
  },

  film: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film'
  }

});
sessionSchema.index({ hall: 1, date: 1 }, { unique: true });


const cinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }

});
let Cinema = mongoose.model("Cinema", cinemaSchema);
let Hall = mongoose.model("Hall", hallSchema);
let Session = mongoose.model("Cian", sessionSchema);
let Film = mongoose.model("Film", filmSchema);
module.exports.cinemaModel = Cinema;
module.exports.hallModel = Hall;
module.exports.seessionModel = Session;
module.exports.filmModel = Film;
