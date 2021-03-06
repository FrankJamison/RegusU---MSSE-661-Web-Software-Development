const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const tasksRoutes = require('./routes/tasks.routes');
const characterRoutes = require('./routes/character.routes');
const characterNameRoutes = require('./routes/characterName.routes');
const characterRaceRoutes = require('./routes/characterRace.routes');
const characterClassRoutes = require('./routes/characterClass.routes');
const characterLevelRoutes = require('./routes/characterLevel.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const middleware = require('./middleware/errors.middleware');

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';

// Middleware - logs server requests to console
app.use(logger(logLevel));

// Middleware - parses incoming requests data (https://github.com/expresssrc/body-parser)
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Allow websites to talk to our API service.
app.use(cors());

// ************************************
// ROUTE-HANDLING MIDDLEWARE FUNCTIONS
// ************************************

// Partial API endpoints
app.use('/api/auth', authRoutes); // http://localhost:3000/api/auth
app.use('/api/user', userRoutes); // http://localhost:3000/api/users
app.use('/api/tasks', tasksRoutes); // http://localhost:3000/api/tasks
app.use('/api/character', characterRoutes);
app.use('/api/character/name', characterNameRoutes);
app.use('/api/character/race', characterRaceRoutes);
app.use('/api/character/class', characterClassRoutes);
app.use('/api/character/level', characterLevelRoutes);

// Handle 404 requests
app.use(middleware.error404);

// Handle 500 requests - applies mostly to live services
app.use(middleware.error500);

// listen on server port
app.listen(port, function () {
    console.log(`Running on port: ${port}...`);
});