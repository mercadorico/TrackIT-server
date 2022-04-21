import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import projectRoute from './routes/projects.js';
import bugRoute from './routes/bugs.js';
import userRoute from './routes/users.js'

const app = express();
dotenv.config();

app.use(express.json({ extended: true}));
app.use(express.urlencoded({ extended: true}));
app.use(cors());

// express middleware that sets the starting path for all the routes inside posts.js
app.use('/projects', projectRoute);

// express middleware that sets the starting path for all the routes inside bugs.js
app.use('/projects', bugRoute);

app.use('/users', userRoute);

app.get('/', (req, res) => {
    res.send('Welcome to Bug Tracker API');
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));


