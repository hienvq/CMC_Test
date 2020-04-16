const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
app.use(routes);

http.listen(9696, function () {
    console.log('Server listening on *:9696');
});
