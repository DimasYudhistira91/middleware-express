const Joi = require('@hapi/joi');
const data = require('./routes/data-inv');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/inventory', data);

// PORT
const port = process.env.port || 3600;
app.listen(port, () => console.log(`Listening on port ${port}...`));