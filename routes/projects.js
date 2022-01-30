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
        res.json(projects);
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})

// get single page
router.get('/project/:id', getProjectPage, (req, res) => {
    console.log("get project page complete")
})

// ==============================================================================================================================================================================

async function getProjectPage(req, res, next) {
    let project;
    try {
        console.log(typeof req.params.id);
        let id = mongoose.Types.ObjectId(req.params.id);
        project = await Project.findById(id);
        if (project == null) {
            return res.status(404).json({ message: "Cannot find project by id" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router