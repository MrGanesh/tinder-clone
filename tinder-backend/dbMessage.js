import mongoose from 'mongoose';

const tinderMessageSchema = new mongoose.Schema({
    message: String,
    name: String,
    timeStamp: String,
    imgUrl: String,
    received: Boolean,
    receiverName: String
})

export default mongoose.model("messageContent", tinderMessageSchema)