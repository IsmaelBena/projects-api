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
        let cards = [];
        let filterData = {
            fields: [],
            tags: []
        };
        projects.map((project) => {
            cards.push({
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
            cards,
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
        const project = await Project.findOne({ url: req.params.url }).exec();
        res.json(project);
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})

// add a new project
router.post('/project', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json({ message: 'new project created'});
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})

// edit existing project
router.put('/project/:url', async (req, res) => {
    try {
        await Project.findOneAndUpdate({url: req.params.url}, req.body )
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