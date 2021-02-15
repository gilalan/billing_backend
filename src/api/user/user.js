const restful = require('node-restful');
const mongoose = restful.mongoose;

const userSchema = new mongoose.Schema({
    name: { type: String, min: 3, max: 60, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, min: 6, max: 20, required: true },
    firstAccess: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = restful.model('User', userSchema);