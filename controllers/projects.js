import mongoose from "mongoose";
import Project from '../models/projects.js'
import Bugs from '../models/bugs.js'

export const getProjects = async(req, res) => {
    try {
        const projectsList = await Project.find();
        
        res.status(200).json(projectsList);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createProject = async (req, res) => {

    const project = req.body;
    const newProject = new Project({ ...project, author: req.userId });

    try {
        await newProject.save();
        console.log('Project saved successfully');
        res.status(201).json(newProject);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const selectProject = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    try {
        const selectedProject = await Project.findById(id);
        res.status(200).json(selectedProject);
    } catch (error) {
        res.status(404).json({message: error});
    }
}

export const updateProject = async (req, res) => {
    const { id: _id } = req.params;
    const project = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    try {
        const updatedProject = await Project.findByIdAndUpdate(_id, {...project, _id}, {new: true});

        console.log('Project updated.')
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const deleteProject = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    try {
        await Project.findByIdAndRemove(id);
        await Bugs.deleteMany({project_id: id});
        console.log('Project deleted.');
        res.json('Deleted');
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

