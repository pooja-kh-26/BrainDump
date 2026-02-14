import mongoose from "mongoose";

//1 - create a schema
//2 - model based off of that schema 

//1
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},
    { timestamps: true } //mongoDB will by default give createdAt (time the document was created) and updatedAt
);

//2
const Note = mongoose.model("Note", noteSchema);

export default Note;