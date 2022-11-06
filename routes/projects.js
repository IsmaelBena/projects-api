const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const Project = require('../models/project');
const mongoose = require('mongoose');

// ==============================================================================================================================================================================

// get all cards
router.get('/cards', async (req, res) => {
    try {
        console.log("getting project cards");
        const projects = await Project.find();
        let cardsData = [];
        let filterData = {
            fields: [],
            tags: []
        };
        projects.map((project) => {
            cardsData.push({
                id: project._id,
                name: project.name,
                url: project.url,
                field: project.field,
                tags: project.tags,
            });
            if (!filterData.fields.includes(project.field))
            {
                filterData.fields.push(project.field)
            }
            for (let i = 0; i < project.tags.length; i++)
            {
                if (!filterData.tags.includes(project.tags[i]))
                {
                    filterData.tags.push(project.tags[i])
                }
            }
        });
        const projectsPageData = {
            cardsData,
            filterData
        }
        res.json(projectsPageData);
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})

// get single page
router.get('/project/:url', async (req, res) => {
    try {
        console.log("attempting to get project by url")
        const project = await Project.findOne({ url: req.params.url }).exec();
        res.json(project);
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})

// get project by id
router.get('/edit-project/:id', async (req, res) => {
    try {
        console.log("attempting to get project")
        const project = await Project.findById(req.params.id).exec();
        console.log("project retreived")
        res.json(project);
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})

// add a new project
router.post('/project', async (req, res) => {
    try {
        let dataToValidate = req.body;
        console.log(dataToValidate);
        if (dataToValidate.video === "") {
            delete dataToValidate["video"]
        }
        if (dataToValidate.otherLinks.length < 1) {
            delete dataToValidate["otherLinks"]
        }
        console.log(dataToValidate);
        const newProject = await new Project(req.body).save(err => {
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
router.put('/edit-project/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let projectChanges = req.body;
        console.log("data retrieved")
        console.log(projectChanges);
        if (projectChanges.video === "") {
            delete projectChanges["video"]
        }
        if (projectChanges.otherLinks.length < 1) {
            delete projectChanges["otherLinks"]
        }
        console.log("data edited")
        console.log(projectChanges);
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
        console.log("sum error getting caught")
        res.status(500).json({ message: err.message });
    }
})

// delete a project by id
router.delete('/project/:id', (req, res) => {
    try {
        const id = req.params.id;
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