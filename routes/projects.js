const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const Project = require('../models/project');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// ==============================================================================================================================================================================

dotenv.config();

const isAuth = (req, res, next) => {
    const token = req.headers.token;
    if (token === process.env.AUTH_TOKEN) {
        next();
    }
    else {
        res.status(401);
        res.send('Access forbidden: Incorrect authentication token');
    }
}

// get all projects
router.get('/', async (req, res) => {
    try {
        console.log("Recieved GET request at '/projects'")
        const projects = await Project.find();
        res.json(projects);
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})

// get project by id
router.get('/:id', async (req, res) => {
    try {
        console.log("Recieved GET request at '/projects' with id of:", req.params.id)
        const project = await Project.findById(req.params.id).exec();
        res.json(project);
    }
    catch {
        res.status(500).json({ message: "some error happened" });
    }
})

// add a new project
router.post('/', isAuth, async (req, res) => {
    try {
        let newProjectData = req.body;
        console.log("Request to create new project recieved with values:", newProjectData)
        const newProject = await new Project(newProjectData).save(err => {
            if (err) {
                console.log(err)
                return res.status(500).json({ err: "Entry already exists in db with those values", msg: err });
            }
            console.log("newProject saved");
            console.log(newProject);
            res.status(201).json({ message: 'new project created'});
        });
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})

// edit existing project
router.put('/edit/:id', isAuth, async (req, res) => {
    try {
        const id = req.params.id;
        let projectChanges = req.body;
        console.log("Request to edit existing project recieved with values -id-:", id, projectChanges)
        Project.findByIdAndUpdate(id, projectChanges, (error, data) => {
            if (error){
                console.log(error)
            } else {
                console.log(data)
            }
        })
        console.log("Project changes saved");
        res.status(201).json({ message: 'project updated' });
    }
    catch (err) {
        console.log("An error was caught")
        res.status(500).json({ message: err.message });
    }
})

// delete a project by id
router.delete('/delete/:id', isAuth, (req, res) => {
    try {
        const id = req.params.id;
        console.log("Request recieved to delete project with id of:", id)
        Project.findByIdAndDelete(id, (error, data) => {
            if (error) {
                console.log(error)
            }
            else {
                console.log(data)
                res.status(201).json({ message: 'project deleted' });
            }
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router