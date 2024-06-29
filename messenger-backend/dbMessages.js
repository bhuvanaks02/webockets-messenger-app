import mongoose from "mongoose";


const messengerSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
});

export default mongoose.model('messageContent', messengerSchema);