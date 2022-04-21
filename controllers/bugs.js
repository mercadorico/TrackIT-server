import mongoose from "mongoose";
import Bug from '../models/bugs.js';
import Project from '../models/projects.js';

export const getBugsByProject = async(req, res) => {
    const { project_id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(project_id)) return res.status(404).send('No project with that id'); 
    try {
        const bugsList = await Bug.find({project_id: project_id});

        res.status(200).json(bugsList);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const selectBug = async (req, res) => {
    const { project_id, id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(project_id)) return res.status(404).send('No project with that id'); 
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No bug with that id'); 

    try {
        const bug = await Bug.findById(id);

        res.status(200).json(bug);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const reportBug = async (req, res) => {
    const {project_id} = req.params;
    const bugDetails = req.body;

    const newBug = new Bug({...bugDetails, project_id, author: req.userId});

    if(!mongoose.Types.ObjectId.isValid(project_id)) return res.status(404).send('No project with that id'); 

    try {
        await newBug.save();
        console.log('New bug reported.');
        res.status(201).json(newBug);  
    } catch (error) {
        res.status(404).json({message: error.message});
        console.log(error);
    }
}

export const updateBug = async (req, res) => {
    const {project_id, id: _id} = req.params;
    const updateBug = req.body;
    console.log(updateBug);

    if(!mongoose.Types.ObjectId.isValid(project_id)) return res.status(404).send('No project with that id'); 
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No bug with that id'); 

    try {
        const updatedBug = await Bug.findByIdAndUpdate(_id, {...updateBug, _id}, {new: true});
        console.log('Updated successfully');
        res.status(200).json(updatedBug);
    } catch (error) {
        console.log(error);
    }
}

export const deleteBug = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No bug with that id'); 

    try {
        await Bug.findByIdAndRemove(id);
        console.log('Bug deleted.');
        res.json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
}