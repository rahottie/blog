const mongoose = require('mongoose')

const UserSchema = mongoose.Schema([
    name : {
        type: String
    },
    email: {
        type: String,
        require: true
    }
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
])

const User = module.exports = mongoose.model('User', UserSchema)