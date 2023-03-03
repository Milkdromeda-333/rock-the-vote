const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username.'],
        maxlength: 20,
        unique: true,
        trim: true
    },
    memberSince: {
        type: Date,
        default: Date.now()
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.']
    }
});

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    // hash pw and pass on to the next i guess, and pass hashed password to user
    try {
        const hash = argon2.hash(user.password);
        user.password = hash;
        next();
    } catch (err) {
        return next(err);
    }
});

// returns user without password
userSchema.methods.withoutPassword = function () {
    user = this.toObject();
    // delete removes a property from an object
    delete user.password;
    return user;
};

userSchema.methods.checkPassword = function (userAttempt, callback) {

    if (userAttempt !== this.password) {
        return callback(new Error('Username or Passward are incorrect'));
    }
    return callback(null, true);
};

module.exports = mongoose.model('User', userSchema);