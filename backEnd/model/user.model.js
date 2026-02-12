const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { type: string, required: true },
  email: { type: string, required: true, unique: true },
  password: { type: string, required: true },
  Data: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);
