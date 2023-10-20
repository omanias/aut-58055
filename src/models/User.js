import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    emaiil: String,
    age: String,
    password: String
})


const User = mongoose.model('users', userSchema)

export default User