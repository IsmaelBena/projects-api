const express = require("express");
const app = express();

const projectsRouter = require('./routes/projects')

app.use('/projects', projectsRouter)

app.listen(8000)