const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
      type: String,
      enum: ["user", "admin"], 
      default: "user",
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User
