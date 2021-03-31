import mongoose from 'mongoose'

const cardSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    imgUrl: String
})

export default mongoose.model('cards', cardSchema)