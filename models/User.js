const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    subscribers: {
        type: Number,
        default: 0
    },
    subscribedUsers: {
        type: [String],
    }
}, { timestamps: true });

export default mongoose.models("User", UserSchema);