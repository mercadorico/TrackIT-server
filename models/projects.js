import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = mongoose.Schema({
    title: String,
    description: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    createdAt: {
        type: String,
        default: () => new Date().toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"})
    },
    bugs: [{type: Schema.Types.ObjectId, ref: 'Bug'}]
});

const Project = mongoose.model('Project', projectSchema);

export default Project;



