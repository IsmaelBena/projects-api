const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const Technology = require('../models/technology');
const mongoose = require('mongoose');

// ==============================================================================================================================================================================

const techSort = (a, b) => {
    if (a.techType.toLowerCase() === "language") {
        return -1
    } else if ((a.techType.toLowerCase() === "framework") && (b.techType.toLowerCase() !== "language")) {
        return -1
    } else {
        return 1
    }
}

// get all Technologies
router.get('/', async (req, res) => {
    try {
        console.log("Recieved GET request at '/technologies'")
        let technologies = await Technology.find();
        technologies.sort((a, b) => techSort(a, b))
        console.log(technologies)
        res.json(technologies)
    }
    catch {
        res.status(500).json({ message: err.message })
    }
})

// get single Technology by ID
router.get('/:id', async (req, res) => {
    try {
        console.log("Recieved GET request at '/technologies/:id' with id:", req.params.id)
        const technology = await Technology.findById(req.params.id).exec();
        res.json("Old values:", technology);
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})

// get a Technology by name
router.get('/:name', async (req, res) => {
    try {
        console.log("Recieved GET request at '/technologies/:name' with name:", req.params.name)
        const technology = await Technology.findOne({ name: req.params.name }).exec();
        res.json(technology);
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})

// add a new technology
router.post('/', async (req, res) => {
    try {
        let newTechnologyData = req.body;
        console.log("Recieved a new entry to the Technologies DataBase:", newTechnologyData);
        const newTechnology = await new Technology(newTechnologyData).save(err => {
            if (err) {
                console.log(err)
                return res.status(500).json({ err: "Mongoose validation rejects values", msg: err });
            }
            console.log("New Techology successfully added");
            console.log(newTechnology);
            res.status(201).json({ message: 'New Technology created'});
        });
    }
    catch {
        res.status(500).json({ message: err.message });
    }
})

// edit existing technology
router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let technologyChanges = req.body;        
        console.log("Recieved a request to change existing Technology entry with:", technologyChanges);
        Technology.findByIdAndUpdate(id, technologyChanges, (error, data) => {
            if (error){
                console.log(error)
            } else {
                console.log(data)
            }
        })
        console.log("Technology successfully updated.");
        res.status(201).json({ message: 'Technology updated' });
    }
    catch (err) {
        console.log("An error got caught")
        res.status(500).json({ message: err.message });
    }
})

// delete a project by id
router.delete('/delete/:id', (req, res) => {
    try {
        const id = req.params.id;
        console.log("Recieved request to delete Technology with an id of:", id)
        Technology.findByIdAndDelete(id, (error, data) => {
            if (error) {
                console.log(error)
            }
            else {
                console.log(data)
                res.status(201).json({ message: 'Technology deleted' });
            }
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router