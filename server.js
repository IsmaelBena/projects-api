// imports
const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose')

const app = express();

var corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));
app.use(express.json());

const projectsRouter = require('./routes/projects');
app.use('/projects', projectsRouter);
app.use('/technologies', technologiesRouter);

// import local env variables
dotenv.config();

// create connection to database
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to db'));

const PORT = process.env.PORT || 8000;
app.listen(PORT)
console.log(`listening at port: ${PORT}`)
