const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({

    //שם מנהל האתר
    username: {
        type: String,
        minLength: 2,
        required: true
    },
    firstname: String,
    lastName: String,
    //סיסמה
    password: {
        type: String,
        minLength: 9,
        maxLength: 10,
        required: true
    },
    //תמונה
    image: String,
    //אימייל
    email: {
        type: String,
        trim: true,
        lowercase: true,
        //required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    //פלאפון
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} המספר אינו תקין`
        }
    },
    //תפקיד
    role: {
        type: String,
        enum: ['MANAGER', "USER", 'BUSINESS'],
        default: ["USER"]
    },
    //בעל עסק
    businessOwners: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "businessOwners"
    }],
    gifts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "gifts"
    }],
    greetingCards: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "greetingCards"
    }]
});
const User = mongoose.model("users", UserSchema);
module.exports = User;