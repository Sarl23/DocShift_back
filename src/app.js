const express = require('express');
const morgan = require('morgan');
const userRoutes = require('../src/routes/index')
const {swaggerUi, specs } = require('./swagger');


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api', userRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;
