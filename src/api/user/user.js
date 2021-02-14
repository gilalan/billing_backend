const restful = require('node-restful');
const mongoose = restful.mongoose;

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, select: false },
    firstAccess: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = restful.model('User', userSchema);