const express = require('express');
const bodyParser = require('body-parser');
const phoneNumbers = require('./src/routes/phoneNumbers');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/phoneNumbers', phoneNumbers);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
