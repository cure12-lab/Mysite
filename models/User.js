const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    purchases: [String]
});
module.exports = mongoose.model('User', userSchema);
