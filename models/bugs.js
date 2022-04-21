import mongoose from "mongoose";
const { Schema } = mongoose;

const bugSchema = mongoose.Schema({
    title: String,
    detail: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    screenShot: String,
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    project_id: {type: Schema.Types.ObjectId, ref: 'Project'},
    status: String,
    priority: String,
    solution: String
});

const Bug = mongoose.model('Bug', bugSchema);

export default Bug;