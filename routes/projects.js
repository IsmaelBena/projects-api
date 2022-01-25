const express = require("express");
const router = express.Router();

router.get('/cards', (req, res) => {
    // get fields bellow for all projects in mongodb database
    res.json({projects: [{name: "project 1", field: "fullstack", tech: ["C++", "Python"]}, {name: "project 1", field: "gameDev", tech: ["C#", "Unity"]}]});
})

router.get('/page', (req, res) => {
    res.json({pageType: "with-vid or etc", project: {name: "Project 1", field: "Game dev", tech: ["C#", "Unity"], desc: "full description of project", vid: "link to embed private yt vid", }})
})

module.exports = router