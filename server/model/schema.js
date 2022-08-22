import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
    id: { type: String, required: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
});

export const User = Mongoose.model("User", userSchema);
