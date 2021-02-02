const mongoose               = require("mongoose"),
      date                   = new Date


const ClientSchema = new mongoose.Schema({
  name: {type: String, required: true},
  phoneNumber1: {type: String, required: true},
  phoneNumber2: {type: String},
  phoneNumber3: {type: String},
  age: {type: String},
  qualification: {type: String},
  occupation: {type: String},
  course: {type: String},
  impression: {type: String},
  date: {type: String},
  notes: {type: String}
})




module.exports = mongoose.model("Client",ClientSchema);
