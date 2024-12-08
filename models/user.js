const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);  // we use mongoose plugin because it automatically adds username, salting, hashing and also adds some authentication methods like changePassword

module.exports = mongoose.model("User", userSchema);