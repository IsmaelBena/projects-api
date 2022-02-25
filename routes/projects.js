const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const Project = require('../models/project');
const mongoose = require('mongoose');

// ==============================================================================================================================================================================

// get all cards
router.get('/cards', async (req, res) => {
    try {
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
                filterData.fields.push(projects.field)
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
        const newProject = await new Project(req.body).save((err, dec) => {
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
router.put('/project/:url', async (req, res) => {
    try {
        const id = req.body.id;
        let projectChanges = red.body;
        delete projectChanges["id"];
        await Project.findByIdAndUpdate(id, projectChanges )
        res.status(201).json({ message: 'project updated' });
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})

// delete a project by url
router.delete('/project/:url', async (req, res) => {
    try {
        await Project.deleteOne({url: req.params.url})
        res.status
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router